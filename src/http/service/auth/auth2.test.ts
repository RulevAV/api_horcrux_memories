import { HttpService } from ".";

const config = {
  headers: {
    Authorization: "asd"
  }
}

jest.mock('js-cookie', () => ({
  get: () => "sdfsdf"
}));

jest.mock('axios', () => ({
  create: () => ({
    interceptors: {
      request: {
        use: (fn: Function) => {

          fn(config);
        }
      }
    }
  })
}));

describe("auth", () => {
  it("exist token", () => {
    HttpService;
  })
})