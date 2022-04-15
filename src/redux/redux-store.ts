import {applyMiddleware, combineReducers, createStore,Action} from "redux";
import thunk, {ThunkAction} from 'redux-thunk';
import {TestReducer} from "./Test-Reducer";
import authReducer from "./Auth/Auth-Reducer";
import { QuestionReducer } from "./Question/Question-Redux";
export let reducer = combineReducers({
    authReducer,
    QuestionReducer,
    TestReducer
});
type RootReduserType = typeof reducer;
export type AppStateType = ReturnType<RootReduserType>
export type ThunkActionType<A extends Action ,R> =ThunkAction<R, AppStateType, unknown, A>;

export type InfoActionsTypes<T> = T extends {[key:string] : (...args:any[])=>infer U} ? U : never;

let store = createStore(reducer,applyMiddleware(thunk));
export default store;
