import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {Provider} from "react-redux";
import store from "../../redux/redux-store";
import HomeCompose from "./HomeContainer";

describe('Home component', ()=>{
    it('Home Render', ()=>{

        render( <BrowserRouter basename="/">
            <Provider store={store}>
                <HomeCompose />
            </Provider>
        </BrowserRouter>)

    })

});