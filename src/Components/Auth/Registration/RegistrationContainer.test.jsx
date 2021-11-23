import {fireEvent, queryByAttribute, render, screen} from "@testing-library/react";

import React from "react";
import {BrowserRouter} from "react-router-dom";
import RegistrationCompose from "./RegistrationContainer";
import {Provider} from "react-redux";
import {LOG_OUT} from "../../../redux/Auth-Reducer";
import {createStore} from "redux";

const initialState = {
    authReducer:{
        Auth:{
            message: null,
            isAuthenticated: false,
            userName: null,
            email: null,
            roles: [],
            token: null,
            refreshToken: null,
            refreshTokenExpiration: null
        },
        Register: {
            isRegister : false,
            LoginRegistration:"",
        }
    }

};
export const reducer = (state=initialState, action)=> {
    switch (action.type) {
        case "SET_USER_DATA":{
            return {
                ...state,
                Auth:{
                    ...action.data,
                },
            };
        }
        case LOG_OUT:{
            return initialState
        }
        case "USER_REGISTER":{
            return {
                ...state,
                Register: {
                    ...state.Register,
                    isRegister : action.isRegister,

                }
            };
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
        ...render( <BrowserRouter basename="/">
            <Provider store={store} >{component}</Provider>
        </BrowserRouter>),store
    }
};



describe('RegistrationCompose component', ()=>{

    it('RegistrationCompose Render', ()=>{
        let dom = renderWithRedux(<RegistrationCompose/>);
        const getById = queryByAttribute.bind(null, 'id');
        const btn = getById(dom.container, 'Register');
        fireEvent.click(btn);
    })
});