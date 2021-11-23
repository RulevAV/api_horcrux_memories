import {fireEvent, queryByAttribute, render, screen} from "@testing-library/react";

import React from "react";
import Login from "./Login";
import {BrowserRouter} from "react-router-dom";
import {configure,shallow,mount} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
const SetUser=(Email,Password)=>{};
const RegisterUser=()=> {};
const title="Войдите в аккаунт";
configure({ adapter: new Adapter() });

describe('Login component', ()=>{
    it('Login Render', ()=>{

        render( <BrowserRouter basename="/">
            <Login SetUser={SetUser} RegisterUser={RegisterUser}title={title}/>
        </BrowserRouter>,)

        //Типы поиска
        expect( screen.getByLabelText(/Логин/i)).toBeInTheDocument();//ищет label по содержимым html
        expect( screen.getByPlaceholderText(/Введите логин/i)).toBeInTheDocument();//поиск элементов по Placeholder
        expect( screen.getByAltText(/icon_User/i)).toBeInTheDocument();//ищет картинки по alt атрибуту
        expect( screen.getByDisplayValue(/maag@mail.ru/i)).toBeInTheDocument();//проверить value input
    })
    it('Login Render null', ()=>{

       let dom = mount( <BrowserRouter basename="/">
            <Login />
        </BrowserRouter>)

    })
    it('Login test Exit', ()=>{

        let dom= render( <BrowserRouter basename="/">
            <Login SetUser={SetUser} RegisterUser={RegisterUser}title={title}/>
        </BrowserRouter>)
        const getById = queryByAttribute.bind(null, 'id');
        const btn = getById(dom.container, 'Exit');
        fireEvent.click(btn);
    })
});