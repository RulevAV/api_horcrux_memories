import { breckTest, getAsk } from "../../http/endpoints/question";
import { TestPageType } from "../../http/models/api/question";
import { InfoActionsTypes, ThunkActionType } from "./../redux-store";


//AllTypeAction
type ActionsTypes = InfoActionsTypes<typeof TestActions>;

export type TestType = {
    id: string,
    title: string
    typeTest: string
    TestPage: TestPageType
}

export type ActionsTypesTest = InfoActionsTypes<typeof TestActions>;
export type ThankType = ThunkActionType<ActionsTypesTest, Promise<void>>;

export const initialState: TestType = {
    id: "",
    title: "",
    typeTest: "",
    TestPage: {
        passedAsk: 0,
        question: null,
        sizeAsk: 0,
        isFinith: false,
    },
};


export const testReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case "TEST_START": {
            return {
                ...state,
                id: action.id,
                title: action.title,
                typeTest: action.typeTest
            }
        }
        case "TEST_SET_PAGES": {
            return {
                ...state,
                TestPage: action.TestPage,
            }
        }
        case "TEST_CLEAR_PAGE": {
            return initialState;
        }
        default: return state;
    }
}

export const TestActions = {
    startTest: (id: string, title: string, typeTest: string) => ({ type: "TEST_START", id, title, typeTest } as const),
    setTestPage: (TestPage: TestPageType) => ({ type: "TEST_SET_PAGES", TestPage } as const),
    clearAsk: () => ({ type: "TEST_CLEAR_PAGE", } as const),
}

export const TestActionsThunk = {
    startTest: (id: string, title: string, type: string): ThankType => {
        return async (dispatch) => {
            const data = await getAsk(id, type);//TestNormal  TestGlobal
            if (data) {
                dispatch(TestActions.startTest(id, title, type))
                dispatch(TestActions.setTestPage(data));
            }
        }
    },
    getAsk: (id: string, type: string): ThankType => {
      
        return async (dispatch) => {
            console.log("getAsk");
            const data = await getAsk(id, type);//TestNormal  TestGlobal
            
            dispatch(TestActions.setTestPage(data));
        }
    },
    breckTest: (id: string, type: string): ThankType => {
        return async (dispatch) => {
            await breckTest(id, type);
            dispatch(TestActions.clearAsk());
        }
    }
}

export default testReducer;