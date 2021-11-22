import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {Provider} from "react-redux";
import store from "../../redux/redux-store";
import Home from "./Home";
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
let isAuthenticated = true;
let DependOnParentQuestion = {
    idParent: "string|null",
    nameParent: "string|null",
    page: 1,
    questions: [Query],
    sizePage: 1,
    sizeQuestions: 1
}
let stories;
let SetAskTest;
let GetQuestsPagination;
let GetQuestsReturn;
let GetQuests;

describe('Home component', ()=>{
    it('Home Render',  ()=>{

        render( <BrowserRouter basename="/">
            <Provider store={store}>
                <Home isAuthenticated={isAuthenticated} DependOnParentQuestion={DependOnParentQuestion}/>
            </Provider>
        </BrowserRouter>)

        //screen.debug()
        //Типы поиска
       // expect( screen.queryByText(/Загруженно/i)).toBeNull();//сначала эдлемента нет
        //expect(await screen.findByText(/Загруженно/i)).toBeInTheDocument();//когда выполнится асинхронный код должна появиться соответствующая строка
    })

});