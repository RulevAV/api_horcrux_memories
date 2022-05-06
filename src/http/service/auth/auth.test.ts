import { HttpService } from ".";

const config = {
  headers: {
    Authorization: ""
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
  it("no exist token", () => {
    HttpService;
  })
})