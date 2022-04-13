import {AuthAPI} from "../api/API_AuthServer";
import {AppStateType, InfoActionsTypes} from "./redux-store";
import {Dispatch} from "react";
import {ThunkAction} from "redux-thunk";
import {GetUserType, UserType} from "../api/API_AuthServer_Type";

//TypeAction
type ActionsTypesAdmin = InfoActionsTypes<typeof AdminActions>;

export let initialState:GetUserType = {
    users:[],
    allRoles:[]
};

export const AdminReducer = (state=initialState, action : ActionsTypesAdmin):GetUserType=> {
    switch (action.type) {
        case "ADMIN_GET_USER":{
            return {
                ...state,
                users:action.Users,
                allRoles:action.AllRoles
            };
        }
        case "ADMIN_SET_USER_ROLES":{
            let mass = state.users.map((e:UserType)=>{
                if(e.email !==action.Email)
                return e;
                else return {
                    ...e,
                    roles:action.Roles
                }
            })
            return {
                ...state,
                users :[
                    ...mass,
                ]
            };
        }
        case "ClearState":{
            return initialState;
        }
      
        default: return state;
    }
}


export const AdminActions = {
    SetUsers: (Users: Array<UserType>, AllRoles: Array<string>) => ({type: "ADMIN_GET_USER", Users, AllRoles} as const),
    SetRoles: (Email: string, Roles: Array<string>) => ({type: "ADMIN_SET_USER_ROLES", Email, Roles} as const),
  //  LogOut: () => ({type: LOG_OUT} as const),
    ClearState: () => ({type: "ClearState"} as const),
  //  LockScreen:(IsLockScreen:boolean)=>({type: LOCK_SCREEN,IsLockScreen}as const)
}

export const AdminActionsThunkCreator = {
    GetUsers:() =>{
        return async (dispatch : Dispatch<ActionsTypesAdmin>) => {
            // dispatch(AdminActions.LockScreen(true));
            // await AuthAPI.getUser().then((response) =>{
            //     dispatch(AdminActions.SetUsers(response.data.users,response.data.allRoles));
            // });
            // dispatch(AdminActions.LockScreen(false));

        }
    },
    SetUserRoles: (Email:string,Roles:Array<string>) : ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypesAdmin>=>{
        return async (dispatch ) => {
            // dispatch(AdminActions.LockScreen(true));
            // AuthAPI.AddDeleteRole(Email,Roles).then((response) =>{
            //     dispatch(AdminActions.SetRoles(Email,Roles));
            // });
            // dispatch(AdminActions.LockScreen(false));
        }
    }

}

export default AdminReducer;


