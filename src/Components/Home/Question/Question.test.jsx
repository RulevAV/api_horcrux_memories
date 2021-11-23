import {fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import Question from "./Question";
import {BrowserRouter} from "react-router-dom";

let index = 1;
let Query = {
    dateAdd:"string",
    description: "null|string",
    id:"string",
    idParent:"string",
    images:"string",
    isHiddenContentTest: true,
    isIgnoreTest: true,
    name:"string",
}
describe('Question component', ()=>{
    const SetAskTest = jest.fn()
    const GetQuests = jest.fn();
    it('Question Render', ()=>{

        let dom = render( <BrowserRouter basename="/">
                <Question key={index} SetAskTest={SetAskTest} {...Query} GetQuests={GetQuests}/>
        </BrowserRouter>)

        let temp = dom.getByText("Открыть");
        fireEvent.click(temp);
    })
    it('Question Question_img', ()=>{

        let dom = render( <BrowserRouter basename="/">
            <Question key={index} SetAskTest={SetAskTest} {...Query} GetQuests={GetQuests}/>
        </BrowserRouter>)

        let temp = dom.container.querySelector(".Question_img a");
        fireEvent.click(temp);
    })

});