import {configure} from "enzyme";
import React from "react";
import App from "./App";
import {Provider} from "react-redux";
import {BrowserRouter, NavLink} from "react-router-dom";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {fireEvent, render} from "@testing-library/react";
import { createStore} from "redux";
import store, {AppStateType, reducer} from "./redux/redux-store";
configure({ adapter: new Adapter() });

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

    // it('IsLockScreen true', ()=>{
    //     let state = store.getState();
    //     state.authReducer.IsLockScreen=true;
    //     let dom = renderWithRedux(<App />,state);
    // })
    // it('IsLockScreen false', ()=>{
    //     let state = store.getState();
    //     state.authReducer.IsLockScreen=false;
    //     let dom = renderWithRedux(<App />,state);
    // })
    // it('Login Direct', ()=>{
    //     let state = store.getState();
    //     state.authReducer.InitialApp=true;

    //     let dom = renderWithRedux(<App />,state);
    //     let HomeDirect = dom.getByText("Login");
    //     fireEvent.click(HomeDirect)
    // })
    // it('Registration Direct', ()=>{
    //     let dom = renderWithRedux(<App />);
    //     let RegistrationDirect = dom.getByText("Registration");
    //     fireEvent.click(RegistrationDirect)
    // })
    // it('Admin Direct', ()=>{
    //     let dom = renderWithRedux(<App />);
    //     let AdminDirect = dom.getByText("Admin");
    //     fireEvent.click(AdminDirect)
    // })
    // it('Home Direct', ()=>{
    //     let dom = renderWithRedux(<App />);
    //     let HomeDirect = dom.getByText("Home");
    //     fireEvent.click(HomeDirect)
    // })
    // it('TestQuestion Directs', ()=>{
    //     let dom = renderWithRedux(<App />);
    //     let TestQuestionDirects = dom.getByText("TestQuestionDirects");
    //     fireEvent.click(TestQuestionDirects)
    // })
    // it('Moderator Direct', ()=>{
    //     let dom = renderWithRedux(<App />);
    //     let ModeratorDirect = dom.getByText("Moderator");
    //     fireEvent.click(ModeratorDirect)

    // })
});