import { getQuestionsData } from "../../http/data/user";
import { deleteAskApi } from "../../http/endpoints/question";
import { QuestionPageType } from "../../http/models/api/question";
import { InfoActionsTypes, ThunkActionType } from "../redux-store";
import { initialState } from "./initial-values";
import { Cracker } from "./types";

type ActionsTypes = InfoActionsTypes<typeof QuestionAction>;

type ThankType = ThunkActionType<ActionsTypes, Promise<void>>;

export const questionPageReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case "QUESTION_SET_PAGE": {
            return {
                ...state,
                questionPage: {
                    ...action.data
                }
            };
        }
        case "QUESTION_ADD_CRACKER": {
            return {
                ...state,
                breadcrumb: [...state.breadcrumb, action.cracker]
            }
        }

        case "QUESTION_SET_CRACKER": {
            return {
                ...state,
                breadcrumb: action.mass
            }
        }
        case "QUESTION_DELETE_CRACKER": {
            const index = state.breadcrumb.findIndex((e) => {
                return e.id === action.cracker.id
            });

            const slicedArr = state.breadcrumb.slice(0, index + 1);

            return {
                ...state,
                breadcrumb: [...slicedArr]
            }
        }
        default: return state;
    }
}

export const QuestionAction = {
    setPageQuests: (data: QuestionPageType) => ({ type: "QUESTION_SET_PAGE", data } as const),
    addCracker: (cracker: Cracker) => ({ type: "QUESTION_ADD_CRACKER", cracker } as const),
    deleteCracker: (cracker: Cracker) => ({ type: "QUESTION_DELETE_CRACKER", cracker } as const),
    setCreater: (mass: Array<Cracker>) => ({ type: "QUESTION_SET_CRACKER", mass } as const),
}

export const QuestionActionThunk = {
    setPageQuests: (id: string = "", page: number = 1, portionsSize: number = 10, name: string, mass: Array<Cracker>): ThankType => {
        return async (dispatch) => {
            const data = await getQuestionsData(id, page, portionsSize);
            dispatch(QuestionAction.setPageQuests(data));

            mass.push({ id, page, portionsSize, name });
            dispatch(QuestionAction.setCreater(mass));
            //dispatch(QuestionAction.addCracker({ id, page, portionsSize, name }))
        }
    },
    deleteAsk: (idDelete: string, id: string, page: number, portionsSize: number): ThankType => {
        return async (dispatch) => {
            await deleteAskApi(idDelete);
            const data = await getQuestionsData(id, page, portionsSize);
            dispatch(QuestionAction.setPageQuests(data));
        }
    }
}