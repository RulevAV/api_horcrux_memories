import {render, screen} from "@testing-library/react";

import React from "react";
import {BrowserRouter} from "react-router-dom";
import Registration from "./Registration";

describe('Registration component', ()=>{

    it('Registration Render', ()=>{

        render( <BrowserRouter basename="/">
            <Registration />
        </BrowserRouter>,)
    })
});