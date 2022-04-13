import { AuthType } from "../../api/API_AuthServer_Type";
import { InfoActionsTypes, ThunkActionType } from "../redux-store";
import { AuthActions } from "./Auth-Reducer";
import { initialState } from "./initial-values";

//AllTypeAction
export type ActionsTypesAuth = InfoActionsTypes<typeof AuthActions>;

export type initialStateType = typeof initialState;

//Api type
export type PromiseApiType ={
    status:number,
    data:AuthType
}

export type ThankType = ThunkActionType<ActionsTypesAuth,Promise<void>>;

export type Register ={
    isRegister : boolean,
    LoginRegistration:string,
}



