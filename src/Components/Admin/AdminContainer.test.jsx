import React from "react";
import {configure,mount} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import {Provider} from "react-redux";
import {cleanup, queryByAttribute, render,fireEvent,screen} from "@testing-library/react";
import {createStore} from "redux";
import {LOG_OUT} from "../../redux/Auth-Reducer";
import AdminCompose from "./AdminContainer";

configure({ adapter: new Adapter() });

afterEach(cleanup);
const user = {
    id: 1,
    email:"user@secureapi.com",
    lastName:"Иван",
    firstName:"Иван",
    userName:"Ivan",
    roles: ["rol1","rol2"],
}
const AllRoles = ["rol1","rol2","rol3","rol4"];

const initialState = {
    AdminReducer:{
        Users : [],
        AllRoles : [],
    }

};


export const reducer = (state=initialState, action)=> {
    switch (action.type) {
        case "ADMIN_GET_USER":{
            return {
                ...state,
                Users:action.Users,
                AllRoles:action.AllRoles
            };
        }
        case "ADMIN_SET_USER_ROLES":{
            let mass = state.Users.map((e)=>{
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

let Store = createStore(reducer,initialState);
Store.dispatch=jest.fn();

const renderWithRedux = (component,{store=Store}={}

)=>{
    //console.log(store.getState())
    return{
        ...render(  <Provider store={store} >{component}</Provider>),store
    }
};

describe('AdminCompose component', ()=>{

    it('AdminCompose null props', ()=>{
        let dom = renderWithRedux(<AdminCompose/>);
    })
    it('AdminCompose User not have roles', ()=>{
        const cloneUser = JSON.parse(JSON.stringify(user));
        cloneUser.roles=null;
        initialState.AdminReducer.Users=[cloneUser];
        initialState.AdminReducer.AllRoles = ["role1","role2"]
        let dom = renderWithRedux(<AdminCompose/>);
        const Open = dom.getByText("Открыть");
        fireEvent.click(Open);

    })
    //Save
    it('SetUserRoles Save', ()=>{

        initialState.AdminReducer.Users=[user];
        let dom = renderWithRedux(<AdminCompose/>);
        const Open = dom.getByText("Открыть");
        fireEvent.click(Open);
        //screen.debug(open);
        const Save = dom.getByText("Сохранить");
        fireEvent.click(Save);

    })
    //Delete Role
    it('SetUserRoles DeleteRole', ()=>{

        initialState.AdminReducer.Users=[user];
        let dom = renderWithRedux(<AdminCompose/>);
        const Open = dom.getByText("Открыть");
        fireEvent.click(Open);

        //dom.debug();
        let DeleteButton = dom.getByRole("dialog")
            .querySelector("table tbody tr button");
        //screen.debug(DeleteButton)

        fireEvent.click(DeleteButton);

    })
    //Add Role
    it('SetUserRoles AddRole', ()=>{

        initialState.AdminReducer={
            Users : [user],
            AllRoles : AllRoles,
        };
        let dom = renderWithRedux(<AdminCompose/>);
        const Open = dom.getByText("Открыть");
        fireEvent.click(Open);

        //dom.debug();
        let AddRole = dom.getByRole("dialog")
            .querySelector("#AllRolesUI li ");
        fireEvent.click(AddRole);

    })
    it('SetUserRoles AddRole nameRol=null', ()=>{

        initialState.AdminReducer={
            Users : [user],
            AllRoles : [null],
        };
        let dom = renderWithRedux(<AdminCompose/>);
        const Open = dom.getByText("Открыть");
        fireEvent.click(Open);

        dom.debug();
        let AddRole = dom.getByRole("dialog")
            .querySelector("#AllRolesUI li ");
        fireEvent.click(AddRole);

    })
    it('SetUserRoles AddRole SelectRoles=null', ()=>{

        initialState.AdminReducer={
            Users : [user],
            AllRoles : AllRoles,
        };
        initialState.AdminReducer.Users.roles= ["rol1","rol2","rol3","rol4"];
        let dom = renderWithRedux(<AdminCompose/>);


    })
});