import { configure, mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ModalImgProps } from "../../providers/ModalImg/useModalImg";
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import HomeContainer from "./HomeContainer";
import { InitialStateType } from "../../redux/QuestionPage/types";
import { QuestionPageType, QuestionsType, TestPageType } from "../../http/models/api/question";

configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

jest.mock("../../http/data/question", () => ({
  postAskData: jest.fn()
}));

jest.mock('../../providers/ModalImg/useModalImg', () => ({
  useModalImg: () => {
    return {
      show: (confirmShowProps: ModalImgProps) => { },
    }
  }
}))

jest.mock('../../redux/QuestionPage/QuestionPage-Redux', () => ({
  QuestionActionThunk: {
    setPageQuests: jest.fn(),
    deleteAsk: jest.fn()
  }
}))

jest.mock('../../redux/Redact/redact-Reducer', () => ({
  RedactActions: {
    setRedact: jest.fn()
  }
}))

jest.mock('../../redux/Test/Test-Reducer', () => ({
  TestActionsThunk: {
    startTest: jest.fn()
  }
}))

const questionPage: QuestionPageType = {
  idParent: "",
  nameParent: "",
  page: 1,
  questions: null as Array<QuestionsType> | null,
  sizePage: 1,
  sizeQuestions: 0,
};

const TestPage: TestPageType = {
  passedAsk: 0,
  question: null,
  sizeAsk: 0,
  isFinith: false,
};

export const initialState = {
  testReducer: {
    id: "",
    title: "",
    typeTest: "",
    TestPage,
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
    questionPage,
    breadcrumb: []
  },
  authReducer: {
    email: "email"
  }
};

describe("HomeContainer", () => {
  let component: any;

  const renderWrapper = () => {
    let store = mockStore(initialState);
    store.dispatch = jest.fn();
    component = mount(<BrowserRouter basename="/">
      <Provider store={store}>
        <HomeContainer />
      </Provider>
    </BrowserRouter >);
  }

  it("Создать", () => {
    renderWrapper();
    const button = component.findWhere((node: any) => {
      return node.text() === "Создать" && node.type() === "button"
    });
    button.simulate('click');
  });

  it("Test redirect", () => {
    TestPage.question = {
      dateAdd: "string",
      description: "string",
      id: "string",
      idParent: "string",
      images: "string",
      isHiddenContentTest: true,
      isIgnoreTest: true,
      name: "string",
    };

    renderWrapper();
  });

  it("Redact redirect", () => {
    TestPage.question = null;
    initialState.redactReducer.id = "id";

    renderWrapper();
  });
});