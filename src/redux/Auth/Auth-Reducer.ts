import { loginApi, revokeTokenApi } from "../../http/endpoints/user";
import { InfoActionsTypes, ThunkActionType } from "../redux-store";
import { initialState } from "./initial-values";
import { initialStateType} from "./types";

export const USER_LOGOUT = "USER_LOGOUT";
export const USER_LOGIN="USER_LOGIN";

//AllTypeAction
export type ActionsTypesAuth = InfoActionsTypes<typeof AuthActions>;
export type ThankType = ThunkActionType<ActionsTypesAuth,Promise<void>>;

export const authReducer = (state=initialState, action : ActionsTypesAuth) :initialStateType=> {
    switch (action.type) {
        case USER_LOGIN:{
            return {
                ...state,
                ...action.data
            };
        }
        case USER_LOGOUT:{
            return initialState;
        }
        default: return state;
    }
}

export const AuthActions = {
    setUser :(data:initialStateType)=>({type : USER_LOGIN,data} as const),
    logout :()=>({type : USER_LOGOUT} as const),
}

export const AuthActionsThunk = {
    login:(email:string,password:string)  :ThankType  =>{
        return async (dispatch ) => {
            const data = await loginApi(email,password);
            dispatch( AuthActions.setUser(data));
        }
    },
    Logout:()  :ThankType  =>{
        return async (dispatch ) => {
            await revokeTokenApi();
            dispatch( AuthActions.logout());
        }
    },
}

export default authReducer;


