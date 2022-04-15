import { HttpOptions } from "../service/options";
import { httpService } from "../service/question";
import { buildQs } from "../shared";

export const getQuestions = (idParent:string, page:number, portionsSize:number) => {
    const options = new HttpOptions();
    return httpService.get(buildQs(`/Question/Portions`,{idParent, page, portionsSize}), options);
}
