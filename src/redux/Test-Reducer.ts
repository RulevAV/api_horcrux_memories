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

export type TestType ={
    IdRoot:string,
    isFinish:boolean,
    Ask:AskType,
    TestHistory:Array<string>
}

export const initialState:TestType = {
    IdRoot:"",
    isFinish:false,
    Ask:{
        passedAsk:0,
        question:null,
        sizeAsk:0
    },
    TestHistory:[]
};
export const TestReducer = (state=initialState, action : ActionsTypes) => {
    switch (action.type) {
        case "SET_ASK":{
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
        case "SET_IS_FINISH":{
            return {
                ...state,
                isFinish:action.isFinish
            }
        }
        case "SET_TEST_HISTOTY":{
            return {
                ...state,
                TestHistory: action.TestHistory,
            };
        }
        case "SHOW_CONTENT":{
            return {
                ...state,
                Ask:{
                    ...state.Ask,
                    question:{
                        ...state.Ask.question,
                        isHiddenContentTest: action.value
                    }
                }
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
    SetAsk :(Ask:AskType)=>( {type : "SET_ASK",Ask}as const),
    SetIdRoot :(IdRoot:string)=>({type : "SET_ID_ROOT",IdRoot} as const),
    SetIsFinish :(isFinish:boolean)=>({type : "SET_IS_FINISH",isFinish} as const),
    TestClear : ()=>({type : "TEST_CLEAR"}as const),
    ShowContent:(value:boolean)=>({type : "SHOW_CONTENT",value} as const),
    SetTestHistory :(TestHistory:Array<string>)=>({type : "SET_TEST_HISTOTY",TestHistory}as const),
    LOG_OUT : ()=>({type : "LOG_OUT"}as const),
}


//TEST_START
export const StartAskThunkCreator = (IdRoot:string,nameTest:string) =>{
    return async (dispatch : Dispatch<ActionsTypes>, getState:()=>AppStateType) => {
       await DataAPI.TestStart(IdRoot,nameTest).then((response:any) =>{
            dispatch(TestActions.SetIsFinish(false));
            dispatch(TestActions.SetIdRoot(IdRoot));
            dispatch(TestActions.SetTestHistory([]));
            dispatch(TestActions.SetAsk(response.data));
        });
    }
}
//Next_Ask
export const NextAskThunkCreator = (IdRoot:string,TestHistory:Array<string>,id:string ,isIgnoreTest:boolean,nameTest:string) =>{
    return async (dispatch : Dispatch<ActionsTypes>, getState:()=>AppStateType) => {
        await DataAPI.TestNext(IdRoot,TestHistory,id,isIgnoreTest,nameTest).then((response:any) =>{
            if(!response.data){
                dispatch(TestActions.SetIsFinish(true));
                //dispatch(TestActions.TestClear());
            }else {
                dispatch(TestActions.SetTestHistory([...TestHistory,id]));
                dispatch(TestActions.SetAsk(response.data));
            }
        });
    }
}

export default TestReducer;


