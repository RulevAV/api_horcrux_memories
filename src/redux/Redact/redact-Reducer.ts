import { putAskData } from "../../http/data/user";
import { QuestionsType } from "../../http/models/api/question";
import { loading } from "../Loading/Loading-Reducer";
import { InfoActionsTypes, ThunkActionType } from "../redux-store";
import { initialState } from "./initial-values";


//AllTypeAction
type ActionsTypes = InfoActionsTypes<typeof RedactActions>;

export type ActionsTypesRedact = InfoActionsTypes<typeof RedactActions>;
export type ThankType = ThunkActionType<ActionsTypesRedact, Promise<void>>;

export const redactReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case "REDACT_SET": {
            return {
                ...action.model,
                description: action.model.description ?? ""
            };
        }

        default: return state;
    }
}

export const RedactActions = {
    setRedact: (model: QuestionsType) => ({ type: "REDACT_SET", model } as const),
}

export const RedactActionsThunk = {
    saveAsk: (model: QuestionsType): ThankType => {
        return async (dispatch) => {
            const hiden = loading(dispatch);
            await putAskData(model);
            dispatch(RedactActions.setRedact(initialState));
            hiden();
        }
    }
}

export default redactReducer;


