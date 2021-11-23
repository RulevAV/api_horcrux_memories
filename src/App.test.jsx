import {configure, mount,shallow} from "enzyme";
import React from "react";
import App from "./App";
import {Provider} from "react-redux";
import store from "./redux/redux-store";
import {BrowserRouter} from "react-router-dom";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({ adapter: new Adapter() });
describe('Admin>TableUsers> component', ()=>{

    it('RowTable test props', ()=>{
        let dom = shallow(<BrowserRouter basename="/">
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>);
    })

});