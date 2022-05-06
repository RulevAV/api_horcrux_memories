import { refresh } from "./refresh"

jest.mock('./endpoints/user', () => ({
  refreshTokenApi: jest.fn
}));

const httpPointSuccess = async () => {
  return async () => { }
}
let updateToken = false;

const httpPointError = async () => {
  if (updateToken === true) {
    return "ok";
  }
  updateToken = true;
  throw "error"
}

describe("http", () => {
  it("refresh Success", () => {
    refresh(httpPointSuccess);
  })

  it("refresh Error", () => {
    refresh(httpPointError);
  })
})