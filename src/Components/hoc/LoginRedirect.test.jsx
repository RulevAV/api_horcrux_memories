import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "../../redux/redux-store";
import {configure,mount} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {LoginRedirect} from "./LoginRedirect";
import {LOG_OUT} from "../../redux/Auth-Reducer";
import {createStore} from "redux";
import {render} from "@testing-library/react";
configure({ adapter: new Adapter() });


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

let CompTest = ()=>{
    return <div>
        Hello
    </div>
}

describe('Hoc Login ', ()=>{
    it('Hoc Login no Authenticated', ()=>{
        let Test = LoginRedirect(CompTest);
        let dom = renderWithRedux(<Test />)
    })
    it('Hoc Login Authenticated', ()=>{
        initialState.authReducer.Auth.isAuthenticated=true;
        let Test = LoginRedirect(CompTest, {initialState});
        let dom = renderWithRedux(<Test />)
    })
});