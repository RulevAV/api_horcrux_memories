import React from "react";
import {configure,mount} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Moderator from "./Moderator";
configure({ adapter: new Adapter() });
describe('Moderator', ()=>{
    const fn = jest.fn()

    it('Moderator test props', ()=>{
        let dom = mount(<Moderator/>);
    })

});