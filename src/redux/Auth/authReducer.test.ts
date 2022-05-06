import authReducer, { AuthActions, AuthActionsThunk } from "./Auth-Reducer"
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'
import { user } from "../../__mocks__/data/user";

const mockStore = configureMockStore([thunk]);

describe("authReducer", () => {
  it("login", async () => {
    let store = mockStore(authReducer);
    store.dispatch<any>(AuthActionsThunk.login("email@mail.ru", ""));
  })

  it("login", async () => {
    authReducer(undefined, AuthActions.setUser(user))
  })

  it("logout", () => {
    let store = mockStore(authReducer);
    store.dispatch<any>(AuthActionsThunk.Logout());
  })

  it("logout", () => {
    authReducer(undefined, AuthActions.logout())
  })

  it("default", () => {
    //@ts-ignore
    authReducer(undefined, { type: "default" });
  })
})