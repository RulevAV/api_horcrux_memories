import axios from "axios";
import { HttpBaseService } from "./base-service"
import { HttpOptions } from "./options";



// jest.mock("axios", () => ({
//   create: () => ({}),
//   CancelToken: {
//     source: () => { }
//   }
// }))

describe("httpBase", () => {
  it("refresh Success", () => {

    const instance = axios.create({
      baseURL: 'https://localhost:44370/api/',
    });

    const cancelTokenSource = axios.CancelToken.source();

    const temp = new HttpBaseService(instance);


    const options = new HttpOptions()
      .asAuthRoute().
      responseType("arraybuffer")
      .setHeader("", "")
      .timeout(2)
      .setCancelToken(cancelTokenSource);

    temp.get("", options);
    temp.post("");
    temp.put("");
    temp.delete("");
  })


})