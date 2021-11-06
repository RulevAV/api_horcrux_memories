import {LOG_OUT} from "./Auth-Reducer";
import {DataAPI} from "../api/api";
import {QueryType} from "./Question-Redux";

const TEST_START = "TEST_START";
const SET_ID_ROOT = "SET_ID_ROOT";
const SET_TEST_HISTOTY="SET_TEST_HISTOTY";
const TEST_CLEAR = "TEST_CLEAR";

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

const initialState:initialStateType = {
    IdRoot:"",
    Ask:{
        passedAsk:0,
        question:null,
        sizeAsk:0
    },
    TestHistory:[]
};
export const TestReducer = (state=initialState, action : any) => {
    switch (action.type) {
        case TEST_START:{
            return {
                ...state,
                Ask:{
                    ...action.Ask,
                }
            };
        }
        case SET_ID_ROOT:{
            return {
                ...state,
                IdRoot: action.IdRoot,

            };
        }
        case SET_TEST_HISTOTY:{
            return {
                ...state,
                TestHistory: action.TestHistory,
            };
        }
        case LOG_OUT: {
            return initialState;
        }
        case TEST_CLEAR: {
            return initialState;
        }
        default: return state;
    }
}

//SET_ID_ROOT
type SetIdRootType = {
    type :typeof SET_ID_ROOT,
    IdRoot : string,
}
export let SetIdRoot =(IdRoot:string):SetIdRootType=>{
    return {
        type : SET_ID_ROOT,
        IdRoot
    }
}
//TEST_START
type SetAskType = {
    type : typeof TEST_START,
    Ask:AskType
}
export let SetAsk =(Ask:AskType):SetAskType=>{
    return {
        type : TEST_START,
        Ask
    }
}
export const StartAskThunkCreator = (IdRoot:string,nameTest:string) =>{
    return (dispatch : any) => {
        DataAPI.TestStart(IdRoot,nameTest).then((response:any) =>{
            dispatch(SetTestHistory([]));
            dispatch(SetAsk(response.data));
        });
    }
}

//TEST_NEXT
type TestClearType = {
    type : typeof TEST_CLEAR
}
export let TestClear =():TestClearType=>{
    return {
        type : TEST_CLEAR,
    }
}
type SetTestHistoryType = {
    type : typeof SET_TEST_HISTOTY,
    TestHistory:Array<string>
}
export let SetTestHistory =(TestHistory:Array<string>):SetTestHistoryType=>{
    return {
        type : SET_TEST_HISTOTY,
        TestHistory
    }
}
export const NextAskThunkCreator = (IdRoot:string,TestHistory:Array<string>,id:string ,isIgnoreTest:boolean,nameTest:string) =>{
    return (dispatch : any) => {
        DataAPI.TestNext(IdRoot,TestHistory,id,isIgnoreTest,nameTest).then((response:any) =>{
            if(!response.data){
                dispatch(TestClear());
            }else {
                dispatch(SetAsk(response.data));
                dispatch(SetTestHistory([...TestHistory,id]));
            }


        });
    }
}



export default TestReducer;


