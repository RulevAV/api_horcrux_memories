import { Dispatch } from "react";
import { nextQuestion } from "../../http/endpoints/question";
import { TestPageType } from "../../http/models/api/question";
import { AppStateType, InfoActionsTypes, ThunkActionType } from "./../redux-store";


//AllTypeAction
type ActionsTypes = InfoActionsTypes<typeof TestActions>;

export type TestType = {
    id: string,
    title: string
    TestPage: TestPageType,
}

export type ActionsTypesTest = InfoActionsTypes<typeof TestActions>;
export type ThankType = ThunkActionType<ActionsTypesTest, Promise<void>>;

export const initialState: TestType = {
    id: "",
    title: "",
    TestPage: {
        passedAsk: 0,
        question: null,
        sizeAsk: 0
    },
};


export const testReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case "TEST_START": {
            return {
                ...state,
                id: action.id,
                title: action.title
            }
        }
        case "TEST_SET_PAGES": {
            return {
                ...state,
                TestPage: action.TestPage,
            }
        }

        // case "SET_ASK":{
        //     return {
        //         ...state,
        //         Ask:{
        //             ...action.Ask,
        //         }
        //     };
        // }
        // case "SET_ID_ROOT": {
        //     return {
        //         ...state,
        //         IdRoot: action.IdRoot,
        //     };
        // }
        // case "SET_IS_FINISH": {
        //     return {
        //         ...state,
        //         isFinish: action.isFinish
        //     }
        // }
        // case "SET_TEST_HISTOTY": {
        //     return {
        //         ...state,
        //         TestHistory: action.TestHistory,
        //     };
        // }
        // case "SHOW_CONTENT":{
        //     return {
        //         ...state,
        //         Ask:{
        //             ...state.Ask,
        //             question:{
        //                 ...state.Ask.question,
        //                 isHiddenContentTest: action.value
        //             }
        //         }
        //     };
        // }

        // case "TEST_CLEAR": {
        //     return initialState;
        // }
        default: return state;
    }
}

export const TestActions = {
    startTest: (id: string, title: string) => ({ type: "TEST_START", id, title } as const),
    setTestPage: (TestPage: TestPageType) => ({ type: "TEST_SET_PAGES", TestPage } as const)
    // SetAsk :(Ask:AskType)=>( {type : "SET_ASK",Ask}as const),
    // SetIdRoot :(IdRoot:string)=>({type : "SET_ID_ROOT",IdRoot} as const),
    // SetIsFinish :(isFinish:boolean)=>({type : "SET_IS_FINISH",isFinish} as const),
    // TestClear : ()=>({type : "TEST_CLEAR"}as const),
    // ShowContent:(value:boolean)=>({type : "SHOW_CONTENT",value} as const),
    // SetTestHistory :(TestHistory:Array<string>)=>({type : "SET_TEST_HISTOTY",TestHistory}as const),
    // LOG_OUT : ()=>({type : "LOG_OUT"}as const),
}

export const TestActionsThunk = {
    NextAsk: (id: string): ThankType => {
        return async (dispatch) => {
            const data = await nextQuestion(id, "Normal");//TestNormal  TestGlobal
            dispatch(TestActions.setTestPage(data));
        }
    }
    // TestStart : (IdRoot:string,nameTest:string)=>{
    //     return AuthAPI.IsExistsToken().then(req=>{
    //         let Token=Cookies.get("Token");
    //         let config = {
    //             headers: {
    //                 'Authorization': `Bearer  ${Token}`
    //             },
    //             params: {IdRoot,Type:nameTest}
    //         }
    //         return DataGuery.get<AskType>('api/Test/',config)
    //     });
    // },


    // StartAsk: (IdRoot: string, nameTest: string) => {
    //     return async (dispatch: Dispatch<ActionsTypes>, getState: () => AppStateType) => {
    //         // dispatch(TestActions.LockScreen(true));
    //         // await DataAPI.TestStart(IdRoot,nameTest).then((response) =>{
    //         //     dispatch(TestActions.SetIsFinish(false));
    //         //     dispatch(TestActions.SetIdRoot(IdRoot));
    //         //     dispatch(TestActions.SetTestHistory([]));
    //         //     dispatch(TestActions.SetAsk(response.data));
    //         // });
    //         // dispatch(TestActions.LockScreen(false));
    //     }
    // },
    // NextAsk: (IdRoot: string, TestHistory: Array<string>, id: string, isIgnoreTest: boolean, nameTest: string) => {
    //     return async (dispatch: Dispatch<ActionsTypes>, getState: () => AppStateType) => {
    //         // dispatch(TestActions.LockScreen(true));
    //         // await DataAPI.TestNext(IdRoot,TestHistory,id,isIgnoreTest,nameTest).then((response) =>{
    //         //     if(!response.data){
    //         //         dispatch(TestActions.SetIsFinish(true));
    //         //     }else {
    //         //         dispatch(TestActions.SetTestHistory([...TestHistory,id]));
    //         //         dispatch(TestActions.SetAsk(response.data));
    //         //     }
    //         // });
    //         //dispatch(TestActions.LockScreen(false));
    //     }
    // },
}

export default testReducer;


