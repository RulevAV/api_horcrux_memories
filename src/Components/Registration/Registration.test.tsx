import { configure } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render, fireEvent, act } from '@testing-library/react'
import RegistrationContainer from "./RegistrationContainer";
import { ModalAlertShowProps } from "../../providers/Alert/modal";

configure({ adapter: new Adapter() });

jest.mock("../../http/endpoints/user", () => ({
  registrationApi: (username: string, firstName: string, lastName: string, password: string, email: string) => {
    if (email !== "Error@mail.ru")
      return "ok";
    else {
      const error = {
        response: {
          data: "Error user"
        }
      };
      throw error;
    }
  }
}));

jest.mock('../../providers/Alert/modal', () => ({
  useModalAlert: () => {
    return {
      show: (confirmShowProps: ModalAlertShowProps) => {
      },
    }
  }
}))

describe("Registration", () => {
  let component: any;
  let username: any;
  let lastName: any;
  let firstName: any;
  let password: any;
  let confirmPassword: any;
  let email: any;
  let button: any;
  let renderWrapper = () => {

    component = render(<BrowserRouter basename="/">
      <RegistrationContainer />
    </BrowserRouter >);
  }

  beforeEach(async () => {
    renderWrapper();
    username = component.container.querySelector("#username");
    lastName = component.container.querySelector("#lastName");
    firstName = component.container.querySelector("#firstName");
    password = component.container.querySelector("#password");
    confirmPassword = component.container.querySelector("#confirmPassword");
    email = component.container.querySelector("#email");
    button = component.getByText("Зарегистрироваться", 'Submit');

    await act(async () => {
      await fireEvent.change(username, {
        target: {
          name: 'username',
          value: 'Changed@mail.ru'
        }
      })
      await fireEvent.change(lastName, {
        target: {
          name: 'lastName',
          value: 'Changed@mail.ru'
        }
      })
      await fireEvent.change(firstName, {
        target: {
          name: 'firstName',
          value: 'Changed@mail.ru'
        }
      })
      await fireEvent.change(password, {
        target: {
          name: 'password',
          value: 'password'
        }
      })
      await fireEvent.change(confirmPassword, {
        target: {
          name: 'confirmPassword',
          value: 'password'
        }
      })
    })
  })

  it("success", async () => {
    await act(async () => {
      await fireEvent.change(email, {
        target: {
          name: 'email',
          value: 'Changed@mail.ru'
        }
      })
      await fireEvent.submit(button)
    })
  });

  it("error", async () => {
    await act(async () => {
      await fireEvent.change(email, {
        target: {
          name: 'email',
          value: 'Error@mail.ru'
        }
      })
      await fireEvent.submit(button)
    })
  });
});