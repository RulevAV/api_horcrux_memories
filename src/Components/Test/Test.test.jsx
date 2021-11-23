import React from "react";
import {configure,mount} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Test from "./Test";
import {BrowserRouter} from "react-router-dom";
import {fireEvent, render} from "@testing-library/react";
configure({ adapter: new Adapter() });


let Props = {
    Test:{
        IdRoot:"",
        Ask:{
            question: {
                idParent: "ec845c05-761e-496d-2264-08d978386983",
                name: "Скрытые фигуры +-",
                description: null,
                images:"",
                isIgnoreTest: false,
                isHiddenContentTest: false,
                id: "71c035d0-6855-4626-a33d-08d97c198df7",
                dateAdd: "2021-09-20T16:52:53"
            },
            sizeAsk: 1778,
            passedAsk: 2
        },
        TestHistory:[],

    },
    match:{
        params:{
            nameTest:""
        }},
    StartAsk: jest.fn(),
    NextAsk: jest.fn(),

}

describe('Admin>TableUsers> component', ()=>{
    it('RowTable test props', ()=> {
        let dom = render( <BrowserRouter basename="/">
            <Test {...Props}/>
        </BrowserRouter>)
        let temp = dom.queryByText("Дальше");
        fireEvent.click(temp);
    })

});