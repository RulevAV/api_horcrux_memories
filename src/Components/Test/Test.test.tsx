import { configure } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render, fireEvent, screen } from '@testing-library/react'
import { TestContainer } from "./TestContainer";
import { ModalAlertShowProps } from "../../providers/Alert/modal";
import { TestActions, TestActionsThunk, TestType } from "../../redux/Test/Test-Reducer";
import { putAskData } from "../../http/data/user";

configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

jest.mock('../../providers/Alert/modal', () => ({
  useModalAlert: () => {
    return {
      show: (confirmShowProps: ModalAlertShowProps) => {
      },
    }
  }
}))

jest.mock('../../redux/Test/Test-Reducer', () => ({
  TestActionsThunk: {
    breckTest: jest.fn,
    getAsk: jest.fn
  },
  TestActions: {
    clearAsk: jest.fn
  }
}));

jest.mock('../../http/data/user', () => ({
  putAskData: jest.fn()
}));

const initialState = {
  testReducer: {
    id: "id1",
    title: "",
    typeTest: "",
    TestPage: {
      passedAsk: 0,
      question: null,
      sizeAsk: 0,
      isFinith: false,
    },
  } as TestType
}

describe("Test", () => {
  let component: any;
  const renderWrapper = () => {
    let store = mockStore(initialState);
    store.dispatch = jest.fn();
    component = render(<BrowserRouter basename="/">
      <Provider store={store}>
        <TestContainer />
      </Provider>
    </BrowserRouter >);
  }

  it("question null", async () => {
    renderWrapper();
  });

  it("Сохранить изменения", async () => {
    await renderWrapper();
    const redact = screen.getAllByText("Сохранить изменения")[0];
    //screen.debug()
    await fireEvent.click(redact)
  });

  it("question images null", async () => {
    initialState.testReducer.TestPage.question = {
      dateAdd: "string",
      description: "",
      id: "string",
      idParent: "string",
      images: "",
      isHiddenContentTest: false,
      isIgnoreTest: false,
      name: "string",
    }
    renderWrapper();
  });

  it("question ", async () => {
    initialState.testReducer.TestPage.question = {
      dateAdd: "string",
      description: "string",
      id: "string",
      idParent: "string",
      images: "string",
      isHiddenContentTest: false,
      isIgnoreTest: false,
      name: "string",
    }
    renderWrapper();
  });

  it("Сохранить изменения", async () => {
    await renderWrapper();
    const redact = screen.getAllByText("Сохранить изменения")[0];
    //screen.debug()
    await fireEvent.click(redact)
  });

  it("Сохранить изменения isIgnoreTest", async () => {
    await renderWrapper();
    const isIgnoreTest = await screen.findByLabelText("Пропускать этот вопрос");
    //screen.debug()
    await fireEvent.click(isIgnoreTest)
    const redact = screen.getAllByText("Сохранить изменения")[0];
    //screen.debug()
    await fireEvent.click(redact)
  });

  it("Сохранить изменения isHiddenContentTest", async () => {
    await renderWrapper();
    const isHiddenContentTest = await screen.findByLabelText("Скрывать описание");
    //screen.debug()
    await fireEvent.click(isHiddenContentTest)

    const redact = screen.getAllByText("Сохранить изменения")[0];
    //screen.debug()
    await fireEvent.click(redact)
  });

  it("Закончить тест", async () => {
    await renderWrapper();
    const redact = screen.getAllByText("Закончить тест")[0];
    //screen.debug()
    await fireEvent.click(redact)
  });

  it("Дальше", async () => {
    await renderWrapper();
    const redact = screen.getAllByText("Дальше")[0];
    //screen.debug()
    await fireEvent.click(redact)
  });

  it("Пропускать этот вопрос", async () => {
    await renderWrapper();
    const redact = await screen.findByLabelText("Пропускать этот вопрос");
    //screen.debug()
    await fireEvent.click(redact)
  });

  it("Пропускать этот вопрос", async () => {
    await renderWrapper();
    const redact = await screen.findByLabelText("Скрывать описание");
    //screen.debug()
    await fireEvent.click(redact)
  });

  it("Дальше Finith", async () => {
    initialState.testReducer.TestPage.isFinith = true;
    await renderWrapper();
    // component.debug()

    const redact = screen.getAllByText("Дальше")[0];
    await fireEvent.click(redact)
  });

  it("Redirect", async () => {
    initialState.testReducer.id = "";
    await renderWrapper();
  });
});