import { applyMiddleware, combineReducers, createStore } from "redux"
import { thunk } from "redux-thunk";
import productReducer from "./Products";

const reducer = combineReducers({
    productsList: productReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;