import {
    GetQuestsPaginationThunkCreator,
    GetQuestsReturnThunkCreator,
    GetQuestsThunkCreator,
    initialState,
    QuestionAction,
    QuestionReducer
} from "./Question-Redux";
import {AuthAPI} from "../api/API_AuthServer";
import {DataAPI} from "../api/API_HorcruxMemories";

jest.mock("../api/API_AuthServer");
jest.mock("../api/API_HorcruxMemories")
const AuthAPIMock = AuthAPI;
const DataAPIMock = DataAPI;

let Quests = {
    idParent: 123,
    page: 123
}
let  stories = ["123","456","789"];
describe('test admin reducer', ()=>{
    const dispatchMock = jest.fn();
    it('test action SetUsers', ()=>{
        let SetUsers = QuestionAction.SetQuests(Quests);
        let newState = QuestionReducer(initialState,SetUsers);

        expect(newState.DependOnParentQuestion).toMatchObject(Quests);
    });
    it('test action LOG_OUT', ()=>{
        let SetUsers = QuestionAction.LOG_OUT(Quests);
        let newState = QuestionReducer(initialState,SetUsers);

    });
    it('test action SetStore', ()=>{
        let SetUsers = QuestionAction.SetStore(stories);
        let newState = QuestionReducer(initialState,SetUsers);
        expect(newState.stories).toMatchObject(stories);
    });

    it('test action RefreshAuthCookieThunkCreator ',async ()=>{
        const thunk = GetQuestsThunkCreator();
        const response ={
        };
        let prom = Promise.resolve(response);
        DataAPIMock.Portions.mockReturnValue(prom);
        await thunk(dispatchMock,()=>{});
        expect(dispatchMock).toBeCalled();
    });
    it('test action GetQuestsReturnThunkCreator ',async ()=>{
        const thunk = GetQuestsReturnThunkCreator(stories);
        const response ={
        };
        let prom = Promise.resolve(response);
        DataAPIMock.Portions.mockReturnValue(prom);
        await thunk(dispatchMock,()=>{});
        expect(dispatchMock).toBeCalled();
    });
    it('test action GetQuestsPaginationThunkCreator ',async ()=>{
        const thunk = GetQuestsPaginationThunkCreator(stories);
        const response ={
        };
        let prom = Promise.resolve(response);
        DataAPIMock.Portions.mockReturnValue(prom);
        await thunk(dispatchMock,()=>{});
        expect(dispatchMock).toBeCalled();
    });
})

