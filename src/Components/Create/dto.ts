import { AddQuestionsType, QuestionsType } from "../../http/models/api/question"

export const parseAddQuestions = (data: QuestionsType, idParent: string) => {
    const model: AddQuestionsType = {
        description: data.description,
        images: data.images,
        isHiddenContentTest: data.isHiddenContentTest,
        isIgnoreTest: data.isIgnoreTest,
        name: data.name,
    }
    
    if (idParent)
        model.idParent = idParent;
    return model;
}