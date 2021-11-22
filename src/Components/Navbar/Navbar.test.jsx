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

describe('Home component', ()=>{
    it('Home Render', async ()=>{
        render(  <BrowserRouter basename="/">
            <Provider store={store}>
                <Navbar data={data} Logout={()=>{}} RefreshAuthCookie={()=>{}}/>
            </Provider>
        </BrowserRouter>)
        //screen.debug()
        //Типы поиска
        //expect( screen.queryByText(/SPA_HorcruxMemories/i)).toBeNull();//сначала эдлемента нет
        //expect(await screen.findByText(/SPA_HorcruxMemories/i)).toBeInTheDocument();//когда выполнится асинхронный код должна появиться соответствующая строка
    })

});