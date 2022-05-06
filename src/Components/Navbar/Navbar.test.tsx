import { configure, mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ModalImgProps } from "../../providers/ModalImg/useModalImg";
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { act } from "react-dom/test-utils";
import NavbarContainer from "./NavbarContainer";

configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

jest.mock("../../redux/Auth/Auth-Reducer", () => ({
  AuthActionsThunk: {
    Logout: jest.fn
  }
}));

jest.mock('../../providers/ModalImg/useModalImg', () => ({
  useModalImg: () => {
    return {
      show: (confirmShowProps: ModalImgProps) => { },
    }
  }
}))


const initialState = {
  authReducer: {
    isAuthenticated: true,
    userName: "name",
    email: "email",
    roles: ["Administrator", "Moderator", "role3"] as Array<string> | null,
    message: "message"
  }
}

describe("Navbar", () => {
  let component: any;

  const renderWrapper = () => {
    let store = mockStore(initialState);
    store.dispatch = jest.fn();
    component = mount(<BrowserRouter basename="/">
      <Provider store={store}>
        <NavbarContainer />
      </Provider>
    </BrowserRouter >);
  }

  it("logout", async () => {
    renderWrapper();

    const logout = component.findWhere((node: any) => {
      return node.type() === "a" && node.text() === "Выйти"
    })

    logout.simulate("click");
  });

  it("login", async () => {
    initialState.authReducer.isAuthenticated = false;
    renderWrapper();
  });

  it("Menu", async () => {
    initialState.authReducer.roles = null;
    renderWrapper();
  });
});