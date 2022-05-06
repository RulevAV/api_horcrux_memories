import { configure, shallow } from "enzyme";
import { Admin } from "./Admin";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { ModalWindowShowProps } from "../providers/ModalWindow/modal";
import { Create } from "./Create";
import { ModalImgProps } from "../providers/ModalImg/useModalImg";
import { Home } from "./Home";
import { Login } from "./Login";
import Redact from "./Redact";
import { Registration } from "./Registration";
import { Test } from "./Test";

configure({ adapter: new Adapter() });

jest.mock("../http/endpoints/user", () => ({
  putRolsApi: () => { }
}));

jest.mock("../http/data/user", () => ({
  getUsersData: () => {
    return "req_getUsersData";
  },
  deleteAskData: () => { },
  deleteUserData: () => { },
}));

jest.mock("../http/data/question", () => ({
  postAskData: jest.fn()
}));

jest.mock('../providers/ModalImg/useModalImg', () => ({
  useModalImg: () => {
    return {
      show: (confirmShowProps: ModalImgProps) => { },
    }
  }
}))

jest.mock('../redux/QuestionPage/QuestionPage-Redux', () => ({
  QuestionActionThunk: {
    setPageQuests: jest.fn(),
    deleteAsk: jest.fn()
  }
}))

jest.mock('../redux/Redact/redact-Reducer', () => ({
  RedactActions: {
    setRedact: jest.fn()
  }
}))

jest.mock('../redux/Test/Test-Reducer', () => ({
  TestActionsThunk: {
    startTest: jest.fn()
  }
}))

describe("screen", () => {
  it("Admin", async () => {
    shallow(<Admin />)
  });
  it("Create", async () => {
    shallow(<Create />)
  });
  it("Home", async () => {
    shallow(<Home />)
  });
  it("Login", async () => {
    shallow(<Login />)
  });
  it("Redact", async () => {
    shallow(<Redact />)
  });
  it("Registration", async () => {
    shallow(<Registration />)
  });
  it("Test", async () => {
    shallow(<Test />)
  });

});