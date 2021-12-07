import React from "react";
import {configure} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {AuthAPI, setCookies} from "./API_AuthServer";

import Cookies from 'js-cookie'

import {AuthType} from "./API_AuthServer_Type";
configure({ adapter: new Adapter() });

jest.mock("js-cookie")

let data:AuthType = {
    email: "maag@mail.ru",
    isAuthenticated: true,
    message: null,
    refreshToken: "B/pCeBNSMcIzp+A59rVlRjeepwI0qqtakZ2STWo/48Y=",
    refreshTokenExpiration: "2021-12-03T08:54:44.3834497Z",
    roles: ['User', 'Moderator', 'Administrator'],
    token: "token-asdf",
    userName: "maag"
}
let AuthAPIMock = AuthAPI;
describe('AuthAPI', ()=>{
    it('setCookies test', ()=>{
        setCookies(data);
    })
    it('setCookies test data=null', ()=>{
        const data = null;
        setCookies(data);
    })
    it('Token', ()=>{
        AuthAPIMock.Token("","");
    })
    it('Register ', ()=>{
        AuthAPIMock.Register("","","","","");
    })
    it('RefreshToken', ()=>{
      // Cookies.get = () => "teken";
        AuthAPIMock.RefreshToken();
    })
    it('IsExistsToken', ()=>{
        AuthAPIMock.IsExistsToken();
        let get = jest.fn();
        get.mockReturnValue("teken")
        Cookies.get=get;
         //Cookies.get = () => "teken";
        AuthAPIMock.IsExistsToken();
    })
    it('AddDeleteRole ', ()=>{
        AuthAPIMock.AddDeleteRole("",["",""]);
    })
    it('RevokeToken  ', ()=>{
        AuthAPIMock.RevokeToken();
    })
    it('GetUser  ', ()=>{
        AuthAPIMock.GetUser();
    })
    it('UserTokens   ', ()=>{
        AuthAPIMock.UserTokens("");
    })
});