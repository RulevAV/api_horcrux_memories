import React from "react";
import {configure} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {AuthAPI, getCookie, setResponseCookie, Token} from "./API_AuthServer";
configure({ adapter: new Adapter() });

//jest.mock("../api/API_AuthServer")



let AuthAPIMock = AuthAPI;
describe('Admin>TableUsers> component', ()=>{
    it('RowTable test props', ()=>{
        //let a = Token("asd","asd");
        //expect(AuthAPIMock.GetUser()).toBe(1)
    })
    it('RowTable test getCookie', ()=>{
       //setResponseCookie(data);
        //console.log(data.cookie)
    })

});