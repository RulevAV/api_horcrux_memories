import {render, screen} from "@testing-library/react";

import React from "react";
import {BrowserRouter} from "react-router-dom";
import Pcompose from "./LoginContainer";
import store from "../../../redux/redux-store";
import {Provider} from "react-redux";

describe('Login component', ()=>{
    it('Login Render', ()=>{

        render(  <BrowserRouter basename="/">
            <Provider store={store}>
                <Pcompose />
            </Provider>
        </BrowserRouter>)

        //Типы поиска
    })

});