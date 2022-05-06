import { deleteAskData, getQuestionsData } from "../../http/data/user";
import { QuestionPageType } from "../../http/models/api/question";
import { loading } from "../Loading/Loading-Reducer";
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
      const index = state.breadcrumb.findIndex((e) => {
        return e.id === action.cracker.id
      })
      const mass = index >= 0 ? state.breadcrumb.slice(0, index) : state.breadcrumb;

      return {
        ...state,
        breadcrumb: [...mass, action.cracker]
      }
    }


    default: return state;
  }
}

export const QuestionAction = {
  setPageQuests: (data: QuestionPageType) => ({ type: "QUESTION_SET_PAGE", data } as const),
  setCreater: (cracker: Cracker) => ({ type: "QUESTION_SET_CRACKER", cracker } as const),
}

export const QuestionActionThunk = {
  setPageQuests: (id: string = "", page: number = 1, portionsSize: number = 10, name: string): ThankType => {
    return async (dispatch) => {
      const hiden = loading(dispatch);

      const data = await getQuestionsData(id, page, portionsSize);
      dispatch(QuestionAction.setPageQuests(data));
      dispatch(QuestionAction.setCreater({ id, page, portionsSize, name }));

      hiden();
    }
  },
  deleteAsk: (idDelete: string, id: string, page: number, portionsSize: number): ThankType => {
    return async (dispatch) => {
      const hiden = loading(dispatch);

      await deleteAskData(idDelete);
      const data = await getQuestionsData(id, page, portionsSize);
      dispatch(QuestionAction.setPageQuests(data));

      hiden();
    }
  }
}