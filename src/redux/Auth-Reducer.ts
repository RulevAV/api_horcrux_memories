import {AuthAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATE';
export const LOG_OUT = "LOG_OUT";
const USER_REGISTER = "USER_REGISTER";

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

export const authReducer = (state=initialState, action : any) :initialStateType=> {
    switch (action.type) {
        case SET_USER_DATA:{
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
        case USER_REGISTER:{
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
//SET_USER_DATA
type SetUserType = {
    type : typeof SET_USER_DATA,
    data: AuthType
}
export let SetUser =(data :AuthType) : SetUserType=>{
    return {
        type : SET_USER_DATA,
        data: data
    }
}
export const SetUserThunkCreator = (Email:string,Password:string) =>{
    return (dispatch : any) => {
        AuthAPI.Token(Email,Password).then((response:PromiseApiType) =>{
            let {status,data} = response;
            if(status === 200)
            {
               dispatch(SetUser(data));
            }
        });


    }
}
export const authCookieThunkCreator = () =>{
    return (dispatch : any) => {
        AuthAPI.RefreshToken().then((response:PromiseApiType) =>{
            if(response.status === 200)
            {
                if(response.data.isAuthenticated)
                    dispatch(SetUser(response.data));
            }
        });


    }
}

//USER_REGISTER
type UserRegisterType = {
    type : typeof USER_REGISTER,
    isRegister :boolean
}
export let UserRegister =(isRegister :boolean,Login:string):UserRegisterType=>{
    return {
            type : USER_REGISTER,
            isRegister :isRegister
        }
}
export const UserRegisterThunkCreator = (FirstName:string,LastName:string,Username:string,Email:string,Password:string) =>{
    return (dispatch : any) => {
        AuthAPI.Register(FirstName,LastName,Username,Email,Password).then((response:any) =>{
            if(response.status === 200)
            {
                dispatch(UserRegister(true,Username));
            }
        });


    }
}

//LOG_OUT
type LogoutType = {
    type : typeof LOG_OUT,
}
export let Logout =():LogoutType=>{
    return {
        type : LOG_OUT,
    }
}
export const LogoutThunkCreator = () =>{
    return (dispatch : any) => {
        AuthAPI.RevokeToken().then((response:any) =>{
            dispatch(Logout());
        });
    }
}

export default authReducer;


