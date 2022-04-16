import { QuestionPageType } from "../../http/models/api/question";

export type Cracker = {
    id:string,
    page:number,
    portionsSize:number,
    name:string
}

export type InitialStateType = {
    questionPage:QuestionPageType,
    breadcrumb:Array<Cracker>
};