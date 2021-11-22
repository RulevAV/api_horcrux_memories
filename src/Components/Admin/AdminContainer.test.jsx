import React from "react";
import {configure,mount} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import AdminCompose from "./AdminContainer";
import {Provider} from "react-redux";
import store from "../../redux/redux-store";

configure({ adapter: new Adapter() });


let AllRoles=["role1","role2","role3","role4","role5","role6"];

describe('Admin>TableUsers> component', ()=>{
    const GetUsers = jest.fn()

    it('RowTable test props', ()=>{
        let dom = mount(
            <Provider store={store}>
                <AdminCompose />
            </Provider>
        );

        //expect(GetUsers).toHaveBeenCalled()
    })

});