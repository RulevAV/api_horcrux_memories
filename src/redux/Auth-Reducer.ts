import {AuthAPI} from "../api/api";

let SET_USER_DATA = 'SET_USER_DATE';
let LOG_OUT = "LOG_OUT";
let USER_REGISTER = "USER_REGISTER";
let GET_USER = "GET_USER";
let SET_USER_ROLES = "SET_USER_ROLES";
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
        case GET_USER:{
            return {
                ...state,
                Admin : {
                    Users:action.Users,
                    AllRoles:action.AllRoles
                }

            };
        }
        case SET_USER_ROLES:{
            let User:any = state.Admin.Users.find((u:any,index:any)=>u.email ===action.Email)
            let mass = state.Admin.Users.filter((u:any,index:any)=>u.email !==action.Email)
            User.roles=action.Roles;
            return {
                ...state,
                Admin: {
                    ...state.Admin,
                    Users :[
                        ...mass,
                        User
                    ]


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

//GET_USER
export let SetUsers =(Users:any,AllRoles:any)=>{

    return {
        type : GET_USER,
        Users,
        AllRoles
    }
}
export const GetUsersThunkCreator = () =>{
    return (dispatch : any) => {
        AuthAPI.GetUser().then((response:any) =>{
            dispatch(SetUsers(response.data.users,response.data.allRoles));
        });


    }
}

//SET_USER_ROLES
export let SetRoles =(Email:any,Roles:any)=>{

    return {
        type : SET_USER_ROLES,
        Email,
        Roles
    }
}
export const SetUserRolesThunkCreator = (Email:string,Roles:Array<string>) =>{
    return (dispatch : any) => {

        AuthAPI.AddDeleteRole(Email,Roles).then((response:any) =>{
            dispatch(SetRoles(Email,Roles));
        });


    }
}




export default authReducer;


