import {LOCK_SCREEN, LOG_OUT} from "./Auth-Reducer";
import {InfoActionsTypes, ThunkActionType} from "./redux-store";
import {DataAPI} from "../api/API_HorcruxMemories";
import {DependOnParentQuestionType} from "../api/API_HorcruxMemories_Type";


//AllTypeAction
type ActionsTypes = InfoActionsTypes<typeof QuestionAction>;

type ThankType = ThunkActionType<ActionsTypes,Promise<void>>;

export type historyType = {
    idParent: string,
    page: number,
    name:string
}

type initialStateType = {
    DependOnParentQuestion:DependOnParentQuestionType,
    stories:Array<historyType>,
}

export const initialState:initialStateType = {
    DependOnParentQuestion:{
        idParent  :"",
        nameParent  :"",
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
            return {
                ...state,
                DependOnParentQuestion:{
                    ...action.data,
                }
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
            if(state.stories.length===0)
                return {
                    ...state,
                    stories:[action.data]
                };
            let newstories = [];
            for (let i in state.stories){
                if(state.stories[i].idParent===action.data.idParent)
                    break;
                newstories.push(state.stories[i]);
            }
            newstories.push(action.data);
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

export const QuestionAction = {
    SetQuests :(data:DependOnParentQuestionType)=>({type : "SET_QUESTS",data }as const),
    SetStore :(data:historyType)=>({type : "SET_STORE", data }as const),
    ClearQuests :()=>({type : "CLEAR_QUEST" }as const),
    QuestIsIgnore:(id:string,isIgnore:boolean)=>({type:"QUEST_IS_IGNORE",id,isIgnore}as const),
    LOG_OUT :()=>({type : LOG_OUT }as const),
    LockScreen:(IsLockScreen:boolean)=>({type: LOCK_SCREEN,IsLockScreen}as const)
}

export const QuestionActionThunkCreator={
    GetQuests:(IdParent?:string, Page?:number, PortionsSize?:number) : ThankType =>{
        return async (dispatch) => {
            dispatch(QuestionAction.LockScreen(true));
            await DataAPI.Portions(IdParent, Page, PortionsSize).then((response)=>{
                let history:historyType = {
                    idParent:response.data.idParent,
                    name:response.data.nameParent,
                    page:response.data.page
                }
                dispatch(QuestionAction.SetStore(history));
                dispatch(QuestionAction.SetQuests(response.data));
            })
            dispatch(QuestionAction.LockScreen(false));
        }
    },
    SetEnableAllQuestions:(IdParent:string,isIgnore:boolean) : ThankType =>{
        return async (dispatch) => {
            dispatch(QuestionAction.LockScreen(true));
            await DataAPI.EnableAllQuestions(IdParent,isIgnore).then((response)=>{
                dispatch(QuestionAction.QuestIsIgnore(IdParent,isIgnore))
            })
            dispatch(QuestionAction.LockScreen(false));
        }
    },
    GetQuestsReturn:(history:historyType)  :ThankType =>{

        return async (dispatch) => {
            dispatch(QuestionAction.LockScreen(true));
            dispatch(QuestionAction.SetStore(history));
            await DataAPI.Portions(history.idParent,history.page).then((response)=>{
                dispatch(QuestionAction.SetQuests(response.data))
            })
            dispatch(QuestionAction.LockScreen(false));
        }
    },
    GetQuestsPagination: (history:historyType,Page:number)  :ThankType  =>{
        return async (dispatch) => {
            dispatch(QuestionAction.LockScreen(true));
            await DataAPI.Portions(history.idParent,Page).then((response)=>{
                let history:historyType = {
                    idParent:response.data.idParent,
                    name:response.data.nameParent,
                    page:response.data.page
                }
                dispatch(QuestionAction.SetStore(history));
                dispatch(QuestionAction.SetQuests(response.data))
            })
            dispatch(QuestionAction.LockScreen(false));
        }
    }
}


