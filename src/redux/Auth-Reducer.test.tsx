import authReducer, {
    AuthActions, AuthActionsThunkCreator, initialState,
} from "./Auth-Reducer";

import {AuthAPI} from "../api/API_AuthServer";
import Cookies from "js-cookie";
import {AuthType} from "../api/API_AuthServer_Type";

jest.mock("js-cookie")
jest.mock("../api/API_AuthServer")
const AuthAPIMock = AuthAPI;

let User:AuthType = {
    message: null,
    isAuthenticated: false,
    userName: "",
    email: "",
    roles: [],
    token: "",
    refreshToken: "",
    refreshTokenExpiration: ""
}

describe('Auth-Reducer', ()=>{
    const dispatchMock = jest.fn();
    it('test action SetUsers', ()=>{
        let SetUsers = AuthActions.SetUser(User);
        let newState = authReducer(initialState,SetUsers);
        expect(newState.Auth).toMatchObject(User);
    });
    it('test action Logout', ()=>{
        let SetUsers = AuthActions.Logout();
        let newState = authReducer(initialState,SetUsers);
    });
    it('test action UserRegister', ()=>{
        let SetUsers = AuthActions.UserRegister(true,"");
        let newState = authReducer(initialState,SetUsers);
    });
    it('test action LockScreen', ()=>{
        let SetUsers = AuthActions.LockScreen(true);
        let newState = authReducer(initialState,SetUsers);
        expect(newState.IsLockScreen).toBe(true);
    });
    it('test action InitialApp Cookies("Auth")===null', ()=>{
        let SetUsers = AuthActions.InitialApp();
        let newState = authReducer(initialState,SetUsers);
    });
    it('test action InitialApp', ()=>{
        let SetUsers = AuthActions.InitialApp();
        const get = jest.fn();
        get.mockReturnValue(987);
        Cookies.get=get;
        let newState = authReducer(initialState,SetUsers);
    });
    //ThunkCreator
    it('test action SetUserThunkCreator status=200',async ()=>{
        const thunk = AuthActionsThunkCreator.SetUser("","");
        const response ={
            status:200,
            data :{
                users:[],
                allRoles:[]
            }
        };
        let prom = Promise.resolve(response);
        const Token = jest.fn();
        Token.mockReturnValue(prom);
        AuthAPIMock.Token=Token;

        // @ts-ignore
        await thunk(dispatchMock);
        expect(dispatchMock).toBeCalled();
    });
    it('test action SetUserThunkCreator status!=200',async ()=>{
        const thunk = AuthActionsThunkCreator.SetUser("","");
        const response ={
            status:400,
        };
        let prom = Promise.resolve(response);
        const Token = jest.fn();
        Token.mockReturnValue(prom);
        AuthAPIMock.Token=Token;

        // @ts-ignore
        await thunk(dispatchMock);
        expect(dispatchMock).toBeCalled();
    });

    it('test action RefreshAuthCookieThunkCreator  status=200',async ()=>{
        const thunk = AuthActionsThunkCreator.RefreshAuthCookie();
        const response ={
            status:200,
            data :{
                isAuthenticated:true
            }
        };
        let prom = Promise.resolve(response);
        const RefreshToken = jest.fn();
        RefreshToken.mockReturnValue(prom);
        AuthAPIMock.RefreshToken=RefreshToken;
        // @ts-ignore
        await thunk(dispatchMock);
        expect(dispatchMock).toBeCalled();
    });
    it('test action RefreshAuthCookieThunkCreator  status!=200',async ()=>{
        const thunk = AuthActionsThunkCreator.RefreshAuthCookie();
        const response ={
            status:400,
        };
        let prom = Promise.resolve(response);
        const RefreshToken = jest.fn();
        RefreshToken.mockReturnValue(prom);
        AuthAPIMock.RefreshToken=RefreshToken;
        // @ts-ignore
        await thunk(dispatchMock);
        expect(dispatchMock).toBeCalled();
    });
    it('test action RefreshAuthCookieThunkCreator  status=200 isAuthenticated = false',async ()=>{
        const thunk = AuthActionsThunkCreator.RefreshAuthCookie();
        const response ={
            status:200,
            data :{
                isAuthenticated:false
            }
        };
        let prom = Promise.resolve(response);
        const RefreshToken = jest.fn();
        RefreshToken.mockReturnValue(prom);

        AuthAPIMock.RefreshToken=RefreshToken;
        // @ts-ignore
        await thunk(dispatchMock);
        expect(dispatchMock).toBeCalled();
    });

    it('test action UserRegisterThunkCreator status=200',async ()=>{
        const thunk = AuthActionsThunkCreator.UserRegister("","","","","");
        const response ={
            status:200,
            data :{
                isAuthenticated:true
            }
        };
        let prom = Promise.resolve(response);
        const Register = jest.fn();
        Register.mockReturnValue(prom);
        AuthAPIMock.Register=Register;

        // @ts-ignore
        await thunk(dispatchMock);
        expect(dispatchMock).toBeCalled();
    });
    it('test action UserRegisterThunkCreator status!=200',async ()=>{
        const thunk = AuthActionsThunkCreator.UserRegister("","","","","");

        const response ={
            status:400,
        };
        let prom = Promise.resolve(response);
        const Register = jest.fn();
        Register.mockReturnValue(prom);
        AuthAPIMock.Register=Register;
        // @ts-ignore
        await thunk(dispatchMock);
        expect(dispatchMock).toBeCalled();
    });


    it('test action LogoutThunkCreator ',async ()=>{
        const thunk = AuthActionsThunkCreator.Logout();
        const response ={

        };
        let prom = Promise.resolve(response);
        const RevokeToken = jest.fn();
        RevokeToken.mockReturnValue(prom);
        AuthAPIMock.RevokeToken=RevokeToken;
        // @ts-ignore
        await thunk(dispatchMock);
        expect(dispatchMock).toBeCalled();
    });
})

