import { postAskApi } from "../endpoints/question";
import { AddQuestionsType, TestPageType } from "../models/api/question";
import { refresh } from "../refresh";


export const postAskData = async (model: AddQuestionsType) => {
    const _postAskData = async () => {
        return await postAskApi(model);
    }
    return refresh<TestPageType>(_postAskData);
}
