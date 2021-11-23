import {fireEvent, queryByAttribute, render, screen} from "@testing-library/react";

import React from "react";
import {BrowserRouter} from "react-router-dom";
import Registration from "./Registration";

describe('Registration component', ()=>{
    const RegisterUser = jest.fn();
    it('Registration Render', ()=>{

        let dom = render( <BrowserRouter basename="/">
            <Registration RegisterUser={RegisterUser} />
        </BrowserRouter>)
        const getById = queryByAttribute.bind(null, 'id');
        const btn = getById(dom.container, 'Register');
        fireEvent.click(btn);
    })
});
//Register