import {render, screen} from "@testing-library/react";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "../../redux/redux-store";
import NavbarContainer from "./NavbarContainer";

describe('Home component', ()=>{
    it('Home Render', ()=>{
        render(  <BrowserRouter basename="/">
            <Provider store={store}>
                <NavbarContainer />
            </Provider>
        </BrowserRouter>)
    })

});