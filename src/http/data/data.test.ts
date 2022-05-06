import { postAskData } from "./question";
import { breckTestData, getAskData } from "./test";
import { deleteAskData, deleteUserData, getQuestionsData, getUserData, getUsersData, putAskData } from "./user";

jest.mock('../endpoints/question', () => ({
  postAskApi: jest.fn,
  getQuestionsApi: jest.fn,
  deleteAskApi: jest.fn,
  putAskAPi: jest.fn

}));

jest.mock('../endpoints/test', () => ({
  getAskApi: jest.fn,
  breckTestApi: jest.fn
}));

jest.mock('../endpoints/user', () => ({
  getUserAPI: jest.fn,
  getUsersApi: jest.fn,
  deleteUserApi: jest.fn,

}));

const model = {
  description: "string",
  idParent: "string",
  images: "string",
  isHiddenContentTest: true,
  isIgnoreTest: true,
  name: "string",
}
describe("data", () => {
  it("question", () => {

    postAskData(model);
  })

  it("test getAskData", () => {
    getAskData("IdRoot", "type");
  })

  it("test getAskData", () => {
    breckTestData("IdRoot", "type");
  })

  it("user getUserData", () => {
    getUserData();
  })

  it("user getQuestionsData", () => {
    getQuestionsData("idParent", 1, 1);
  })

  it("user getUsersData", () => {
    getUsersData();
  })

  it("user deleteUserData", () => {
    deleteUserData("12");
  })

  it("user deleteAskData", () => {
    deleteAskData("12");
  })

  it("user putAskData", () => {
    const moodel = {
      dateAdd: "",
      description: "",
      id: "",
      idParent: "",
      images: "",
      isHiddenContentTest: true,
      isIgnoreTest: true,
      name: ""
    };
    putAskData(moodel);
  })
})