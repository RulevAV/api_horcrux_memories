import {fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import NavbarContainer from "./NavbarContainer";
import {AuthType, LOG_OUT, Register} from "../../redux/Auth-Reducer";
import {createStore} from "redux";

const initialState = {
    authReducer:{
        Auth:{
            message: null,
            isAuthenticated: true,
            userName: null,
            email: null,
            roles: [],
            token: null,
            refreshToken: null,
            refreshTokenExpiration: null
        } ,
        Register: {
            isRegister : false,
            LoginRegistration:"",
        }
    }
};

export const reducer = (state=initialState, action) => {
    switch (action.type) {
        case "GET_QUESTS":
            let history ={
                idParent: action.data.idParent,
                page: action.data.page
            }
            return {
                ...state,
                DependOnParentQuestion:{
                    ...action.data,
                },
                stories:[...state.stories,history]
            };
        case "SET_STORE":
            return {
                ...state,
                stories:action.data
            };
        case LOG_OUT: {
            return initialState;
        }
        default: return state;
    }
}
let Store = createStore(reducer,initialState);
Store.dispatch=jest.fn();

const renderWithRedux = (
    component,
    {initialState, store=Store}={}

)=>{
    return{
        ...render(  <BrowserRouter basename="/">
            <Provider store={store} >{component}</Provider>
        </BrowserRouter>),store
    }

};
describe('Home component', ()=>{
    it('Home Render', ()=>{
        let dom = renderWithRedux(  <NavbarContainer />)
        let temp = dom.queryByText("Выйти")
        fireEvent.click(temp);
    })

});