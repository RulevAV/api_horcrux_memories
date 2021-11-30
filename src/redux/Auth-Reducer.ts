import {AuthAPI} from "../api/API_AuthServer";
import {InfoActionsTypes, ThunkActionType} from "./redux-store";
import Cookies from "js-cookie";

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

type ThankType = ThunkActionType<ActionsTypes,Promise<void>>;

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
    } as Register,
    InitialApp:false
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
            return {
                ...initialState,
                InitialApp :state.InitialApp
            }
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
        case "INITIAL_APP":{
            let Auth=Cookies.get("Auth");
            let data = Auth ? JSON.parse(Auth):null;
            if(data){
                return {
                    ...state,
                    Auth:{
                        ...data,
                    },
                    InitialApp:true
                };
            }
            return {
                ...state,
                InitialApp:true
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
type ActionsTypes = InfoActionsTypes<typeof AuthActions>;

export const AuthActions = {
    SetUser :(data :AuthType)=>({type : "SET_USER_DATA", data: data } as const),
    UserRegister :(isRegister :boolean,Login:string)=>({type : "USER_REGISTER",isRegister :isRegister}as const),
    Logout :()=>({type : LOG_OUT} as const),
    InitialApp:()=>({type : "INITIAL_APP"}as const)
}

//SET_USER_DATA
export const SetUserThunkCreator = (Email:string,Password:string) :ThankType=>{
    return async (dispatch ) => {
        AuthAPI.Token(Email,Password).then((response:PromiseApiType) =>{
            let {status,data} = response;
            if(status === 200)
            {
               dispatch(AuthActions.SetUser(data));
            }
        });


    }
}
export const RefreshAuthCookieThunkCreator = () :ThankType =>{
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
export const UserRegisterThunkCreator = (FirstName:string,LastName:string,Username:string,Email:string,Password:string) :ThankType =>{
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
export const LogoutThunkCreator = ()  :ThankType  =>{
    return async (dispatch ) => {
        AuthAPI.RevokeToken().then((response:any) =>{
            dispatch(AuthActions.Logout());
        });
    }
}

export default authReducer;


