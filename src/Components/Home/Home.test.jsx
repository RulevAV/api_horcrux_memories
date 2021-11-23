import {fireEvent, queryByAttribute, render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {Provider} from "react-redux";
import store from "../../redux/redux-store";
import Home from "./Home";
import {configure, mount} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Pagination from "./Pagination/Pagination";

configure({ adapter: new Adapter() });

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

describe('Home component', ()=>{
    let GetQuests = jest.fn();
    let GetQuestsReturn = jest.fn();
    it('Home Return',  ()=>{

        let dom = render( <BrowserRouter basename="/">
            <Provider store={store}>
                <Home isAuthenticated={isAuthenticated} DependOnParentQuestion={DependOnParentQuestion} GetQuests={GetQuests} GetQuestsReturn={GetQuestsReturn}/>
            </Provider>
        </BrowserRouter>)

        const getById = queryByAttribute.bind(null, 'id');
        const btn = getById(dom.container, 'Return');
        fireEvent.click(btn);
        //screen.debug()
        //Типы поиска
        // expect( screen.queryByText(/Загруженно/i)).toBeNull();//сначала эдлемента нет
        //expect(await screen.findByText(/Загруженно/i)).toBeInTheDocument();//когда выполнится асинхронный код должна появиться соответствующая строка
    })
    it('Home Scroll',  ()=>{

        let dom = mount( <BrowserRouter basename="/">
            <Provider store={store}>
                <Home isAuthenticated={isAuthenticated} DependOnParentQuestion={DependOnParentQuestion} GetQuests={GetQuests} GetQuestsReturn={GetQuestsReturn}/>
            </Provider>
        </BrowserRouter>)
        let Pagination1 = dom.find("nav#Pagination1");
        let Pagination2 = dom.find("nav#Pagination2");
        const mEvent = {
            target: { scrollWidth: 100, scrollLeft: 50, clientWidth: 50 },
        };
        Pagination1.simulate("scroll",{mEvent});
        /*const getById = queryByAttribute.bind(null, 'id');
        const btn = getById(dom.container, 'Return');
        fireEvent.click(btn);*/
        //screen.debug()
        //Типы поиска
        // expect( screen.queryByText(/Загруженно/i)).toBeNull();//сначала эдлемента нет
        //expect(await screen.findByText(/Загруженно/i)).toBeInTheDocument();//когда выполнится асинхронный код должна появиться соответствующая строка
    })

});