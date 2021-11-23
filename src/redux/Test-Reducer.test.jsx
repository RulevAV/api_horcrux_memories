import TestReducer, {initialState, NextAskThunkCreator, StartAskThunkCreator, TestActions} from "./Test-Reducer";
import {AuthAPI} from "../api/API_AuthServer";
import {DataAPI} from "../api/API_HorcruxMemories";
import {GetQuestsThunkCreator} from "./Question-Redux";

jest.mock("../api/API_AuthServer");
jest.mock("../api/API_HorcruxMemories")
const AuthAPIMock = AuthAPI;
const DataAPIMock = DataAPI;
let Ask = {
    idParent: 123,
    page: 123
}
let IdRoot="key_test"
let TestHistory = ["1","2","3"];
describe('test admin reducer', ()=>{
    const dispatchMock = jest.fn();
    it('test action SetUsers', ()=>{
        let SetUsers = TestActions.SetAsk(Ask);
        let newState = TestReducer(initialState,SetUsers);
        expect(newState.Ask).toMatchObject(Ask);
    });
    it('test action LOG_OUT', ()=>{
        let SetUsers = TestActions.LOG_OUT(Ask);
        let newState = TestReducer(initialState,SetUsers);
        //expect(newState.Ask).toMatchObject(Ask);
    });
    it('test action SetIdRoot', ()=>{
        let SetUsers = TestActions.SetIdRoot(IdRoot);
        let newState = TestReducer(initialState,SetUsers);
        expect(newState.IdRoot).toBe(IdRoot);
    });
    it('test action SetTestHistory', ()=>{
        let SetUsers = TestActions.SetTestHistory(TestHistory);
        let newState = TestReducer(initialState,SetUsers);
        expect(newState.TestHistory).toMatchObject(TestHistory);
    });
    it('test action TestClear', ()=>{
        let SetUsers = TestActions.TestClear();
        let newState = TestReducer(initialState,SetUsers);
        expect(newState).toMatchObject(initialState);
    });

    it('test action StartAskThunkCreator ',async ()=>{
        const thunk = StartAskThunkCreator();
        const response ={
            data:{}
        };
        let prom = Promise.resolve(response);
        DataAPIMock.TestStart.mockReturnValue(prom);
        await thunk(dispatchMock,()=>{});
        expect(dispatchMock).toBeCalled();
    });
    it('test action NextAskThunkCreator ',async ()=>{
        const thunk = NextAskThunkCreator(IdRoot,TestHistory,"id:string" ,false,"");
        const response ={
            data:{}
        };
        let prom = Promise.resolve(response);
        DataAPIMock.TestNext.mockReturnValue(prom);
        await thunk(dispatchMock,()=>{});
        expect(dispatchMock).toBeCalled();
    });
    it('test action NextAskThunkCreator data=null ',async ()=>{
        const thunk = NextAskThunkCreator(IdRoot,TestHistory,"id:string" ,false,"");
        const response ={
        };
        let prom = Promise.resolve(response);
        DataAPIMock.TestNext.mockReturnValue(prom);
        await thunk(dispatchMock,()=>{});
        expect(dispatchMock).toBeCalled();
    });
})

