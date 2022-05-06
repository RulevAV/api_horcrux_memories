import { configure, mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ModalImgProps } from "../../providers/ModalImg/useModalImg";
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import PaginationContainer from "./PaginationContainer";
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

jest.mock("../../redux/QuestionPage/QuestionPage-Redux", () => ({
  QuestionActionThunk: {
    setPageQuests: jest.fn
  }
}));

jest.mock('../../providers/ModalImg/useModalImg', () => ({
  useModalImg: () => {
    return {
      show: (confirmShowProps: ModalImgProps) => { },
    }
  }
}))

describe("Pagination", () => {
  let component: any;
  let initialState = {
    questionPageReducer: {
      questionPage: {
        idParent: "",
        nameParent: "",
        page: 1,
        questions: null,
        sizePage: 3,
        sizeQuestions: 0,
      }
    }
  }

  const renderWrapper = () => {
    let store = mockStore(initialState);
    store.dispatch = jest.fn();
    component = render(<BrowserRouter basename="/">
      <Provider store={store}>
        <PaginationContainer portionsSize={3} />
      </Provider>
    </BrowserRouter >);
  }

  it("previous full", () => {
    initialState.questionPageReducer.questionPage.page = 1;
    renderWrapper();
    const input = component.queryByText("«").closest("div");
    fireEvent.click(input);
  });

  it("previous", async () => {
    initialState.questionPageReducer.questionPage.page = 2;
    renderWrapper();
    const input = component.queryByText("«").closest("div");
    fireEvent.click(input);
  });

  it("next", async () => {
    initialState.questionPageReducer.questionPage.page = 1;
    renderWrapper();
    const input = component.queryByText("»").closest("div");
    fireEvent.click(input);
  });

  it("next full", async () => {
    initialState.questionPageReducer.questionPage.page = 3;
    renderWrapper();
    const input = component.queryByText("»").closest("div");
    fireEvent.click(input);
  });

  it("item", async () => {
    renderWrapper();
    const input = component.queryByText("2").closest("li");
    fireEvent.click(input);
  });

  it("input change undefined", async () => {
    renderWrapper();
    const input = component.getByTestId("input");
    fireEvent.change(input, {
      target: {
        value: ""
      }
    })
  });

  it("input change string", async () => {
    renderWrapper();
    const input = component.getByTestId("input");
    fireEvent.change(input, {
      target: {
        value: "asd"
      }
    })
  });

  it("input keyup", async () => {
    renderWrapper();
    const input = component.getByTestId("input");

    fireEvent.keyUp(input, {
      keyCode: 12
    })
    fireEvent.keyUp(input, {
      keyCode: 13
    })
  });

  it("input blur", async () => {

    renderWrapper();
    const input = component.getByTestId("input");

    fireEvent.change(input, {
      target: {
        value: 3
      }
    })
    fireEvent.blur(input);
  });

  it("input blur value undefined", async () => {
    renderWrapper();
    const input = component.getByTestId("input");

    fireEvent.change(input, {
      target: {
        value: undefined
      }
    })
    fireEvent.blur(input);
  });

  it("input blur: newPages = page", async () => {
    renderWrapper();
    const input = component.getByTestId("input");
    //component.debug(input);
    fireEvent.change(input, {
      target: {
        value: 1
      }
    })
    fireEvent.blur(input);

    //component.debug(input);
  });
});