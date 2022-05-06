import { configure } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ModalImgProps } from "../../providers/ModalImg/useModalImg";
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render, fireEvent, screen, act } from '@testing-library/react'
import { ModalWindowShowProps } from "../../providers/ModalWindow/modal";
import { RedactContainer } from "./RedactContainer";

configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

interface WindowWithFileReader extends Window {
  FileReader: any;
}

interface MockFileReader {
  result: string;
  onerror(): void;
  onload(): void;
  readAsDataURL(): void;
}

class MockFileReader {
  onerror() { }
  onloadend() { }
  readAsDataURL() {
    this.result = 'result';
    this.onloadend();
  }
}

(window as WindowWithFileReader).FileReader = MockFileReader;

jest.mock("../../redux/Redact/redact-Reducer", () => ({
  RedactActionsThunk: {
    saveAsk: jest.fn()
  }
}));

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

describe("Redact", () => {
  let component: any;
  let initialState = {
    redactReducer: {
      dateAdd: "",
      description: "",
      id: "id",
      idParent: "",
      images: "",
      isHiddenContentTest: false,
      isIgnoreTest: false,
      name: "",
    }
  }

  const renderWrapper = () => {
    let store = mockStore(initialState);
    store.dispatch = jest.fn();
    component = render(<BrowserRouter basename="/">
      <Provider store={store}>
        <RedactContainer />
      </Provider>
    </BrowserRouter >);
  }

  it("img null", () => {
    initialState.redactReducer.images = "sdfsdf";
    renderWrapper();
    const img = component.container.querySelector('img')
    fireEvent.click(img);
  });

  it("Добавить изображение", async () => {
    await act(async () => {
      await renderWrapper();
      const redact = screen.getAllByText("Добавить изображение")[0];
      await fireEvent.click(redact)
    });
  });

  it("Добавить изображение file", async () => {
    await act(async () => {
      await renderWrapper();
      const redact = component.container.querySelector(`input[hidden]`)
      const file = new File(['(⌐□_□)'], 'chucknorris.png', {
        type: 'image/png',
      });
      await fireEvent.change(redact, {
        target: {
          files: [file]
        }
      })
    });
  });

  it("Убрать изображение file", async () => {
    await act(async () => {
      await renderWrapper();
      const redact = component.container.querySelector(`input[hidden]`)
      await fireEvent.change(redact, {
        target: {
          files: []
        }
      })
    });
  });

  it("Изменить название", async () => {
    await act(async () => {
      await renderWrapper();
      const redact = await screen.findByLabelText("Название");
      await fireEvent.change(redact, {
        target: {
          value: 'name'
        }
      })
    });
  });

  it("Изменить описание", async () => {
    await act(async () => {
      await renderWrapper();
      const redact = await screen.findByLabelText("Описание");
      await fireEvent.change(redact, {
        target: {
          value: 'Описание'
        }
      })
    });
  });

  it("Скрывать описание", async () => {
    await act(async () => {
      await renderWrapper();
      const redact = await screen.findByLabelText("Скрывать описание");
      await fireEvent.click(redact)
    });
  });

  it("Пропускать этот вопрос", async () => {
    await act(async () => {
      await renderWrapper();
      const redact = await screen.findByLabelText("Пропускать этот вопрос");
      await fireEvent.click(redact)
    });
  });

  it("save", async () => {
    await act(async () => {
      await renderWrapper();
      const redact = screen.getAllByText("Сохранить")[0];
      await fireEvent.click(redact)
    });
  });

  it("Redirect", async () => {
    await act(async () => {
      initialState.redactReducer.id = "";
      await renderWrapper();
    });
  });
});