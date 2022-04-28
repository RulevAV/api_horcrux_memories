import { putAsk } from "../../http/endpoints/question";
import { QuestionsType } from "../../http/models/api/question";
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
            await putAsk(model);
            dispatch(RedactActions.setRedact(initialState));
        }
    }
}

export default redactReducer;


