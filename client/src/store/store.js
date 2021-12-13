import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

import homeReducer from "./reducers/home";
import optionsReducer from "./reducers/options";

const allReducers = combineReducers({
  home: homeReducer,
  options: optionsReducer,
});

const root = (state, action) => {
  return allReducers(state, action);
};

const store = createStore(root, composeWithDevTools(applyMiddleware(thunk)));

export default store;
