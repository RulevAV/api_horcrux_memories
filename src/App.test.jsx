import {configure, mount,shallow} from "enzyme";
import React from "react";
import App from "./App";
import {Provider} from "react-redux";
import {BrowserRouter, NavLink, Redirect} from "react-router-dom";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {fireEvent, render, screen} from "@testing-library/react";
import authReducer, {AuthType, LOG_OUT, Register} from "./redux/Auth-Reducer";
import {combineReducers, createStore} from "redux";
import {AdminReducer} from "./redux/Admin-Reducer";
import {QuestionReducer} from "./redux/Question-Redux";
import {TestReducer} from "./redux/Test-Reducer";
configure({ adapter: new Adapter() });

let reducer = combineReducers({
    authReducer,
    AdminReducer,
    QuestionReducer,
    TestReducer
});

let Store = createStore(reducer);
Store.dispatch=jest.fn();

const renderWithRedux = (
    component,
    {initialState, store=Store}={}

)=>{
    return{
        ...render( <BrowserRouter basename="/">
            <NavLink className="navbar-brand " to={"/login"} >Login</NavLink>
            <NavLink className="navbar-brand " to={"/registration"} >Registration</NavLink>
            <NavLink className="navbar-brand " to={"/Admin"} >Admin</NavLink>
            <NavLink className="navbar-brand " to={"/Moderator"} >Moderator</NavLink>
            <NavLink className="navbar-brand " to={"/"} >Home</NavLink>
            <NavLink className="navbar-brand " to={"/Test/nameTest"} >TestQuestionDirects</NavLink>

            <Provider store={store}>
                {component}
            </Provider>
        </BrowserRouter>),store
    }
};



describe('test redirect', ()=>{
    it('Login Direct', ()=>{
        let dom = renderWithRedux(<App />);
        let HomeDirect = dom.getByText("Login");
        fireEvent.click(HomeDirect)
    })
    it('Registration Direct', ()=>{
        let dom = renderWithRedux(<App />);
        let RegistrationDirect = dom.getByText("Registration");
        fireEvent.click(RegistrationDirect)
    })
    it('Admin Direct', ()=>{
        let dom = renderWithRedux(<App />);
        let AdminDirect = dom.getByText("Admin");
        fireEvent.click(AdminDirect)
    })
    it('Home Direct', ()=>{
        let dom = renderWithRedux(<App />);
        let HomeDirect = dom.getByText("Home");
        fireEvent.click(HomeDirect)
    })
    it('TestQuestion Directs', ()=>{
        let dom = renderWithRedux(<App />);
        let TestQuestionDirects = dom.getByText("TestQuestionDirects");
        fireEvent.click(TestQuestionDirects)
    })
    it('Moderator Direct', ()=>{
        let dom = renderWithRedux(<App />);
        let ModeratorDirect = dom.getByText("Moderator");
        fireEvent.click(ModeratorDirect)

    })
});