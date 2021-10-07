import {AuthAPI} from "../api/api";

let SET_USER_DATA = 'SET_USER_DATE';
export let LOG_OUT = "LOG_OUT";
let USER_REGISTER = "USER_REGISTER";
let initialState = {
    Auth:{
        message: undefined,
        isAuthenticated: false,
        userName: undefined,
        email: undefined,
        roles: [],
        token: undefined,
        refreshToken: undefined,
        refreshTokenExpiration: undefined
    },
    Register: {
        isRegister : false,
        LoginRegistration:"",
    },
    Admin:{
        Users:[],
        AllRoles:[]
    }

};
export const authReducer = (state=initialState, action : any) => {
    switch (action.type) {
        case SET_USER_DATA:{

            return {
                ...state,
                Auth:{
                    ...action.data,
                }

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
                    isRegister : action.data.isRegister,

                }
            };
        }
        default: return state;
    }
}
//SET_USER_DATA
export let SetUser =(data :any)=>{

    return {
        type : SET_USER_DATA,
        data: data
    }
}
export const SetUserThunkCreator = (Email:string,Password:string) =>{
    return (dispatch : any) => {
        AuthAPI.Token(Email,Password).then((response:any) =>{
            if(response.status === 200)
            {
               dispatch(SetUser(response.data));
            }
        });


    }
}
export const authCookieThunkCreator = () =>{
    return (dispatch : any) => {
        AuthAPI.RefreshToken().then((response:any) =>{
            if(response.status === 200)
            {
                if(response.data.isAuthenticated)
                    dispatch(SetUser(response.data));
            }
        });


    }
}

//USER_REGISTER
export let UserRegister =(isRegister :boolean,Login:string)=>{

    return {
        type : USER_REGISTER,
        data: {
            isRegister,
            Login
        }
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
export let Logout =()=>{

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


