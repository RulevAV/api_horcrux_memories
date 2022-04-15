import { getQuestions } from "../../http/endpoints/question";
import { InfoActionsTypes, ThunkActionType } from "../redux-store";
import { initialState } from "./initial-values";


//AllTypeAction
type ActionsTypes = InfoActionsTypes<typeof QuestionAction>;

type ThankType = ThunkActionType<ActionsTypes, Promise<void>>;

export const QuestionReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case "QUESTION_SET_PAGE": {
            return {
                ...action.data
            };
        }

        // case "SET_QUESTS":
        //     return {
        //         ...state,
        //         DependOnParentQuestion:{
        //             ...action.data,
        //         }
        //     };
        // case "QUEST_IS_IGNORE":{
        //     if(!state.DependOnParentQuestion.questions)
        //         return state;
        //     let quest = state.DependOnParentQuestion.questions.find(u=>{
        //         if(u.id===action.id)
        //             return true;
        //         return false;
        //     });
        //     if(!quest)
        //         return state;

        //     quest.isIgnoreTest=action.isIgnore;
        //     return {
        //         ...state,
        //         DependOnParentQuestion: {
        //             ...state.DependOnParentQuestion,
        //             questions:[...state.DependOnParentQuestion.questions],
        //         }
        //     };
        // }
        // case "SET_STORE":
        //     if(state.stories.length===0)
        //         return {
        //             ...state,
        //             stories:[action.data]
        //         };
        //     let newstories = [];
        //     for (let i in state.stories){
        //         if(state.stories[i].idParent===action.data.idParent)
        //             break;
        //         newstories.push(state.stories[i]);
        //     }
        //     newstories.push(action.data);
        //     return {
        //         ...state,
        //         stories:newstories
        //     };

        // case "CLEAR_QUEST":
        //     return initialState;
        // case LOG_OUT: {
        //     return initialState;
        // }
        default: return state;
    }
}

export const QuestionAction = {
    // SetQuests :(data:DependOnParentQuestionType)=>({type : "SET_QUESTS",data }as const),
    // SetStore :(data:historyType)=>({type : "SET_STORE", data }as const),
    setPageQuests: (data: any) => ({ type: "QUESTION_SET_PAGE", data } as const),
    // QuestIsIgnore:(id:string,isIgnore:boolean)=>({type:"QUEST_IS_IGNORE",id,isIgnore}as const),
    //LOG_OUT :()=>({type : LOG_OUT }as const),
    //LockScreen:(IsLockScreen:boolean)=>({type: LOCK_SCREEN,IsLockScreen}as const)
}

export const QuestionActionThunk = {
    setPageQuests: (idParent:string, page:number, portionsSize:number): ThankType => {
        return async (dispatch) => {
            const data = await getQuestions(idParent, page, portionsSize);
            dispatch(QuestionAction.setPageQuests(data));
        }
    },


}


