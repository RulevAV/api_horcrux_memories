import { AddQuestionsType, QuestionPageType, QuestionsType, TestPageType } from "../models/api/question";
import { HttpOptions } from "../service/options";
import { httpService } from "../service/question";
import { buildQs } from "../shared";

export const getQuestionsApi = (idParent: string, page: number, portionsSize: number) => {
    const options = new HttpOptions();
    return httpService.get<QuestionPageType>(buildQs(`/Question/Portions`, { idParent, page, portionsSize }), options);
}

export const nextQuestion = (IdRoot: string, type: string) => {
    const options = new HttpOptions();
    return httpService.get<TestPageType>(buildQs(`/Test/`, { IdRoot, type }), options);
}

export const getAsk = (IdRoot: string, type: string) => {
    const options = new HttpOptions();
    return httpService.get<TestPageType>(buildQs(`Test/GetAsk/`, { IdRoot, type }), options);
}

export const breckTest = (IdRoot: string, type: string) => {
    const options = new HttpOptions();
    return httpService.post<TestPageType>(buildQs(`Test/breckTest/`, { IdRoot, type }), options);
}

export const putAsk = (model: QuestionsType) => {
    const options = new HttpOptions();
    return httpService.put<TestPageType>(`Question`, model, options);
}

export const postAsk = (model: AddQuestionsType) => {
    const options = new HttpOptions();
    return httpService.post<TestPageType>(`Question`, model, options);
}

export const deleteAskApi = (id: string) => {
    const options = new HttpOptions();
    return httpService.delete<TestPageType>(buildQs(`Question`, { id }), options);
}