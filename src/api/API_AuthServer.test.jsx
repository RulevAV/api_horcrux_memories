import React from "react";
import {configure} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {AuthAPI, setCookies} from "./API_AuthServer";

import Cookies from 'js-cookie'


configure({ adapter: new Adapter() });

jest.mock("js-cookie")

let data = {
    email: "maag@mail.ru",
    isAuthenticated: true,
    message: null,
    refreshToken: "B/pCeBNSMcIzp+A59rVlRjeepwI0qqtakZ2STWo/48Y=",
    refreshTokenExpiration: "2021-12-03T08:54:44.3834497Z",
    roles: (3) ['User', 'Moderator', 'Administrator'],
    token: "token-asdf",
    userName: "maag"
}
let AuthAPIMock = AuthAPI;
describe('AuthAPI', ()=>{
    it('setCookies test', ()=>{
        const data ={
            refreshToken: "TtVnIIm+Ll+DOY7ukDeZNpcDis4iGUQInJPxdPiUnt4=",
            refreshTokenExpiration: "2021-12-07T16:41:46.8273352",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibWFhZyIsImp0aSI6Ijk0MDBlMmQyLTkyN2QtNGFmNC04NmEzLTM5M2VmODdjOGE2NCIsImVtYWlsIjoibWFhZ0BtYWlsLnJ1IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJDRkQ5RDc1RC04MEJFLTQ5RjgtQkU2Mi04QkQ1MzE5QTFEMUQiLCJyb2xlcyI6WyJVc2VyIiwiTW9kZXJhdG9yIiwiQWRtaW5pc3RyYXRvciJdLCJleHAiOjE2MzgwNjc5MTEsImlzcyI6IlNlY3VyZUFwaSIsImF1ZCI6IlNlY3VyZUFwaVVzZXIifQ.lWHg6bPb-unSBQtVMJPLYub3nKbJJ7J20v-kRuASkcQ",
        }
        setCookies(data);
    })
    it('Token', ()=>{
        AuthAPIMock.Token();
    })
    it('Register ', ()=>{
        AuthAPIMock.Register ();
    })
    it('RefreshToken', ()=>{
        AuthAPIMock.RefreshToken();
    })
    it('IsExistsToken', ()=>{
        AuthAPIMock.IsExistsToken();
         Cookies.get = () => "teken";
        AuthAPIMock.IsExistsToken();
    })
    it('AddDeleteRole ', ()=>{
        AuthAPIMock.AddDeleteRole();
    })
    it('RevokeToken  ', ()=>{
        AuthAPIMock.RevokeToken ();
    })
    it('GetUser  ', ()=>{
        AuthAPIMock.GetUser ();
    })
    it('UserTokens   ', ()=>{
        AuthAPIMock.UserTokens ();
    })
});