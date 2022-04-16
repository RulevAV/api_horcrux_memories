import React from "react";
import {configure} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import {Provider} from "react-redux";
import {cleanup, render,fireEvent} from "@testing-library/react";
import {createStore} from "redux";
import {AppStateType, reducer} from "../../redux/redux-store";
import {BrowserRouter} from "react-router-dom";
import { AdminContainer } from "./AdminContainer";

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


const updateState = (NewState?:AppStateType)=>{
    let NewStore;
    if (NewState)
        NewStore = createStore(reducer,NewState);
    else
        NewStore = createStore(reducer);

    NewStore.dispatch=jest.fn();
    return NewStore;
}

let Store = updateState();

const renderWithRedux = (
    component:any, State?:AppStateType

)=>{
    let store = State?updateState(State):Store;
    return{
        ...render( <BrowserRouter basename="/">
            <Provider store={store} >{component}</Provider>
        </BrowserRouter>),store
    }
};

describe('AdminCompose component', ()=>{

    it('AdminCompose null props', ()=>{
        let dom = renderWithRedux(<AdminContainer/>);
    })
    it('AdminCompose User not have roles', ()=>{
        let State = Store.getState();
        const cloneUser = JSON.parse(JSON.stringify(user));
        cloneUser.roles=null;
        State.AdminReducer.users=[cloneUser];
        State.AdminReducer.allRoles = ["role1","role2"]
        let dom = renderWithRedux(<AdminContainer/>,State);
        const Open = dom.getByText("Открыть");
        fireEvent.click(Open);

    })
    //Save
    it('SetUserRoles Save', ()=>{
        let State = Store.getState();

        State.AdminReducer.users=[user];
        let dom = renderWithRedux(<AdminContainer/>,State);
        const Open = dom.getByText("Открыть");
        fireEvent.click(Open);
        const Save = dom.getByText("Сохранить");
        fireEvent.click(Save);

    })
    //Delete Role
    it('SetUserRoles DeleteRole', ()=>{
        let State = Store.getState();
        State.AdminReducer.users=[user];
        let dom = renderWithRedux(<AdminContainer/>,State);
        const Open = dom.getByText("Открыть");
        fireEvent.click(Open);

        //dom.debug();
        let DeleteButton = dom.getByRole("dialog")
            .querySelector("table tbody tr button");
        //screen.debug(DeleteButton)
        if(DeleteButton)
        fireEvent.click(DeleteButton);

    })
    //Add Role
    it('SetUserRoles AddRole', ()=>{
        let State = Store.getState();
        State.AdminReducer={
            users : [user],
            allRoles : AllRoles,
        };
        let dom = renderWithRedux(<AdminContainer/>,State);
        const Open = dom.getByText("Открыть");
        fireEvent.click(Open);

        //dom.debug();
        let AddRole = dom.getByRole("dialog")
            .querySelector("#AllRolesUI li ");
        if(AddRole)
        fireEvent.click(AddRole);

    })
    it('SetUserRoles AddRole nameRol=null', ()=>{
        let State = Store.getState();
        State.AdminReducer={
            users : [user],
            allRoles : [null],
        };
        let dom = renderWithRedux(<AdminContainer/>,State);
        const Open = dom.getByText("Открыть");
        fireEvent.click(Open);

        let AddRole = dom.getByRole("dialog")
            .querySelector("#AllRolesUI li ");
        if (AddRole)
        fireEvent.click(AddRole);

    })
    it('SetUserRoles AddRole SelectRoles=null', ()=>{
        let State = Store.getState();
        State.AdminReducer={
            users : [user],
            allRoles : AllRoles,
        };
        State.AdminReducer.users.roles= ["rol1","rol2","rol3","rol4"];
        let dom = renderWithRedux(<AdminContainer/>,State);


    })
});