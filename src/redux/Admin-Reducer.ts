import {AuthAPI} from "../api/API_AuthServer";
import {LOG_OUT} from "./Auth-Reducer";
import {AppStateType, InfoActionsTypes} from "./redux-store";
import {Dispatch} from "react";
import {ThunkAction} from "redux-thunk";


export type UserType = {
    id: number,
    email:string,
    lastName:string,
    firstName:string,
    userName:string,
    roles: Array<string>,
}
export type InitialStateType = {
    Users:Array<UserType>,
    AllRoles:Array<string>
}
export let initialState = {
    Users:[],
    AllRoles:[]
};

export const AdminReducer = (state=initialState, action : ActionsTypes):InitialStateType=> {
    switch (action.type) {
        case "ADMIN_GET_USER":{
            return {
                ...state,
                Users:action.Users,
                AllRoles:action.AllRoles
            };
        }
        case "ADMIN_SET_USER_ROLES":{
            let mass = state.Users.map((e:UserType)=>{
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

//AllTypeAction
type ActionsTypes = InfoActionsTypes<typeof actions>;
export const actions = {
    SetUsers: (Users: Array<UserType>, AllRoles: Array<string>) => ({type: "ADMIN_GET_USER", Users, AllRoles} as const),
    SetRoles: (Email: string, Roles: Array<string>) => ({type: "ADMIN_SET_USER_ROLES", Email, Roles} as const),
    ClearState: () => ({type: LOG_OUT} as const),
}


export const GetUsersThunkCreator = () =>{
    return async (dispatch : Dispatch<ActionsTypes>,getState:()=>AppStateType) => {
        await AuthAPI.GetUser().then((response:any) =>{
            dispatch(actions.SetUsers(response.data.users,response.data.allRoles));
        });
       /* AuthAPI.GetUser().then((temp : any)=>{
            console.log(temp)
        });*/

    }
}

export const SetUserRolesThunkCreator = (Email:string,Roles:Array<string>) : ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>=>{
    return async (dispatch ) => {
        AuthAPI.AddDeleteRole(Email,Roles).then((response:any) =>{
            dispatch(actions.SetRoles(Email,Roles));
        });
    }
}


export default AdminReducer;


