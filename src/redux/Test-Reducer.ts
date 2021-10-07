import {LOG_OUT} from "./Auth-Reducer";
import {DataAPI} from "../api/api";

let TEST_START = "TEST_START";
let SET_ID_ROOT = "SET_ID_ROOT";
let SET_TEST_HISTOTY="SET_TEST_HISTOTY";
let TEST_CLEAR = "TEST_CLEAR";


let initialState = {
    IdRoot:"",
    Ask:{
        IdParent :"",
        Name :"",
        Description :"",
        Images :"",
        IsIgnoreTest :"",
        IsHiddenContentTest :"",
    },
    TestHistory:[]
};
export const TestReducer = (state=initialState, action : any) => {
    switch (action.type) {
        case TEST_START:{
           // console.log(action)
            return {
                ...state,
                Ask:{
                    ...action.data,
                }

            };
        }
        case SET_ID_ROOT:{
            return {
                ...state,
                IdRoot: action.data,

            };
        }
        case SET_TEST_HISTOTY:{
            return {
                ...state,
                TestHistory: action.data,
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
export let SetIdRoot =(data:any)=>{
    return {
        type : SET_ID_ROOT,
        data
    }
}
//TEST_START
export let SetAsk =(data:any)=>{
    return {
        type : TEST_START,
        data
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
export let TestClear =()=>{
    return {
        type : TEST_CLEAR,
    }
}
export let SetTestHistory =(data:any)=>{
    return {
        type : SET_TEST_HISTOTY,
        data
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


