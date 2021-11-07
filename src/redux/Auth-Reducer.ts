import {AuthAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InfoActionsTpes} from "./redux-store";

export const LOG_OUT = "LOG_OUT";

export type AuthType = {
    message: string|null,
    isAuthenticated: boolean,
    userName: string|null,
    email: string|null,
    roles: Array<string>,
    token: string|null,
    refreshToken: string|null,
    refreshTokenExpiration: string|null
}
export type Register ={
    isRegister : boolean,
    LoginRegistration:string,
}

const initialState = {
    Auth:{
        message: null,
        isAuthenticated: false,
        userName: null,
        email: null,
        roles: [],
        token: null,
        refreshToken: null,
        refreshTokenExpiration: null
    } as AuthType,
    Register: {
        isRegister : false,
        LoginRegistration:"",
    } as Register
};
export type initialStateType = typeof initialState;

export const authReducer = (state=initialState, action : ActionsTypes) :initialStateType=> {
    switch (action.type) {
        case "SET_USER_DATA":{
            return {
                ...state,
                Auth:{
                    ...action.data,
                },
            };
        }
        case LOG_OUT:{
            return initialState
        }
        case "USER_REGISTER":{
            return {
                ...state,
                Register: {
                    ...state.Register,
                    isRegister : action.isRegister,

                }
            };
        }
        default: return state;
    }
}

//Api type
type PromiseApiType ={
    status:number,
    data:AuthType
}
//AllTypeAction
type ActionsTypes = InfoActionsTpes<typeof AuthActions>;

export const AuthActions = {
    SetUser :(data :AuthType)=>({type : "SET_USER_DATA", data: data } as const),
    UserRegister :(isRegister :boolean,Login:string)=>({type : "USER_REGISTER",isRegister :isRegister}as const),
    Logout :()=>({type : LOG_OUT} as const)
}

//SET_USER_DATA
export const SetUserThunkCreator = (Email:string,Password:string) =>{
    return (dispatch : any) => {
        AuthAPI.Token(Email,Password).then((response:PromiseApiType) =>{
            let {status,data} = response;
            if(status === 200)
            {
               dispatch(AuthActions.SetUser(data));
            }
        });


    }
}
export const authCookieThunkCreator = () :ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> =>{
    return async (dispatch ) => {
        AuthAPI.RefreshToken().then((response:PromiseApiType) =>{
            if(response.status === 200)
            {
                if(response.data.isAuthenticated)
                    dispatch(AuthActions.SetUser(response.data));
            }
        });


    }
}

//USER_REGISTER
export const UserRegisterThunkCreator = (FirstName:string,LastName:string,Username:string,Email:string,Password:string) :ThunkAction<Promise<void>, ActionsTypes, unknown, ActionsTypes> =>{
    return async (dispatch ) => {
        AuthAPI.Register(FirstName,LastName,Username,Email,Password).then((response:any) =>{
            if(response.status === 200)
            {
                dispatch(AuthActions.UserRegister(true,Username));
            }
        });


    }
}

//LOG_OUT
export const LogoutThunkCreator = ()  :ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>=>{
    return async (dispatch ) => {
        AuthAPI.RevokeToken().then((response:any) =>{
            dispatch(AuthActions.Logout());
        });
    }
}

export default authReducer;


