import {AuthAPI} from "../api/api";
import {LOG_OUT} from "./Auth-Reducer";

const GET_USER = "GET_USER";
const SET_USER_ROLES = "SET_USER_ROLES";

type user = {
    email: string|null
    firstName: string|null
    id: string|null
    lastName: string|null
}
export type InitialStateType = {
    Users:Array<user>,
    AllRoles:Array<string>
}
let initialState = {
    Users:[],
    AllRoles:[]
};

export const AdminReducer = (state=initialState, action : any):InitialStateType=> {
    switch (action.type) {
        case GET_USER:{
            return {
                ...state,
                Users:action.Users,
                AllRoles:action.AllRoles
            };
        }
        case SET_USER_ROLES:{
            let mass = state.Users.map((e:user)=>{
                if(e.email !==action.Email)
                return e;
                else return {
                    ...e,
                    roles:action.Roles
                }
            })
            return {
                ...state,
                Users :[
                    ...mass,
                ]
            };
        }
        case LOG_OUT: {
            return initialState;
        }
        default: return state;
    }
}

//GET_USER
type SetUsersActionType ={
    type: typeof GET_USER,
    Users:Array<user>,
    AllRoles:Array<string>
}
export const SetUsers =(Users:Array<user>,AllRoles:Array<string>) :SetUsersActionType=>{
 return {type : GET_USER, Users,AllRoles }
}
export const GetUsersThunkCreator = () =>{
    return (dispatch : any) => {
        AuthAPI.GetUser().then((response:any) =>{
            dispatch(SetUsers(response.data.users,response.data.allRoles));
        });


    }
}

//SET_USER_ROLES
type SetRolesType = {
    type : typeof SET_USER_ROLES,
    Email: string,
    Roles: Array<string>
}
export let SetRoles =(Email:string,Roles:Array<string>) :SetRolesType=>{
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


