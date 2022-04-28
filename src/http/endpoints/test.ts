import { TestPageType } from "../models/api/question";
import { HttpOptions } from "../service/options";
import { httpService } from "../service/question";
import { buildQs } from "../shared";

export const nextQuestion = (IdRoot: string, type: string) => {
    const options = new HttpOptions();
    return httpService.get<TestPageType>(buildQs(`/Test/`, { IdRoot, type }), options);
}

export const getAskApi = (IdRoot: string, type: string) => {
    const options = new HttpOptions();
    return httpService.get<TestPageType>(buildQs(`Test/GetAsk/`, { IdRoot, type }), options);
}

export const breckTestApi = (IdRoot: string, type: string) => {
    const options = new HttpOptions();
    return httpService.post<TestPageType>(buildQs(`Test/breckTest/`, { IdRoot, type }), options);
}