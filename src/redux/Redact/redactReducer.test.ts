import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'
import { RedactActions, RedactActionsThunk, redactReducer } from "./redact-Reducer";
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

describe("redactReducer", () => {
  it("setRedact", async () => {
    redactReducer(undefined, RedactActions.setRedact(questions));
  })

  it("setPageQuestsApi", async () => {
    let store = mockStore(redactReducer);
    store.dispatch<any>(RedactActionsThunk.saveAsk(questions));
  })


  it("default", () => {
    //@ts-ignore
    redactReducer(undefined, { type: "default" });
  })
})