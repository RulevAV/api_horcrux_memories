import { configure, mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ModalImgProps } from "../../providers/ModalImg/useModalImg";
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { act } from "react-dom/test-utils";
import ModeratorContainer from "./ModeratorContainer";

configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

jest.mock("../../http/data/question");
jest.mock('../../providers/ModalImg/useModalImg', () => ({
  useModalImg: () => {
    return {
      show: (confirmShowProps: ModalImgProps) => { },
    }
  }
}))

export const initialState = {
  testReducer: {
    id: "",
    title: "",
    typeTest: "",
  },
  redactReducer: {
    dateAdd: "",
    description: "",
    id: "",
    idParent: "",
    images: "",
    isHiddenContentTest: false,
    isIgnoreTest: false,
    name: "",
  },
  questionPageReducer: {
    breadcrumb: []
  },
  authReducer: {
    email: "email"
  }
};

describe("Moderator", () => {
  let component: any;

  const renderWrapper = () => {
    let store = mockStore(initialState);
    store.dispatch = jest.fn();
    component = mount(<BrowserRouter basename="/">
      <Provider store={store}>
        <ModeratorContainer />
      </Provider>
    </BrowserRouter >);
  }

  it("mount", async () => {
    await act(async () => {
      renderWrapper();
    });
  });
});