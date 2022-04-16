import { InitialStateType } from "./types";

export const initialState : InitialStateType = {
    questionPage:{
        idParent  :"",
        nameParent  :"",
        page  :1,
        questions :null,
        sizePage  :1,
        sizeQuestions  :0,
    },
    breadcrumb:[]
};