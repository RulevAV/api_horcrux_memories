import { deleteAskApi, getQuestionsApi, putAskAPi } from "../endpoints/question";
import { deleteUserApi, getUserAPI, getUsersApi } from "../endpoints/user";
import { QuestionPageType, QuestionsType } from "../models/api/question";
import { GetUserType, LoginApi } from "../models/api/user";
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

export const getUsersData = async () => {
    const _getUsersApi = async () => {
        return await getUsersApi();
    }
    return refresh<GetUserType>(_getUsersApi);
}

export const deleteUserData = async (id: string) => {
    const _deleteUserApi = async () => {
        return await deleteUserApi(id);
    }
    return refresh(_deleteUserApi);
}

export const deleteAskData = async (id: string) => {
    const _deleteAskApi = async () => {
        return await deleteAskApi(id);
    }
    return refresh(_deleteAskApi);
}

export const putAskData = async (model: QuestionsType) => {
    const _putAskAPi = async () => {
        return await putAskAPi(model);
    }
    return refresh(_putAskAPi);
}