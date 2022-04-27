import {applyMiddleware, combineReducers, createStore,Action} from "redux";
import thunk, {ThunkAction} from 'redux-thunk';
import authReducer from "./Auth/Auth-Reducer";
import { questionPageReducer } from "./QuestionPage/QuestionPage-Redux";
import redactReducer from "./Redact/redact-Reducer";
import { testReducer } from "./Test/Test-Reducer";
export let reducer = combineReducers({
    authReducer,
    questionPageReducer,
    testReducer,
    redactReducer
});
type RootReduserType = typeof reducer;
export type AppStateType = ReturnType<RootReduserType>
export type ThunkActionType<A extends Action ,R> =ThunkAction<R, AppStateType, unknown, A>;

export type InfoActionsTypes<T> = T extends {[key:string] : (...args:any[])=>infer U} ? U : never;

let store = createStore(reducer,applyMiddleware(thunk));
export default store;
