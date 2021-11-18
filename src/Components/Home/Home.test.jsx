import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {Provider} from "react-redux";
import store from "../../redux/redux-store";
import Home from "./Home";

describe('Home component', ()=>{
    it('Home Render', async ()=>{

        render( <BrowserRouter basename="/">
            <Provider store={store}>
                <Home pageTitle={"Hi"}/>
            </Provider>
        </BrowserRouter>)

        //screen.debug()
        //Типы поиска
        expect( screen.queryByText(/Загруженно/i)).toBeNull();//сначала эдлемента нет
        expect(await screen.findByText(/Загруженно/i)).toBeInTheDocument();//когда выполнится асинхронный код должна появиться соответствующая строка
    })

});