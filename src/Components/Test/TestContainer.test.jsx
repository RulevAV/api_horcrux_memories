import React from "react";
import {configure,mount} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {Provider} from "react-redux";
import {cleanup, fireEvent, render} from "@testing-library/react";
import {LOG_OUT} from "../../redux/Auth-Reducer";
import {createStore} from "redux";
import WithTestContainer from "./TestContainer";
import {BrowserRouter} from "react-router-dom";
import QuestionTest from "./QuestionTest/QuestionTest";

configure({ adapter: new Adapter() });

afterEach(cleanup);

const initialState = {
    TestReducer:{
        IdRoot:"",
        Ask:{
            question: {
                idParent: "ec845c05-761e-496d-2264-08d978386983",
                name: "Скрытые фигуры +-",
                description: null,
                images:"",
                isIgnoreTest: false,
                isHiddenContentTest: true,
                id: "71c035d0-6855-4626-a33d-08d97c198df7",
                dateAdd: "2021-09-20T16:52:53"
            },
            sizeAsk: 1778,
            passedAsk: 2
        },
        TestHistory:[]
    },


};
export const reducer = (state=initialState, action)=> {
    switch (action.type) {
        case "TEST_START":{
            return {
                ...state,
                Ask:{
                    ...action.Ask,
                }
            };
        }
        case "SET_ID_ROOT":{
            return {
                ...state,
                IdRoot: action.IdRoot,
            };
        }
        case "SET_TEST_HISTOTY":{
            return {
                ...state,
                TestHistory: action.TestHistory,
            };
        }
        case LOG_OUT: {
            return initialState;
        }
        case "TEST_CLEAR": {
            return initialState;
        }
        default: return state;
    }
}
let Store = createStore(reducer,initialState);
Store.dispatch=jest.fn();

const renderWithRedux = (
    component,store=Store

)=>{
    return{
        ...render(
            <BrowserRouter basename="/">
                <Provider store={store} >{component}</Provider>
            </BrowserRouter>
        ),store
    }
};


describe('QuestionTest component', ()=>{
    let QuestionTestFun = jest.fn();
    let SetIsHiddenFun = jest.fn();
    it('QuestionTestFun', ()=>{
        let dom = renderWithRedux(<WithTestContainer/>);
        let temp = dom.queryByText("Дальше");
        fireEvent.click(temp);
        //expect(GetUsers).toHaveBeenCalled()
    })
    it('QuestionTestFun test null', ()=>{
          let dom = renderWithRedux(<QuestionTest/>);

    })
    it('QuestionTestFun test images', ()=>{
        let dom = renderWithRedux(
            <QuestionTest images={"images"}/>
        );
    })
    it('QuestionTestFun test IgnoreTest', ()=>{
        let dom = renderWithRedux(
            <QuestionTest/>
        );
        let isIgnoreTest = dom.container.querySelector("#isIgnoreTest")
        fireEvent.click(isIgnoreTest)
    })
    it('QuestionTestFun test SetIsHidden', ()=>{
        let dom = renderWithRedux(
            <QuestionTest/>
        );
        let Show = dom.getByText("Показать")
        fireEvent.click(Show)
    })
    it('QuestionTestFun test next', ()=>{
       /* let dom = renderWithRedux(
            <QuestionTest images={"images"} QuestionTestFun={QuestionTestFun} SetIsHidden={SetIsHiddenFun}/>
        );*/
        /* let temp1 = dom.find('[value="Дальше"]')
         temp1.simulate("click");
         let temp2 = dom.find('[value="Показать"]')
         temp2.simulate("click");*/
    })
});