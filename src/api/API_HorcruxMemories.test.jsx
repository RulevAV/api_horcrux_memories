import React from "react";
import {configure} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {DataAPI} from "./API_HorcruxMemories";
configure({ adapter: new Adapter() });



describe('Admin>TableUsers> component', ()=>{

    it('RowTable test props', ()=>{
        //DataAPI
    })

});