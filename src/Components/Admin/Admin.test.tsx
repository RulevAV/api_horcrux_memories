import { configure, mount } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from "react-router-dom";
import { AdminContainer } from "./AdminContainer";
import { ModalWindowShowProps } from "../../providers/ModalWindow/modal";
import { GetUserType } from "../../http/models/api/user";
import { act } from "@testing-library/react";
import ContentModal from "./ContentModal/ContentModal";

configure({ adapter: new Adapter() });

const req_getUsersData = {
  users: [{
    id: "string",
    email: "user1",
    lastName: "string",
    firstName: "string",
    userName: "string",
    roles: ["role1", "role2"]
  },
  {
    id: "string2",
    email: "user2",
    lastName: "string",
    firstName: "string",
    userName: "string",
    roles: ["role1", "role2", "role3"]
  }],
  allRoles: ["role1", "role2", "role3"]
} as GetUserType;

jest.mock("../../http/endpoints/user", () => ({
  putRolsApi: () => { }
}));

jest.mock("../../http/data/user", () => ({
  getUsersData: () => {
    return req_getUsersData;
  },
  deleteAskData: () => { },
  deleteUserData: () => { },
}));

jest.mock('../../providers/ModalWindow/modal', () => ({
  useModalWindow: () => {
    return {
      show: (confirmShowProps: ModalWindowShowProps) => {
        confirmShowProps.onApply(null);
      },
    }
  }
}))

describe("Admin", () => {
  let component: any;
  let RowTable: any;

  beforeEach(async () => {
    await act(async () => {
      component = mount(<BrowserRouter basename="/">
        <AdminContainer />
      </BrowserRouter >);
    });
    component.setState(req_getUsersData);
    RowTable = component.find("Admin").find("TableUsers").find("RowTable");
  })

  it("row users", async () => {
    expect(RowTable.length).toBe(2);
  });

  it("button Открыть", async () => {
    const tr = RowTable.first();
    const button = tr.findWhere((node: any) => {
      return node.text() === "Открыть" && node.type() === "button"
    });

    await act(async () => {
      button.simulate('click');
    });
  });

  it("button Удалить пользователя", async () => {
    const tr = RowTable.first();
    const button = tr.findWhere((node: any) => {
      return node.text() === "Удалить пользователя" && node.type() === "button"
    });

    await act(async () => {
      button.simulate('click');
    });
  });
});

describe("Admin ContentModal", () => {
  let component: any;
  let allRoles = req_getUsersData.allRoles;
  let userRoles = req_getUsersData.users[0].roles;
  let setData = () => { }

  beforeEach(async () => {
    component = mount(<ContentModal allRoles={allRoles} userRoles={userRoles} setData={setData} />);
  })

  it("row users", async () => {
    const button = component.find("tbody").find("ul").find("li")
    button.simulate('click');
  });

  it("row Delelete", async () => {
    const button = component.find("RowRol").first().find("button");
    button.simulate('click');
  });
});