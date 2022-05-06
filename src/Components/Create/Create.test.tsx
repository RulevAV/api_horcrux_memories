import { configure, mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ModalImgProps } from "../../providers/ModalImg/useModalImg";
import { CreateContainer } from "./CreateContainer";
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'
import { parseAddQuestions } from "./dto";
import { QuestionsType } from "../../http/models/api/question";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

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

export const initialState = {
  questionPageReducer: {
    questionPage: {
      idParent: "",
      nameParent: "",
      page: 1,
      questions: null,
      sizePage: 1,
      sizeQuestions: 0,
    },
    breadcrumb: []
  }
};

const data: QuestionsType = {
  dateAdd: "string",
  description: "string",
  id: "string",
  idParent: "string",
  images: "string",
  isHiddenContentTest: false,
  isIgnoreTest: false,
  name: "string",
}

describe("Create", () => {
  let component: any;
  beforeEach(() => {
    const store = mockStore(initialState);
    component = mount(<BrowserRouter basename="/">
      <Provider store={store}>
        <CreateContainer />
      </Provider>
    </BrowserRouter >);
  })

  it("button img show", () => {
    const img = component.find("Create").find("img");
    img.simulate('click');
  });

  it("button save", () => {
    const button = component.findWhere((node: any) => {
      return node.text() === 'Сохранить' && node.type() === "button";
    });

    button.simulate('click');
  });

  it('dto idParent', () => {
    const result = parseAddQuestions(data, "idParent");
    expect(result.idParent).toBe("idParent");
  })

  it('dto idParent is empty"', () => {
    const result = parseAddQuestions(data, "");
    expect(result.idParent).toBe(undefined);
  })
});