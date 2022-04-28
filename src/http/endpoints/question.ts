import { AddQuestionsType, QuestionPageType, QuestionsType, TestPageType } from "../models/api/question";
import { HttpOptions } from "../service/options";
import { httpService } from "../service/question";
import { buildQs } from "../shared";

export const getQuestionsApi = (idParent: string, page: number, portionsSize: number) => {
    const options = new HttpOptions();
    return httpService.get<QuestionPageType>(buildQs(`/Question/Portions`, { idParent, page, portionsSize }), options);
}

export const putAskAPi = (model: QuestionsType) => {
    const options = new HttpOptions();
    return httpService.put<TestPageType>(`Question`, model, options);
}

export const postAskApi = (model: AddQuestionsType) => {
    const options = new HttpOptions();
    return httpService.post<TestPageType>(`Question`, model, options);
}

export const deleteAskApi = (id: string) => {
    const options = new HttpOptions();
    return httpService.delete<TestPageType>(buildQs(`Question`, { id }), options);
}