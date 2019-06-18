// TODO: Mettere camelCase anche questo file

import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";

import history from "./history";
import user from "./reducers/userReducer";
import game from "./reducers/gameReducer";
import { checkSelfLogin } from "./actions/userActions";

import { InitEmptyLSIfNeeded } from "../ls";
InitEmptyLSIfNeeded()

const initialState = {

};

const reducers = combineReducers({
  user,
  game,
  router: connectRouter(history)
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(thunkMiddleware, routerMiddleware(history)))
);

store.dispatch(checkSelfLogin());

export default store;
