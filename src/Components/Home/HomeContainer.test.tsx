import {cleanup, fireEvent, queryByAttribute, render, screen} from "@testing-library/react";

import React from "react";
import {Provider} from "react-redux";

import HomeCompose from "./HomeContainer";
import {LOG_OUT} from "../../redux/Auth/Auth-Reducer";
import {createStore} from "redux";
import {BrowserRouter} from "react-router-dom";
import {AppStateType, reducer} from "../../redux/redux-store";
import {QuestionReducer} from "../../redux/Question-Redux";
afterEach(cleanup);

let Query = {
    dateAdd:"string",
    description: "null|string",
    id:"string",
    idParent:"string",
    images:"null",
    isHiddenContentTest: true,
    isIgnoreTest: true,
    name:"Query1",
}
let Query2 = {
    dateAdd:"string",
    description: "null|string",
    id:"string",
    idParent:"string",
    images:"null",
    isHiddenContentTest: true,
    isIgnoreTest: false,
    name:"string",
}
let hist = {
    idParent: "00000000-0000-0000-0000-000000000000",
    name: "maag",
    page: 1
}
let hist2 = {
    idParent: "00000000-0000-0000-0000-000000000000",
    name: "maag2",
    page: 1
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



describe('Home component', ()=>{

    let GetQuestsPagination=jest.fn();
    //Pagination
    it('Pagination ItemInterval start', ()=>{
        let state = Store.getState();
        state.QuestionReducer.DependOnParentQuestion.sizePage=10;
        state.QuestionReducer.DependOnParentQuestion.page=1;
        let dom= renderWithRedux( <HomeCompose />,state)
    })
    it('Pagination ItemInterval finish', ()=>{
        let state = Store.getState();
        state.QuestionReducer.DependOnParentQuestion.sizePage=10;
        state.QuestionReducer.DependOnParentQuestion.page=10;
        let dom= renderWithRedux( <HomeCompose />,state)
    })
    it('Pagination ItemInterval midle', ()=>{
        let state = Store.getState();
        state.QuestionReducer.DependOnParentQuestion.sizePage=10;
        state.QuestionReducer.DependOnParentQuestion.page=5;
        let dom= renderWithRedux( <HomeCompose />,state)
    })

    //Question
    it('Question Question_img', ()=>{
        let state = Store.getState();
        state.QuestionReducer.DependOnParentQuestion.questions = [Query,Query2]
        let dom= renderWithRedux( <HomeCompose />,state)
        let temp = dom.container.querySelector(".Question_img");
        if(temp) {
            fireEvent.click(temp);
        }
    })
    it('Question Question_img=null', ()=>{
        let state = Store.getState();
        state.QuestionReducer.DependOnParentQuestion.questions = [Query,Query2]
        state.QuestionReducer.DependOnParentQuestion.questions[0].images=null;
        let dom= renderWithRedux( <HomeCompose />,state);

    })
    it('Question click GetQuests ', ()=>{
        let state = Store.getState();
        state.QuestionReducer.DependOnParentQuestion.questions = [Query,Query2]
        let dom= renderWithRedux( <HomeCompose />,state)

        let Query1 = dom.getByText("Query1");
        fireEvent.click(Query1);
    })
    it('Question click SetEnableAllQuestions trye ', ()=>{
        let state = Store.getState();
        state.QuestionReducer.DependOnParentQuestion.questions=[Query];
        let dom= renderWithRedux( <HomeCompose />,state)
        let temp = dom.getByText("Включить все вопросы в тест");
        fireEvent.click(temp);
    })
    it('Question click SetEnableAllQuestions false ', ()=>{
        let state = Store.getState();
        state.QuestionReducer.DependOnParentQuestion.questions=[Query];
        let dom= renderWithRedux( <HomeCompose />,state)

        let temp = dom.getByText("Исключить все вопросы в тест");
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

    //Home
    it('Home Render is false', ()=>{
        let state = Store.getState();
        state.QuestionReducer.DependOnParentQuestion.questions=null;
        renderWithRedux( <HomeCompose/>,state)
    })
    it('Home Render', ()=>{
        renderWithRedux( <HomeCompose/>)
    })
    it('Home GetQuestsReturn', ()=>{
        let state = Store.getState();
        state.QuestionReducer.stories=[hist,hist2];
        let dom= renderWithRedux( <HomeCompose/>,state)
        const btn = dom.getByText("maag")
        fireEvent.click(btn);
    })

    it('Home GetQuestsPagination ItemInterval=start', ()=>{
        let state = Store.getState();
        state.QuestionReducer.DependOnParentQuestion={
            idParent  :null,
            nameParent  :null,
            page  :1,
            questions :[Query],
            sizePage  :10,
            sizeQuestions  :100,
        };
        let dom= renderWithRedux( <HomeCompose />,state);
        let pagination = dom.container.querySelectorAll(".pagination");
        let massItemA = pagination[0].querySelectorAll("a");
        for(let i=0;i<massItemA.length;i++)
        {
            fireEvent.click(massItemA[i]);
        }

    })
    it('Home GetQuestsPagination ItemInterval=midle', ()=>{
        let state = Store.getState();
        state.QuestionReducer.DependOnParentQuestion={
            idParent  :null,
            nameParent  :null,
            page  :1,
            questions :[Query],
            sizePage  :2,
            sizeQuestions  :100,
        };
        let dom= renderWithRedux( <HomeCompose />,state);
        let pagination = dom.container.querySelectorAll(".pagination");
        let massItemA = pagination[0].querySelectorAll("a");
        for(let i=0;i<massItemA.length;i++)
        {
            fireEvent.click(massItemA[i]);
        }

    })
    it('Home GetQuestsPagination ItemInterval=end', ()=>{
        let state = Store.getState();
        state.QuestionReducer.DependOnParentQuestion={
            idParent  :null,
            nameParent  :null,
            page  :10,
            questions :[Query],
            sizePage  :10,
            sizeQuestions  :100,
        };
        let dom= renderWithRedux( <HomeCompose />,state);
        let pagination = dom.container.querySelectorAll(".pagination");
        let massItemA = pagination[0].querySelectorAll("a");
        for(let i=0;i<massItemA.length;i++)
        {
            fireEvent.click(massItemA[i]);
        }

    })
    it('Home SetAskTest', ()=>{
        let dom= renderWithRedux( <HomeCompose />)
        let temp = dom.container.querySelector("#TestNormal");
        let temp2 = dom.container.querySelector("#TestGlobal");
        //screen.debug(temp)
        if (temp)
        fireEvent.click(temp);
        if (temp2)
        fireEvent.click(temp2);
    })





});