import React from "react";
import {WithHomeRedirect} from "./HomeRedirect";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {configure,mount} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {createStore} from "redux";
import {render} from "@testing-library/react";
import {AppStateType, reducer} from "../../redux/redux-store";
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


let CompTest = ()=>{
    return <div>
        Hello
    </div>
}

describe('Hoc Home test', ()=>{
    it('Hoc Home no Authenticated', ()=>{
       let Test = WithHomeRedirect(CompTest);
        let dom = renderWithRedux(<Test />)
    })
    it('Hoc Home  Authenticated', ()=>{
        let state = Store.getState();
        state.authReducer.Auth.isAuthenticated=true;
        let Test = WithHomeRedirect(CompTest);
        let dom = renderWithRedux(<Test />,state)
    })

});