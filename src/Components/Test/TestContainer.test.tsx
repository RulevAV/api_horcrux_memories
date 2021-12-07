import React from "react";
import {configure,mount} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {Provider} from "react-redux";
import {cleanup, fireEvent, render} from "@testing-library/react";
import {createStore} from "redux";
import WithTestContainer from "./TestContainer";
import {BrowserRouter} from "react-router-dom";
import {AppStateType, reducer} from "../../redux/redux-store";

configure({ adapter: new Adapter() });

afterEach(cleanup);

const question = {
    idParent: "ec845c05-761e-496d-2264-08d978386983",
        name: "Скрытые фигуры +-",
        description: null,
        images:"",
        isIgnoreTest: false,
        isHiddenContentTest: true,
        id: "71c035d0-6855-4626-a33d-08d97c198df7",
        dateAdd: "2021-09-20T16:52:53"
}


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

describe('QuestionTest component', ()=>{
    it('QuestionTestFun', ()=>{
        let dom = renderWithRedux(<WithTestContainer/>);
    })
    it('QuestionTest isFinish', ()=>{
        let state = Store.getState();
        state.TestReducer.isFinish = true;
        let dom = renderWithRedux(<WithTestContainer />);

    })
    it('QuestionTest QuestionTestFun ', ()=>{
        let state = Store.getState();
        state.TestReducer.isFinish = false;
        state.TestReducer.Ask.question = question;
        let dom = renderWithRedux(<WithTestContainer />);
        let next = dom.getByText("Дальше");
        fireEvent.click(next);
    })

    it('QuestionTestFun test images', ()=>{
        let state = Store.getState();
        state.TestReducer.Ask.question = question;
        state.TestReducer.Ask.question.images = "images";
        let dom = renderWithRedux(<WithTestContainer />);
    })
    it('QuestionTestFun test SetIsHidden true', ()=>{
          let state = Store.getState();
          state.TestReducer.Ask.question = question;
          state.TestReducer.Ask.question.isHiddenContentTest = true;

          let dom = renderWithRedux(<WithTestContainer />);

          let Show = dom.getByText(/Показать/i)
          fireEvent.click(Show)
  })
    it('QuestionTestFun test SetIsHidden false', ()=>{
        let state = Store.getState();
        state.TestReducer.Ask.question = question;
        state.TestReducer.Ask.question.isHiddenContentTest = false;
        let dom = renderWithRedux(<WithTestContainer />);
    })
    it('QuestionTestFun description!=null', ()=>{
        let state = Store.getState();
        state.TestReducer.Ask.question = question;
        state.TestReducer.Ask.question.description = "description";
        let dom = renderWithRedux(<WithTestContainer />);
    })
    it('QuestionTestFun test IgnoreTest', ()=>{
        let state = Store.getState();
        state.TestReducer.Ask.question = question;
        let dom = renderWithRedux(<WithTestContainer />);
        let isIgnoreTest = dom.container.querySelector("#isIgnoreTest")
        if (isIgnoreTest)
        fireEvent.click(isIgnoreTest)
})

});