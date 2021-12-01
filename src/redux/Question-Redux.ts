import {LOCK_SCREEN, LOG_OUT} from "./Auth-Reducer";
import {InfoActionsTypes, ThunkActionType} from "./redux-store";
import {DataAPI} from "../api/API_HorcruxMemories";
import {actions} from "./Admin-Reducer";

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
    page: number,
    name:string
}

type ThankType = ThunkActionType<ActionsTypes,Promise<void>>;
type initialStateType = {
    DependOnParentQuestion:DependOnParentQuestionType,
    stories:Array<historyType>,
}
export const initialState:initialStateType = {
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
        case "SET_QUESTS":
            let history ={
                idParent: action.data.idParent,
                page: action.data.page,
                name: action.data.nameParent
            }
            return {
                ...state,
                DependOnParentQuestion:{
                    ...action.data,
                },
                stories:[...state.stories,history]
            };
        case "QUEST_IS_IGNORE":{
            if(!state.DependOnParentQuestion.questions)
                return state;
            let quest = state.DependOnParentQuestion.questions.find(u=>{
                if(u.id===action.id)
                    return true;
                return false;
            });
            if(!quest)
                return state;

            quest.isIgnoreTest=action.isIgnore;
            return {
                ...state,
                DependOnParentQuestion: {
                    ...state.DependOnParentQuestion,
                    questions:[...state.DependOnParentQuestion.questions],
                }
            };
        }
        case "SET_STORE":
            let newstories = [];
            for (let i in state.stories){
                if(state.stories[i].idParent===action.data.idParent)
                    break;
                else
                    newstories.push(state.stories[i]);
            }
            return {
                ...state,
                stories:newstories
            };
        case "CLEAR_QUEST":
            return initialState;
        case LOG_OUT: {
            return initialState;
        }
        default: return state;
    }
}


//AllTypeAction
type ActionsTypes = InfoActionsTypes<typeof QuestionAction>;

export const QuestionAction = {
    SetQuests :(data:DependOnParentQuestionType)=>({type : "SET_QUESTS",data }as const),
    SetStore :(data:historyType)=>({type : "SET_STORE", data }as const),
    ClearQuests :()=>({type : "CLEAR_QUEST" }as const),
    QuestIsIgnore:(id:string,isIgnore:boolean)=>({type:"QUEST_IS_IGNORE",id,isIgnore}as const),
    LOG_OUT :()=>({type : LOG_OUT }as const),
    LockScreen:(IsLockScreen:boolean)=>({type: LOCK_SCREEN,IsLockScreen}as const)
}

//GET_QUESTS
export const GetQuestsThunkCreator = (IdParent?:string, Page?:number, PortionsSize?:number) : ThankType =>{

    return async (dispatch) => {
        dispatch(QuestionAction.LockScreen(true));
        await DataAPI.Portions(IdParent, Page, PortionsSize).then((response:any)=>{
            dispatch(QuestionAction.SetQuests(response.data))
        })
       dispatch(QuestionAction.LockScreen(false));
    }
}

//SetEnableAll
export const SetEnableAllQuestionsThunkCreator = (IdParent:string,isIgnore:boolean) : ThankType =>{
    return async (dispatch) => {
        dispatch(QuestionAction.LockScreen(true));
        await DataAPI.EnableAllQuestions(IdParent,isIgnore).then((response:any)=>{
            dispatch(QuestionAction.QuestIsIgnore(IdParent,isIgnore))
        })
        dispatch(QuestionAction.LockScreen(false));
    }
}

//SET_STORE
export const GetQuestsReturnThunkCreator = (history:historyType)  :ThankType =>{

    return async (dispatch) => {
        dispatch(QuestionAction.LockScreen(true));
        dispatch(QuestionAction.SetStore(history));
        await DataAPI.Portions(history.idParent,history.page).then((response:any)=>{
            dispatch(QuestionAction.SetQuests(response.data))
        })
        dispatch(QuestionAction.LockScreen(false));
    }
}
export const GetQuestsPaginationThunkCreator = (history:historyType,Page:number)  :ThankType  =>{
    return async (dispatch) => {
        dispatch(QuestionAction.LockScreen(true));
        history.page=Page;
        dispatch(QuestionAction.SetStore(history));
        await DataAPI.Portions(history.idParent,history.page).then((response:any)=>{
            dispatch(QuestionAction.SetQuests(response.data))
        })
        dispatch(QuestionAction.LockScreen(false));
    }
}