import { InfoActionsTypes, ThunkActionType } from "../redux-store";
import { initialState } from "./initial-values";
import { initialStateTypeLoading } from "./types";


//AllTypeAction
export type ActionsTypesLoading = InfoActionsTypes<typeof loadingActions>;
export type ThankType = ThunkActionType<ActionsTypesLoading, Promise<void>>;

export const loadingReducer = (state = initialState, action: ActionsTypesLoading): initialStateTypeLoading => {
    switch (action.type) {
        case "LOADING_SET": {
            return {
                visible: action.value
            };
        }
        default: return state;
    }
}

export const loadingActions = {
    setLoading: (value: boolean) => ({ type: "LOADING_SET", value } as const),
}

export const loading = (dispatch: (arg: ActionsTypesLoading) => (ActionsTypesLoading)) => {
    let load = false;

    const time = setTimeout(() => {
        load = true;
        dispatch(loadingActions.setLoading(true))
    }, 500);

    const hiden = () => {
        clearTimeout(time);
        if (load === true)
            dispatch(loadingActions.setLoading(false))
    }

    return hiden;
}

export default loadingReducer;
