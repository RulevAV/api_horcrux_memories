import { configure } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ModalImgProps } from "../../providers/ModalImg/useModalImg";
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render, fireEvent, screen, act } from '@testing-library/react'
import QuestionsContainer from "./QuestionsContainer";
import { ModalWindowShowProps } from "../../providers/ModalWindow/modal";
configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

jest.mock("../../http/data/question", () => ({
  postAskData: jest.fn()
}));

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

jest.mock('../../providers/ModalImg/useModalImg', () => ({
  useModalImg: () => {
    return {
      show: (confirmShowProps: ModalImgProps) => { },
    }
  }
}))

jest.mock('../../providers/ModalWindow/modal', () => ({
  useModalWindow: () => {
    return {
      show: (confirmShowProps: ModalWindowShowProps) => {
        confirmShowProps.onApply("");
      },
    }
  }
}))

describe("Questions", () => {
  let component: any;
  let initialState = {
    questionPageReducer: {
      questionPage: {
        idParent: "",
        nameParent: "",
        page: 1,
        questions: [{
          dateAdd: "string",
          description: "string",
          id: "string",
          idParent: "string",
          images: "string",
          isHiddenContentTest: true,
          isIgnoreTest: true,
          name: "string",
        },
        {
          dateAdd: "string",
          description: "string",
          id: "string2",
          idParent: "string",
          images: "",
          isHiddenContentTest: true,
          isIgnoreTest: true,
          name: "string",
        }
        ],
        sizePage: 3,
        sizeQuestions: 0,
      }
    },
    authReducer: {
      isAuthenticated: false,
      userName: "",
      email: "",
      roles: [] as string[],
      message: ""
    }

  }

  const renderWrapper = () => {
    let store = mockStore(initialState);
    store.dispatch = jest.fn();
    component = render(<BrowserRouter basename="/">
      <Provider store={store}>
        <QuestionsContainer />
      </Provider>
    </BrowserRouter >);
  }

  it("img show", () => {
    renderWrapper();
    const img = component.container.querySelector('img')
    //component.debug(img);
    fireEvent.click(img);
  });

  it("Редактировать", async () => {
    await act(async () => {
      await renderWrapper();
      const redact = screen.getAllByText("Редактировать")[0];
      //screen.debug(redact)
      await fireEvent.click(redact)
    });
  });

  it("Открыть", async () => {
    await act(async () => {
      await renderWrapper();
      const redact = screen.getAllByText("Открыть")[0];
      await fireEvent.click(redact)
    });
  });

  it("Удалить", async () => {
    await act(async () => {
      await renderWrapper();
      const redact = screen.getAllByText("Удалить")[0];
      await fireEvent.click(redact)
    });
  });

  it("Начать тест", async () => {
    await act(async () => {
      await renderWrapper();
      const redact = screen.getAllByText("Начать тест")[0];
      await fireEvent.click(redact)
    });
  })

  it("Начать глобальный тест", async () => {
    await act(async () => {
      await renderWrapper();
      const redact = screen.getAllByText("Начать глобальный тест")[0];
      await fireEvent.click(redact)
    });
  })
});