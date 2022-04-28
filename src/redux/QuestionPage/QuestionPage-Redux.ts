import { deleteAskData, getQuestionsData } from "../../http/data/user";
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

        case "QUESTION_SET_CRACKER": {
            return {
                ...state,
                breadcrumb: action.mass
            }
        }
      
        default: return state;
    }
}

export const QuestionAction = {
    setPageQuests: (data: QuestionPageType) => ({ type: "QUESTION_SET_PAGE", data } as const),
    setCreater: (mass: Array<Cracker>) => ({ type: "QUESTION_SET_CRACKER", mass } as const),
}

export const QuestionActionThunk = {
    setPageQuests: (id: string = "", page: number = 1, portionsSize: number = 10, name: string, mass: Array<Cracker>): ThankType => {
        return async (dispatch) => {
            const data = await getQuestionsData(id, page, portionsSize);
            dispatch(QuestionAction.setPageQuests(data));

            mass.push({ id, page, portionsSize, name });
            dispatch(QuestionAction.setCreater(mass));
        }
    },
    deleteAsk: (idDelete: string, id: string, page: number, portionsSize: number): ThankType => {
        return async (dispatch) => {
            await deleteAskData(idDelete);
            const data = await getQuestionsData(id, page, portionsSize);
            dispatch(QuestionAction.setPageQuests(data));
        }
    }
}