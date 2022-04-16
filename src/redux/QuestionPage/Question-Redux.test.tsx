import {
    initialState,
    QuestionAction, QuestionActionThunkCreator,
    QuestionReducer
} from "./QuestionPage-Redux";
import {AuthAPI} from "../../api/API_AuthServer";
import {DataAPI} from "../../api/API_HorcruxMemories";
import {DependOnParentQuestionType} from "../../api/API_HorcruxMemories_Type";

jest.mock("../api/API_AuthServer");
jest.mock("../api/API_HorcruxMemories")
const AuthAPIMock = AuthAPI;
const DataAPIMock = DataAPI;

let QuestsList:DependOnParentQuestionType = {
    idParent:"",
    questions:null,
    page:5,
    nameParent:"",
    sizePage:10,
    sizeQuestions:100
}
let history1 = {
    idParent: "history1",
    page: 5,
    name:"history1"
}
let history2 = {
    idParent: "history2",
    page: 6,
    name:"history2"
}
let history3 = {
    idParent: "history3",
    page: 8,
    name:"history3"
}
let  Query1 = {
    dateAdd:"string",
    description: "string",
    id:"Query1",
    idParent:"string",
    images:"string",
    isHiddenContentTest: false,
    isIgnoreTest: false,
    name:"Query1",
}
let  Query2 = {
    dateAdd:"string",
    description: "string",
    id:"Query2",
    idParent:"string",
    images:"string",
    isHiddenContentTest: false,
    isIgnoreTest: false,
    name:"Query2",
}
let  Query3 = {
    dateAdd:"string",
    description: "string",
    id:"Query3",
    idParent:"string",
    images:"string",
    isHiddenContentTest: false,
    isIgnoreTest: false,
    name:"Query3",
}

let  stories = [history1,history2,history3];
describe('test admin reducer', ()=>{
    const dispatchMock = jest.fn();
    it('test action SetUsers', ()=>{
        let SetUsers = QuestionAction.SetQuests(QuestsList);
        let newState = QuestionReducer(initialState,SetUsers);

        expect(newState.DependOnParentQuestion).toMatchObject(QuestsList);
    });
    it('test action LOG_OUT', ()=>{
        let SetUsers = QuestionAction.LOG_OUT();
        let newState = QuestionReducer(initialState,SetUsers);

    });
    it('test action SetStore', ()=>{
        let SetUsers = QuestionAction.SetStore(history3);
        initialState.stories=stories;
        let newState = QuestionReducer(initialState,SetUsers);
        expect(newState.stories).toMatchObject([history1,history2]);
    });
    it('test action QuestIsIgnore questions=NULL', ()=>{
        let QuestIsIgnore = QuestionAction.QuestIsIgnore("",false);
        let newState = QuestionReducer(initialState,QuestIsIgnore);
        expect(newState).toMatchObject(initialState);
    });
    it('test action QuestIsIgnore questions!=null', ()=>{
        initialState.DependOnParentQuestion.questions=[Query1,Query2];
        let QuestIsIgnore = QuestionAction.QuestIsIgnore("Query2",true);
        let newState = QuestionReducer(initialState,QuestIsIgnore);
        let Query = newState.DependOnParentQuestion.questions?.find((e)=>{
            return e.id ==="Query2"
        })
        expect(Query?.isIgnoreTest).toBe(true);
    });
    it('test action QuestIsIgnore QuestIsIgnore==null', ()=>{
        initialState.DependOnParentQuestion.questions=[Query1,Query2];
        let QuestIsIgnore = QuestionAction.QuestIsIgnore("Query3",true);
        let newState = QuestionReducer(initialState,QuestIsIgnore);

    });
    it('test action ClearQuests ', ()=>{
        let QuestIsIgnore = QuestionAction.ClearQuests ();
        let newState = QuestionReducer(initialState,QuestIsIgnore);
        expect(newState).toMatchObject(initialState);
    });
    //QuestionActionThunkCreator
    it('test action GetQuests ',async ()=>{
        const thunk = QuestionActionThunkCreator.GetQuests();
        const response ={
        };
        let prom = Promise.resolve(response);
        let Portions = jest.fn();
        Portions.mockReturnValue(prom);

        DataAPIMock.Portions=Portions;
        // @ts-ignore
        await thunk(dispatchMock);
        expect(dispatchMock).toBeCalled();
    });
    it('test action GetQuestsReturn ',async ()=>{
        const thunk = QuestionActionThunkCreator.GetQuestsReturn(history1);
        const response ={
        };
        let prom = Promise.resolve(response);
        let Portions = jest.fn();
        Portions.mockReturnValue(prom);

        DataAPIMock.Portions=Portions;
        // @ts-ignore
        await thunk(dispatchMock);
        expect(dispatchMock).toBeCalled();
    });
    it('test action GetQuestsPagination ',async ()=>{
        const thunk = QuestionActionThunkCreator.GetQuestsPagination(history1,5);
        const response ={
        };
        let prom = Promise.resolve(response);
        let Portions = jest.fn();
        Portions.mockReturnValue(prom);

        DataAPIMock.Portions=Portions;
        // @ts-ignore
        await thunk(dispatchMock);
        expect(dispatchMock).toBeCalled();
    });
    it('test action SetEnableAllQuestions',async ()=>{
        const thunk = QuestionActionThunkCreator.SetEnableAllQuestions("",true);
        const response ={
        };
        let prom = Promise.resolve(response);
        let EnableAllQuestions = jest.fn();
        EnableAllQuestions.mockReturnValue(prom);
        DataAPIMock.EnableAllQuestions=EnableAllQuestions;
        // @ts-ignore
        await thunk(dispatchMock);
        expect(dispatchMock).toBeCalled();
    });
})

