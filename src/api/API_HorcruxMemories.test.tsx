import React from "react";
import {configure} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {DataAPI} from "./API_HorcruxMemories";
configure({ adapter: new Adapter() });


describe('DataAPI', ()=>{

    it('Portions', ()=>{
        DataAPI.Portions();
    })
    it('TestNext', ()=>{
        DataAPI.TestNext("",[],"",true,"");
    })
    it('TestStart', ()=>{
        DataAPI.TestStart("","");
    })
    it('EnableAllQuestions', ()=>{
        DataAPI.EnableAllQuestions("",true);
    })
});