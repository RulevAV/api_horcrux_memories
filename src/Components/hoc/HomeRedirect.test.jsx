import React from "react";
import {WithHomeRedirect} from "./HomeRedirect";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "../../redux/redux-store";
import {configure,mount} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({ adapter: new Adapter() });

let CompTest = ()=>{
    return <div>
        Hello
    </div>
}

describe('Login component', ()=>{
    it('Login Render', ()=>{
       let Test = WithHomeRedirect(CompTest);
        let dom = mount(<BrowserRouter basename="/">
                <Provider store={store}>
                    <Test />
                </Provider>
            </BrowserRouter>
        )
        //Типы поиска
    })

});