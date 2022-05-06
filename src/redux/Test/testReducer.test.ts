import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { TestActions, TestActionsThunk, testReducer } from "./Test-Reducer";
import { testPage } from "../../__mocks__/data/Test";
const mockStore = configureMockStore([thunk]);

const questions = {
  dateAdd: "",
  description: "",
  id: "",
  idParent: "",
  images: "",
  isHiddenContentTest: true,
  isIgnoreTest: true,
  name: "",
}

describe("testReducer", () => {
  it("startTest", async () => {
    testReducer(undefined, TestActions.startTest("", "", ""));
  })

  it("startTestApi", async () => {
    let store = mockStore(testReducer);
    store.dispatch<any>(TestActionsThunk.startTest("", "", ""));
  })

  it("getAsk", async () => {
    testReducer(undefined, TestActions.setTestPage(testPage));
  })

  it("getAskApi", async () => {
    let store = mockStore(testReducer);
    store.dispatch<any>(TestActionsThunk.getAsk("", ""));
  })

  it("clearAsk", async () => {
    testReducer(undefined, TestActions.clearAsk());
  })

  it("breckTest", async () => {
    let store = mockStore(testReducer);
    store.dispatch<any>(TestActionsThunk.breckTest("", ""));
  })

  it("default", () => {
    //@ts-ignore
    testReducer(undefined, { type: "default" });
  })
})