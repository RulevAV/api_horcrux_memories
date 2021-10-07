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
let store = createStore(reducer,applyMiddleware(thunk));
export default store;