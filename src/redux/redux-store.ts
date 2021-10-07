import {applyMiddleware, combineReducers, createStore} from "redux";
import authReducer from "./Auth-Reducer";
import thunk from 'redux-thunk';
import {QuestionReducer} from "./Question-Redux";
import {AdminReducer} from "./Admin-Reducer";
let reducer = combineReducers({
    authReducer,
    AdminReducer,
    QuestionReducer,
});
let store = createStore(reducer,applyMiddleware(thunk));
export default store;