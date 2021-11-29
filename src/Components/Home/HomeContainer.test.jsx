import {cleanup, fireEvent, queryByAttribute, render, screen} from "@testing-library/react";

import React, {useState} from "react";
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
    images:"null",
    isHiddenContentTest: true,
    isIgnoreTest: true,
    name:"string",
}
let initialState = {
    QuestionReducer:{
        DependOnParentQuestion:{
            idParent: "string|null",
            nameParent: "string|null",
            page: 1,
            questions: [Query],
            sizePage: 2,
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
    initialState

)=>{
    let store=Store;
    if(initialState){
        store = createStore(reducer,initialState);
        store.dispatch=jest.fn();
    }
    return{
        ...render(  <BrowserRouter basename="/">
            <Provider store={store} >{component}</Provider>
        </BrowserRouter>),store
    }

};


describe('Home component', ()=>{
    let GetQuestsPagination=jest.fn();
    const SetAskTest = jest.fn()
    const GetQuests = jest.fn();
    //Home
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

    //Question
    it('Question Question_img', ()=>{
        let dom= renderWithRedux( <HomeCompose />)
                let temp = dom.container.querySelector(".Question_img a");
                fireEvent.click(temp);
    })
    it('Question Question_img=null', ()=>{
        let state =JSON.parse(JSON.stringify(initialState));
        state.QuestionReducer.DependOnParentQuestion.questions[0].images=null;
        let dom= renderWithRedux( <HomeCompose />,state);

    })
    it('Question click Open ', ()=>{

        let dom= renderWithRedux( <HomeCompose />)

           let temp = dom.getByText("Открыть");
           fireEvent.click(temp);
    })
    it('Question Pagination click ', ()=>{

        let dom= renderWithRedux( <HomeCompose />)
          //let dom = mount( <Pagination id={"Pagination"} sizePage={sizePage} page={page} stories={stories} GetQuestsPagination={fn} Link={useRefSpy}/>)
        let items = dom.container.querySelectorAll("#Pagination1 a");
        for(let i=0; i<items.length;i++)
        {
           fireEvent.click(items[i]);
        }
    })


    //Pagination
    it('Scroll Pagination', ()=>{


        let dom= renderWithRedux( <HomeCompose />)
        let ul1 = dom.container.querySelector("#Pagination1 ul");
        let ul2 = dom.container.querySelector("#Pagination2 ul");

        fireEvent.scroll(ul1, { target: { scrollX: 100000 } });
        fireEvent.scroll(ul2, { target: { scrollX: 100000 } });


    })
});