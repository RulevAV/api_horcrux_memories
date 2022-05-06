import { questionPage } from "./data/Question";
import { testPage } from "./data/Test";
import { user } from "./data/user";

const responseApi = (url: string) => {
  //console.log(url);
  switch (url) {
    case "post https://localhost:44397/api//user/token": {
      return user
    }
    case "get https://localhost:44397/api//user/revoke-token": {
      return "ok";
    }
    case "get https://localhost:44370/api//Question/Portions?page=1&portionsSize=1": {
      return questionPage
    }
    case "delete https://localhost:44370/api/Question?": {
      return "ok"
    }
    case "get https://localhost:44370/api/Test/GetAsk/?": {
      return testPage
    }
    case "post https://localhost:44370/api/Test/breckTest/?": {
      return "ok"
    }
  }
}


export default responseApi;