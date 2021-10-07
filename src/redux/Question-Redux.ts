import {DataAPI} from "../api/api";
import {LOG_OUT} from "./Auth-Reducer";
let GET_QUESTS = 'GET_QUESTS';
let SET_STORE = "SET_STORE";
let initialState = {
    DependOnParentQuestion:{
        Questions :undefined,
        SizePage  :0,
        Page  :0,
        IdParent  :undefined,
        NameParent  :undefined,
        SizeQuestions  :0,
    },
    stories:[],
};
export const QuestionReducer = (state=initialState, action : any) => {
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


//GET_QUESTS
export let SetQuests =(data:any)=>{

    return {
        type : GET_QUESTS,
        data
    }
}
export const GetQuestsThunkCreator = (IdParent:string, Page:number, PortionsSize?:number) =>{

    return (dispatch : any) => {
        DataAPI.Portions(IdParent, Page, PortionsSize).then((response:any)=>{
            dispatch(SetQuests(response.data))
        })

    }
}

//SET_STORE
export let SetStore =(data:any)=>{

    return {
        type : SET_STORE,
        data
    }
}
export const GetQuestsReturnThunkCreator = (stories:any) =>{
    let hist = stories.pop();
    let hist2 = stories.pop();

    return (dispatch : any) => {
        dispatch(SetStore(stories));
        DataAPI.Portions(hist2.idParent,hist2.page).then((response:any)=>{
            dispatch(SetQuests(response.data))
        })
    }
}

export const GetQuestsPaginationThunkCreator = (stories:any,Page:number) =>{

    return (dispatch : any) => {
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

    /*if(stories.length>0)
    {}
    let hist = stories.pop();
    console.log(stories,Page);*/
    /*return (dispatch : any) => {
        dispatch(SetStore(stories));
        DataAPI.Portions(hist2.idParent,hist2.page).then((response:any)=>{
            dispatch(SetQuests(response.data))
        })
    }*/
}