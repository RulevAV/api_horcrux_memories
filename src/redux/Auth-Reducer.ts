import {AuthAPI} from "../api/api";

let SET_USER_DATA = 'SET_USER_DATE';
let LOG_OUT = "LOG_OUT";
let initialState = {
    message: undefined,
    isAuthenticated: false,
    userName: undefined,
    email: undefined,
    roles: undefined,
    token: undefined,
    refreshToken: undefined,
    refreshTokenExpiration: undefined
};
export const authReducer = (state=initialState, action : any) => {
    switch (action.type) {
        case SET_USER_DATA:{
            let date = new Date(Date.now() + 86400e3).toUTCString();
            document.cookie = `RefreshToken=${action.data.refreshToken}; expires=` + date;
            return {
                ...state,
                ...action.data,
            };
        }
        case LOG_OUT:{
            return initialState
        }
        default: return state;
    }
}

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


