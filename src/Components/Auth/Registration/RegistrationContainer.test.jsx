import {render, screen} from "@testing-library/react";

import React from "react";
import {BrowserRouter} from "react-router-dom";
import RegistrationCompose from "./RegistrationContainer";
import {Provider} from "react-redux";
import store from "../../../redux/redux-store";

describe('RegistrationCompose component', ()=>{

    it('RegistrationCompose Render', ()=>{

        render(  <BrowserRouter basename="/">
            <Provider store={store}>
                <RegistrationCompose />
            </Provider>
        </BrowserRouter>)
    })
});