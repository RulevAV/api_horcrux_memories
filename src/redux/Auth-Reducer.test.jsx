import authReducer, {
    AuthActions,
    initialStateType, LogoutThunkCreator,
    RefreshAuthCookieThunkCreator,
    SetUserThunkCreator, UserRegisterThunkCreator
} from "./Auth-Reducer";
import {GetUsersThunkCreator} from "./Admin-Reducer";
import {AuthAPI} from "../api/API_AuthServer";


jest.mock("../api/API_AuthServer")
const AuthAPIMock = AuthAPI;

let User = {
    message: null,
    isAuthenticated: false,
    userName: null,
    email: null,
    roles: [],
    token: null,
    refreshToken: null,
    refreshTokenExpiration: null
}

describe('Auth-Reducer', ()=>{
    const dispatchMock = jest.fn();
    it('test action SetUsers', ()=>{
        let SetUsers = AuthActions.SetUser(User);
        let newState = authReducer(initialStateType,SetUsers);
        expect(newState.Auth).toMatchObject(User);
    });
    it('test action Logout', ()=>{
        let SetUsers = AuthActions.Logout();
        let newState = authReducer(initialStateType,SetUsers);
    });
    it('test action UserRegister', ()=>{
        let SetUsers = AuthActions.UserRegister();
        let newState = authReducer(initialStateType,SetUsers);
    });
    it('test action SetUserThunkCreator ',async ()=>{
        const thunk = SetUserThunkCreator();
        const response ={
            status:200,
            data :{
                users:[],
                allRoles:[]
            }
        };
        let prom = Promise.resolve(response);
        AuthAPIMock.Token.mockReturnValue(prom);
        await thunk(dispatchMock,()=>{});
        expect(dispatchMock).toBeCalled();
    });
    it('test action RefreshAuthCookieThunkCreator ',async ()=>{
        const thunk = RefreshAuthCookieThunkCreator();
        const response ={
            status:200,
            data :{
                isAuthenticated:true
            }
        };
        let prom = Promise.resolve(response);
        AuthAPIMock.RefreshToken.mockReturnValue(prom);
        await thunk(dispatchMock,()=>{});
        expect(dispatchMock).toBeCalled();
    });
    it('test action UserRegisterThunkCreator ',async ()=>{
        const thunk = UserRegisterThunkCreator();
        const response ={
            status:200,
            data :{
                isAuthenticated:true
            }
        };
        let prom = Promise.resolve(response);
        AuthAPIMock.Register.mockReturnValue(prom);
        await thunk(dispatchMock,()=>{});
        expect(dispatchMock).toBeCalled();
    });
    it('test action LogoutThunkCreator ',async ()=>{
        const thunk = LogoutThunkCreator();
        const response ={

        };
        let prom = Promise.resolve(response);
        AuthAPIMock.RevokeToken.mockReturnValue(prom);
        await thunk(dispatchMock,()=>{});
        expect(dispatchMock).toBeCalled();
    });
})

