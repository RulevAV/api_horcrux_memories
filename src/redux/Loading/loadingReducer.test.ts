import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'
import loadingReducer, { loading, loadingActions } from "./Loading-Reducer";

const mockStore = configureMockStore([thunk]);

//@ts-ignore
global.setTimeout = (fn: Function, time: number) => {
  fn();
}

describe("loadingReducer", () => {
  it("show", async () => {
    loadingReducer(undefined, loadingActions.setLoading(true));
  })
  it("hidden", async () => {
    loadingReducer(undefined, loadingActions.setLoading(false));
  })
  it("fun", async () => {
    let store = mockStore(loadingReducer);
    const hiden = loading(store.dispatch);
    hiden();
  })

  it("default", () => {
    //@ts-ignore
    loadingReducer(undefined, { type: "default" });
  })
})