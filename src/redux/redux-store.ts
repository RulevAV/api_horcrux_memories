import {applyMiddleware, combineReducers, createStore} from "redux";
import authReducer from "./Auth-Reducer";
import thunk from 'redux-thunk';
let reducer = combineReducers({
    authReducer,
});
let store = createStore(reducer,applyMiddleware(thunk));
export default store;