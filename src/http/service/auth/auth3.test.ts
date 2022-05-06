import { HttpService } from ".";

const config = {
  headers: {
    Authorization: ""
  }
}

jest.mock('js-cookie', () => ({
  get: () => ""
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