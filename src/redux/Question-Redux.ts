import {DataAPI} from "../api/api";
import {LOG_OUT} from "./Auth-Reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
const GET_QUESTS = 'GET_QUESTS';
const SET_STORE = "SET_STORE";

export type QueryType = {
    dateAdd:string,
    description: null|string,
    id:string,
    idParent:string,
    images:string,
    isHiddenContentTest: boolean
    isIgnoreTest: boolean
    name:string,
}

export type DependOnParentQuestionType = {
    idParent: string|null,
    nameParent: string|null,
    page: number
    questions: Array<QueryType>|null
    sizePage: number
    sizeQuestions: number
}
export type historyType = {
    idParent: string,
    page: number
}
type initialStateType = {
    DependOnParentQuestion:DependOnParentQuestionType,
    stories:Array<historyType>,
}
const initialState:initialStateType = {
    DependOnParentQuestion:{
        nameParent  :null,
        idParent  :null,
        page  :0,
        questions :null,
        sizePage  :0,
        sizeQuestions  :0,
    },
    stories:[],
};

export const QuestionReducer = (state=initialState, action : ActionsTypes) => {
    switch (action.type) {
        case GET_QUESTS:
            let history ={
                idParent: action.data.idParent,
                page: action.data.page
            }
            return {
                ...state,
                DependOnParentQuestion:{
                    ...action.data,
                },
                stories:[...state.stories,history]
            };
        case SET_STORE:
            return {
                ...state,
                stories:action.data
            };
        case LOG_OUT: {
            return initialState;
        }
        default: return state;
    }
}


//AllTypeAction
type ActionsTypes = SetQuestsType | SetStoreType | ClearState;

//Clear state
type ClearState = {
    type : typeof LOG_OUT
}


//GET_QUESTS
type SetQuestsType = {
    type : typeof GET_QUESTS,
    data : DependOnParentQuestionType
}
export let SetQuests =(data:DependOnParentQuestionType):SetQuestsType=>{
    return {
        type : GET_QUESTS,
        data
    }
}
export const GetQuestsThunkCreator = (IdParent?:string, Page?:number, PortionsSize?:number) :ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>=>{
    return async (dispatch) => {
        DataAPI.Portions(IdParent, Page, PortionsSize).then((response:any)=>{
            dispatch(SetQuests(response.data))
        })

    }
}

//SET_STORE
type SetStoreType = {
    type : typeof SET_STORE,
    data : historyType
}
export let SetStore =(data:historyType):SetStoreType=>{

    return {
        type : SET_STORE,
        data
    }
}
export const GetQuestsReturnThunkCreator = (stories:any) :ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>=>{
    let hist = stories.pop();
    let hist2 = stories.pop();

    return async (dispatch) => {
        dispatch(SetStore(stories));
        DataAPI.Portions(hist2.idParent,hist2.page).then((response:any)=>{
            dispatch(SetQuests(response.data))
        })
    }
}

export const GetQuestsPaginationThunkCreator = (stories:any,Page:number) :ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> =>{

    return async (dispatch) => {
        let idParent;
        if(stories.length>0)
        {
            let hist = stories.pop();
            idParent = hist.idParent;
        }
        dispatch(SetStore(stories));
        DataAPI.Portions(idParent,Page).then((response:any)=>{
            dispatch(SetQuests(response.data))
        })
    }
}