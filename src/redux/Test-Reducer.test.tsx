import TestReducer, {
    initialState,
    TestActions,
    TestActionsThunkCreator
} from "./Test-Reducer";
import {AuthAPI} from "../api/API_AuthServer";
import {DataAPI} from "../api/API_HorcruxMemories";
import {AskType} from "../api/API_HorcruxMemories_Type";

jest.mock("../api/API_AuthServer");
jest.mock("../api/API_HorcruxMemories")
const AuthAPIMock = AuthAPI;
const DataAPIMock = DataAPI;
let Ask:AskType = {
    passedAsk:2,
    sizeAsk:123,
    question:null,
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
        let SetUsers = TestActions.LOG_OUT();
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

    it('test action ShowContent', ()=>{
        let SetUsers = TestActions.ShowContent(true);
        let newState = TestReducer(initialState,SetUsers);
        expect(newState.Ask.question?.isHiddenContentTest).toBe(true);
    });
    it('test action SetIsFinish ', ()=>{
        let SetUsers = TestActions.SetIsFinish(true);
        let newState = TestReducer(initialState,SetUsers);
        expect(newState.isFinish).toBe(true);
    });
    //ThunkCreator
    it('test action StartAsk ',async ()=>{
        const thunk = TestActionsThunkCreator.StartAsk("IdRoot","nameTest");
        const response ={
            data:{}
        };
        let prom = Promise.resolve(response);
        let TestStart = jest.fn();
        TestStart.mockReturnValue(prom);
        DataAPIMock.TestStart=TestStart;
        // @ts-ignore
        await thunk(dispatchMock);
        expect(dispatchMock).toBeCalled();
    });
    it('test action NextAsk ',async ()=>{
        const thunk = TestActionsThunkCreator.NextAsk("IdRoot",[""],"id" ,false,"");
        const response ={
            data:{}
        };
        let prom = Promise.resolve(response);

        let TestNext = jest.fn();
        TestNext.mockReturnValue(prom);
        DataAPIMock.TestNext=TestNext;

        // @ts-ignore
        await thunk(dispatchMock);
        expect(dispatchMock).toBeCalled();
    });
    it('test action NextAsk data=null ',async ()=>{
        const thunk = TestActionsThunkCreator.NextAsk(IdRoot,TestHistory,"id:string" ,false,"");
        const response ={
        };
        let prom = Promise.resolve(response);
        let TestNext = jest.fn();
        TestNext.mockReturnValue(prom);
        DataAPIMock.TestNext=TestNext;

        // @ts-ignore
        await thunk(dispatchMock);
        expect(dispatchMock).toBeCalled();
    });
})

