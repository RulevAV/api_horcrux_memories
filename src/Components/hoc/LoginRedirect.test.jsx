import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "../../redux/redux-store";
import {configure,mount} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {LoginRedirect} from "./LoginRedirect";
configure({ adapter: new Adapter() });

let CompTest = ()=>{
    return <div>
        Hello
    </div>
}

describe('Login component', ()=>{
    it('Login Render', ()=>{
        let Test = LoginRedirect(CompTest);
        let dom = mount(<BrowserRouter basename="/">
                <Provider store={store}>
                    <Test />
                </Provider>
            </BrowserRouter>
        )
    })

});