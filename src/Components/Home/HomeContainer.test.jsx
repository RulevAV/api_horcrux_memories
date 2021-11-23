import {cleanup, fireEvent, queryByAttribute, render, screen} from "@testing-library/react";

import React from "react";
import {Provider} from "react-redux";

import HomeCompose from "./HomeContainer";
import {LOG_OUT} from "../../redux/Auth-Reducer";
import {createStore} from "redux";
import {BrowserRouter} from "react-router-dom";

afterEach(cleanup);
let Query = {
    dateAdd:"string",
    description: "null|string",
    id:"string",
    idParent:"string",
    images:"string",
    isHiddenContentTest: true,
    isIgnoreTest: true,
    name:"string",
}
const initialState = {
    QuestionReducer:{
        DependOnParentQuestion:{
            idParent: "string|null",
            nameParent: "string|null",
            page: 1,
            questions: [Query],
            sizePage: 1,
            sizeQuestions: 1
        },
        stories:[],
    },
    authReducer:{
        Auth:{
            isAuthenticated:true
        }
    },
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
    let GetQuestsPagination=jest.fn();
    it('Home Render', ()=>{
        renderWithRedux( <HomeCompose/>)
    })
    it('Home GetQuestsReturn', ()=>{
        let dom= renderWithRedux( <HomeCompose/>)
        const getById = queryByAttribute.bind(null, 'id');
        const btn = getById(dom.container, 'Return');
        fireEvent.click(btn);
    })
    it('Home GetQuestsPagination', ()=>{
        let dom= renderWithRedux( <HomeCompose GetQuestsPagination={GetQuestsPagination}/>)
        let temp = dom.container.querySelector("#Pagination1 a");
        //console.log(temp)
        //screen.debug(temp)
        //dom.debug()
        fireEvent.click(temp);
        //console.log(temp.children.length)

    })
    it('Home SetAskTest', ()=>{
        let dom= renderWithRedux( <HomeCompose />)
        let temp = dom.container.querySelector("#TestNormal");
        let temp2 = dom.container.querySelector("#TestGlobal");
        //screen.debug(temp)
        fireEvent.click(temp);
        fireEvent.click(temp2);
    })

});