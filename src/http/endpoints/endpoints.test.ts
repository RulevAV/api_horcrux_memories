import { deleteAskApi, getQuestionsApi, postAskApi, putAskAPi } from "./question"
import { breckTestApi, getAskApi, nextQuestion } from "./test";
import { getUserAPI, loginApi, refreshTokenApi, registrationApi, revokeTokenApi, getUsersApi, putRolsApi, deleteUserApi } from "./user";

jest.mock('../service/question', () => ({
  httpService: {
    get: jest.fn,
    post: jest.fn,
    put: jest.fn,
    delete: jest.fn,
  }
}));

jest.mock('../service/auth', () => ({
  httpService: {
    get: jest.fn,
    post: jest.fn,
    put: jest.fn,
    delete: jest.fn,
  }
}));

describe("endpoints", () => {
  it("question getQuestionsApi", () => {
    getQuestionsApi("idParent", 1, 1);
  })
  it("question putAskAPi", () => {
    const model = {
      dateAdd: "string",
      description: "string",
      id: "string",
      idParent: "string",
      images: "string",
      isHiddenContentTest: false,
      isIgnoreTest: false,
      name: "string",
    }
    putAskAPi(model);
  })
  it("question postAskApi", () => {
    const model = {
      description: "string",
      idParent: "string",
      images: "string",
      isHiddenContentTest: false,
      isIgnoreTest: false,
      name: "string"
    }
    postAskApi(model);
  })
  it("question deleteAskApi", () => {
    deleteAskApi("idParent");
  })

  it("test nextQuestion", () => {
    nextQuestion("", "");
  })
  it("test getAskApi", () => {
    getAskApi("", "");
  })
  it("test breckTestApi", () => {
    breckTestApi("", "");
  })

  it("user getUserAPI", () => {
    getUserAPI();
  })
  it("user loginApi", () => {
    loginApi("", "");
  })
  it("user refreshTokenApi", () => {
    refreshTokenApi();
  })
  it("user registrationApi", () => {
    registrationApi("", "", "", "", "");
  })
  it("user revokeTokenApi", () => {
    revokeTokenApi();
  })
  it("user getUsersApi", () => {
    getUsersApi();
  })
  it("user putRolsApi", () => {
    putRolsApi("", []);
  })
  it("user getUsersApi", () => {
    deleteUserApi("");
  })

})
