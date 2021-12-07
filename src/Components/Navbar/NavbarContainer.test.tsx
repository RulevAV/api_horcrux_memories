import {fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import NavbarContainer from "./NavbarContainer";
import {createStore} from "redux";
import {AppStateType, reducer} from "../../redux/redux-store";

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

const renderWithRedux = (component:any,State?:AppStateType
)=>{
    let store = State?updateState(State):Store;
    return{
        ...render( <BrowserRouter basename="/">
            <Provider store={store} >{component}</Provider>
        </BrowserRouter>),store
    }
};


describe('Home component', ()=>{
    it('Home Render', ()=>{
        let state = Store.getState();
        state.authReducer.Auth.isAuthenticated=true;
        let dom = renderWithRedux(  <NavbarContainer />,state)
        let temp = dom.queryByText("Выйти")
        if (temp)
        fireEvent.click(temp);
    })
    it('Navbar Render', ()=>{
        let state = Store.getState();
        state.authReducer.Auth.roles=null;
        let dom = renderWithRedux(  <NavbarContainer />,state)
    })
    it('Navbar ItemsMenu', ()=>{
        let state = Store.getState();
        state.authReducer.Auth.roles=["Administrator"];
        let dom = renderWithRedux(  <NavbarContainer />,state)
    })
    it('Navbar Render null', async ()=>{
        let dom = renderWithRedux(  <NavbarContainer />)
    })

});