import {applyMiddleware, combineReducers, createStore} from "redux";
import authReducer from "./Auth-Reducer";
import thunk from 'redux-thunk';
import {QuestionReducer} from "./Question-Redux";
import {AdminReducer} from "./Admin-Reducer";
import {TestReducer} from "./Test-Reducer";
let reducer = combineReducers({
    authReducer,
    AdminReducer,
    QuestionReducer,
    TestReducer
});

type RootReduserType = typeof reducer;
export type AppStateType = ReturnType<RootReduserType>

type PropertiesTypes<T> = T extends {[key:string] : infer U}  ? U : never;

export type InfoActionsTpes<T extends {[key:string] : (...arg:any[])=>any} > = ReturnType<PropertiesTypes<T>>;


let store = createStore(reducer,applyMiddleware(thunk));
export default store;
