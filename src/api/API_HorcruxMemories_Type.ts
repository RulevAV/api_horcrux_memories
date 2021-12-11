export type QueryType = {
    dateAdd:string,
    description: null|string,
    id:string,
    idParent:string,
    images:string,
    isHiddenContentTest: boolean
    isIgnoreTest: boolean
    name:string,
}

export type DependOnParentQuestionType = {
    idParent: string,
    nameParent: string,
    page: number
    questions: Array<QueryType>|null
    sizePage: number
    sizeQuestions: number
}

export type AskType = {
    passedAsk: number
    question: QueryType|null,
    sizeAsk: number
}