import { getQuestionsApi } from "../endpoints/question";
import { getUserAPI } from "../endpoints/user";
import { QuestionPageType } from "../models/api/question";
import { LoginApi } from "../models/api/user";
import { refresh } from "../refresh";

export const getUserData = async () => {
    return refresh<LoginApi>(getUserAPI);
}

export const getQuestionsData = async (idParent: string, page: number, portionsSize: number) => {
    const _getQuestionsApi = async () => {
        return await getQuestionsApi(idParent, page, portionsSize);
    }
    return refresh<QuestionPageType>(_getQuestionsApi);
}