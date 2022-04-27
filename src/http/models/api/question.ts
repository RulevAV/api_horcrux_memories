export type QuestionsType = {
    dateAdd: string,
    description: string,
    id: string,
    idParent: string,
    images: string,
    isHiddenContentTest: boolean
    isIgnoreTest: boolean
    name: string,
}

export type AddQuestionsType = {
    description: string,
    idParent?: string,
    images: string,
    isHiddenContentTest: boolean
    isIgnoreTest: boolean
    name: string,
}

export type QuestionPageType = {
    idParent: string,
    nameParent: string,
    page: number
    questions: Array<QuestionsType> | null
    sizePage: number
    sizeQuestions: number
}

export type TestPageType = {
    passedAsk: number
    question: QuestionsType | null,
    sizeAsk: number,
    isFinith: boolean
}