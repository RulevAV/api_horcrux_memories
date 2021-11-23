import {render, screen} from "@testing-library/react";
import React from "react";
import Navbar from "./Navbar";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "../../redux/redux-store";

const data = {
    isAuthenticated: true,
    roles: ['User', 'Moderator', 'Administrator'],
}

describe('Navbar component', ()=>{
    it('Navbar Render', async ()=>{
        render(  <BrowserRouter basename="/">
            <Provider store={store}>
                <Navbar data={data} Logout={()=>{}} RefreshAuthCookie={()=>{}}/>
            </Provider>
        </BrowserRouter>)
    })
    it('Navbar Render null', async ()=>{
        render(  <BrowserRouter basename="/">
            <Provider store={store}>
                <Navbar data={{}}/>
            </Provider>
        </BrowserRouter>)
    })

});