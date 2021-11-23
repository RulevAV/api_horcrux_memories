import {LOG_OUT} from "./Auth-Reducer";
import {QueryType} from "./Question-Redux";
import {Dispatch} from "react";
import {AppStateType, InfoActionsTypes} from "./redux-store";
import {DataAPI} from "../api/API_HorcruxMemories";

type AskType = {
    passedAsk: number
    question: QueryType|null,
    sizeAsk: number
}

type initialStateType ={
    IdRoot:string,
    Ask:AskType,
    TestHistory:Array<string>
}

export const initialState:initialStateType = {
    IdRoot:"",
    Ask:{
        passedAsk:0,
        question:null,
        sizeAsk:0
    },
    TestHistory:[]
};
export const TestReducer = (state=initialState, action : ActionsTypes) => {
    switch (action.type) {
        case "TEST_START":{
            return {
                ...state,
                Ask:{
                    ...action.Ask,
                }
            };
        }
        case "SET_ID_ROOT":{
            return {
                ...state,
                IdRoot: action.IdRoot,
            };
        }
        case "SET_TEST_HISTOTY":{
            return {
                ...state,
                TestHistory: action.TestHistory,
            };
        }
        case LOG_OUT: {
            return initialState;
        }
        case "TEST_CLEAR": {
            return initialState;
        }
        default: return state;
    }
}
//AllTypeAction
type ActionsTypes = InfoActionsTypes<typeof TestActions>;

export const TestActions = {
    SetIdRoot :(IdRoot:string)=>({type : "SET_ID_ROOT",IdRoot} as const),
    SetAsk :(Ask:AskType)=>( {type : "TEST_START",Ask}as const),
    TestClear : ()=>({type : "TEST_CLEAR"}as const),
    SetTestHistory :(TestHistory:Array<string>)=>({type : "SET_TEST_HISTOTY",TestHistory}as const),
    LOG_OUT : ()=>({type : "LOG_OUT"}as const),
}


//TEST_START
export const StartAskThunkCreator = (IdRoot:string,nameTest:string) =>{
    return async (dispatch : Dispatch<ActionsTypes>, getState:()=>AppStateType) => {
       await DataAPI.TestStart(IdRoot,nameTest).then((response:any) =>{
            dispatch(TestActions.SetTestHistory([]));
            dispatch(TestActions.SetAsk(response.data));
        });
    }
}
//SET_TEST_HISTOTY
export const NextAskThunkCreator = (IdRoot:string,TestHistory:Array<string>,id:string ,isIgnoreTest:boolean,nameTest:string) =>{
    return async (dispatch : Dispatch<ActionsTypes>, getState:()=>AppStateType) => {
        await DataAPI.TestNext(IdRoot,TestHistory,id,isIgnoreTest,nameTest).then((response:any) =>{
            if(!response.data){
                dispatch(TestActions.TestClear());
            }else {
                dispatch(TestActions.SetAsk(response.data));
                //dispatch(TestActions.SetTestHistory([...TestHistory,id]));
            }
        });
    }
}

export default TestReducer;


