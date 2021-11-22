import React from "react";
import {configure,mount} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {Provider} from "react-redux";
import store from "../../redux/redux-store";
import {BrowserRouter} from "react-router-dom";
import ModeratorCompose from "./ModeratorContainer";
configure({ adapter: new Adapter() });
describe('Moderator', ()=>{
    const fn = jest.fn()

    it('Moderator test props', ()=>{
        let dom = mount(  <BrowserRouter basename="/">
            <Provider store={store}>
            <ModeratorCompose/>
        </Provider>
            </BrowserRouter>);
    })

});