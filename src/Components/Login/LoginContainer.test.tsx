import { act, fireEvent, render, screen } from '@testing-library/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { LoginContainer } from './LoginContainer';

jest.mock("../../redux/Auth/Auth-Reducer", () => ({
  AuthActionsThunk: {
    login: jest.fn
  }
}));

configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

describe("HomeContainer", () => {
  let component: any;
  const initialState = {
    authReducer: {
      isAuthenticated: false
    }
  }

  const renderWrapper = () => {
    let store = mockStore(initialState);
    store.dispatch = jest.fn();
    component = render(<BrowserRouter basename="/">
      <Provider store={store}>
        <LoginContainer />
      </Provider>
    </BrowserRouter >);
  }

  it("mount", async () => {
    await act(async () => {
      renderWrapper();
    });
  });

  it("send form", async () => {
    await act(async () => {
      await renderWrapper();
      const login = component.container.querySelector("#login");
      const password = component.container.querySelector("#password");
      const button = component.getByText("Войти", 'Submit');

      await fireEvent.change(login, {
        target: {
          name: 'login',
          value: 'Changed@mail.ru'
        }
      })

      await fireEvent.change(password, {
        target: {
          name: 'password',
          value: 'password'
        }
      })
      await fireEvent.submit(button)
    });
  });

  it("not auth", async () => {
    await act(async () => {
      initialState.authReducer.isAuthenticated = true;
      renderWrapper();
    });
  });
});