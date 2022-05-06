import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'
import { QuestionAction, QuestionActionThunk, questionPageReducer } from './QuestionPage-Redux';
import { questionPage } from '../../__mocks__/data/Question';

const mockStore = configureMockStore([thunk]);

describe("questionPageReducer", () => {
  it("cracker", async () => {
    const cracker = {
      id: "string",
      page: 2,
      portionsSize: 2,
      name: "string"
    };

    const data = questionPageReducer(undefined, QuestionAction.setCreater(cracker));
    questionPageReducer(data, QuestionAction.setCreater(cracker));
  })

  it("setPageQuestsApi", async () => {
    let store = mockStore(questionPageReducer);
    store.dispatch<any>(QuestionActionThunk.setPageQuests("", 1, 1, ""));
  })

  it("setPageQuestsApi", async () => {
    let store = mockStore(questionPageReducer);
    store.dispatch<any>(QuestionActionThunk.setPageQuests(undefined,undefined,undefined, ""));
  })

  it("setPageQuests", async () => {
    questionPageReducer(undefined, QuestionAction.setPageQuests(questionPage));
  })

  it("cracker", async () => {
    let store = mockStore(questionPageReducer);
    store.dispatch<any>(QuestionActionThunk.deleteAsk("", "", 1, 1));
  })

  it("default", () => {
    //@ts-ignore
    questionPageReducer(undefined, { type: "default" });
  })
})