import React from "react";
import {configure,mount} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {Provider} from "react-redux";
import store, {AppStateType, reducer} from "../../redux/redux-store";
import {BrowserRouter} from "react-router-dom";
import ModeratorCompose from "./ModeratorContainer";
import {createStore} from "redux";
import {render} from "@testing-library/react";
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

const renderWithRedux = (component:any,State?:AppStateType
)=>{
    let store = State?updateState(State):Store;
    return{
        ...render( <BrowserRouter basename="/">
            <Provider store={store} >{component}</Provider>
        </BrowserRouter>),store
    }
};


describe('Moderator', ()=>{
    const fn = jest.fn()

    it('Moderator test props', ()=>{
        let dom = renderWithRedux(   <ModeratorCompose/>);
    })

});