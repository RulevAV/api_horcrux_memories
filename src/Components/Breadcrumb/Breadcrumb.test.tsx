import { configure, mount } from "enzyme";
import { ModalImgProps } from "../../providers/ModalImg/useModalImg";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import BreadcrumbContainer from "./BreadcrumbContainer";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'

configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

jest.mock("../../redux/QuestionPage/QuestionPage-Redux", () => ({
  QuestionActionThunk: {
    setPageQuests: () => jest.fn()
  }
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
    breadcrumb: [{
      id: "id1",
      page: 1,
      portionsSize: 10,
      name: "name"
    }, {
      id: "id2",
      page: 2,
      portionsSize: 10,
      name: "name2"
    }]
  }
};

describe("Breadcrumb", () => {
  let component: any;
  const renderWrapper = () => {
    let store = mockStore(initialState);
    store.dispatch = jest.fn();
    component = mount(<BrowserRouter basename="/">
      <Provider store={store}>
        <BreadcrumbContainer />
      </Provider>
    </BrowserRouter >);
  }

  it("button img show", () => {
    renderWrapper();
    const li = component.find("li").first();
    const span = li.find("span")
    span.simulate('click');
  });
});