import {AuthAPI} from "../api/API_AuthServer";
import {InfoActionsTypes, ThunkActionType} from "./redux-store";
import Cookies from "js-cookie";
import {AuthType} from "../api/API_AuthServer_Type";

export const LOG_OUT = "LOG_OUT";
export const LOCK_SCREEN="LOCK_SCREEN";

//Api type
type PromiseApiType ={
    status:number,
    data:AuthType
}
//AllTypeAction
export type ActionsTypesAuth = InfoActionsTypes<typeof AuthActions>;

type ThankType = ThunkActionType<ActionsTypesAuth,Promise<void>>;

export type Register ={
    isRegister : boolean,
    LoginRegistration:string,
}

export type initialStateType = typeof initialState;


export const initialState = {
    Auth:{
        message: "",
        isAuthenticated: false,
        userName: "",
        email: "",
        roles: [],
        token: "",
        refreshToken: "",
        refreshTokenExpiration: ""
    } as AuthType,
    Register: {
        isRegister : false,
        LoginRegistration:"",
    } as Register,
    InitialApp:false,
    IsLockScreen:false
};


export const authReducer = (state=initialState, action : ActionsTypesAuth) :initialStateType=> {
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
        case "LOCK_SCREEN":{
            return {
                ...state,
               IsLockScreen: action.IsLockScreen
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

export const AuthActions = {
    SetUser :(data :AuthType)=>({type : "SET_USER_DATA", data: data } as const),
    UserRegister :(isRegister :boolean,Login:string)=>({type : "USER_REGISTER",isRegister :isRegister}as const),
    Logout :()=>({type : LOG_OUT} as const),
    InitialApp:()=>({type : "INITIAL_APP"}as const),
    LockScreen:(IsLockScreen:boolean)=>({type: "LOCK_SCREEN",IsLockScreen}as const)
}

export const AuthActionsThunkCreator = {
    SetUser: (Email:string,Password:string) :ThankType=>{
        return async (dispatch ) => {
            dispatch(AuthActions.LockScreen(true));
            AuthAPI.Token(Email,Password).then((response:PromiseApiType) =>{
                let {status,data} = response;
                if(status === 200)
                {
                    dispatch(AuthActions.SetUser(data));
                }
            });
            dispatch(AuthActions.LockScreen(false));

        }
    },
    RefreshAuthCookie:() :ThankType =>{
        return async (dispatch ) => {
            dispatch(AuthActions.LockScreen(true));
            AuthAPI.RefreshToken().then((response:PromiseApiType) =>{
                if(response.status === 200)
                {
                    if(response.data.isAuthenticated)
                        dispatch(AuthActions.SetUser(response.data));
                }
            });
            dispatch(AuthActions.LockScreen(false));
        }
    },
    UserRegister:(FirstName:string,LastName:string,Username:string,Email:string,Password:string) :ThankType =>{
        return async (dispatch ) => {
            dispatch(AuthActions.LockScreen(true));
            AuthAPI.Register(FirstName,LastName,Username,Email,Password).then((response) =>{
                if(response.status === 200)
                {
                    dispatch(AuthActions.UserRegister(true,Username));
                }
            });
            dispatch(AuthActions.LockScreen(false));
        }
    },
    Logout:()  :ThankType  =>{
        return async (dispatch ) => {
            dispatch(AuthActions.LockScreen(true));
            AuthAPI.RevokeToken().then((response) =>{
                dispatch(AuthActions.Logout());
            });

        }
    },

}


export default authReducer;


