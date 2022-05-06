import { configure, mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ModalImgProps } from "../../providers/ModalImg/useModalImg";
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import LoadingContainer from "./LoadingContainer";

configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);
jest.mock('../../providers/ModalImg/useModalImg', () => ({
  useModalImg: () => {
    return {
      show: (confirmShowProps: ModalImgProps) => { },
    }
  }
}))

const initialState = {
  loadingReducer: {
    visible: true
  }
}

describe("Loading", () => {
  let component: any;

  const renderWrapper = () => {
    let store = mockStore(initialState);
    store.dispatch = jest.fn();
    component = mount(<BrowserRouter basename="/">
      <Provider store={store}>
        <LoadingContainer />
      </Provider>
    </BrowserRouter >);
  }

  it("false", () => {
    initialState.loadingReducer.visible = false;
    renderWrapper();
  });

  it("true", () => {
    initialState.loadingReducer.visible = true;
    renderWrapper();
  });
});