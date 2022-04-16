import { QuestionPageType, TestPageType } from "../models/api/question";
import { HttpOptions } from "../service/options";
import { httpService } from "../service/question";
import { buildQs } from "../shared";

export const getQuestions = (idParent: string, page: number, portionsSize: number) => {
    const options = new HttpOptions();
    return httpService.get<QuestionPageType>(buildQs(`/Question/Portions`, { idParent, page, portionsSize }), options);
}

export const nextQuestion = (IdRoot: string, type: string) => {
    const options = new HttpOptions();
    return httpService.get<TestPageType>(buildQs(`/Test/`, { IdRoot, type }), options);
}
