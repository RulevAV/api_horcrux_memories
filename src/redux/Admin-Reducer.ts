import {AuthAPI} from "../api/api";
import {LOG_OUT} from "./Auth-Reducer";

let GET_USER = "GET_USER";
let SET_USER_ROLES = "SET_USER_ROLES";

export type InitialStateType = {
    Users:Array<any>,
    AllRoles:Array<any>
}

let initialState = {
    Users:[],
    AllRoles:[]
};
export const AdminReducer = (state=initialState, action : any) => {
    switch (action.type) {
        case GET_USER:{
            return {
                ...state,
                Users:action.Users,
                AllRoles:action.AllRoles
            };
        }
        case SET_USER_ROLES:{
            let User:any = state.Users.find((u:any,index:any)=>u.email ===action.Email)
            let mass = state.Users.filter((u:any,index:any)=>u.email !==action.Email)
            User.roles=action.Roles;
            return {
                ...state,
                Admin: {
                    ...state,
                    Users :[
                        ...mass,
                        User
                    ]
                }
            };
        }
        case LOG_OUT: {
            return initialState;
        }
        default: return state;
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


type InitializedSeccessActionType ={
    type: typeof GET_USER,

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


export default AdminReducer;


