import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

import homeReducer from "./reducers/home";
import optionsReducer from "./reducers/options";
import productReducer from "./reducers/product";
import loginReducer from "./reducers/login";
import cartReducer from "./reducers/cart";
import contactReducer from "./reducers/contact";
import orderReducer from "./reducers/order";

const allReducers = combineReducers({
  home: homeReducer,
  options: optionsReducer,
  product: productReducer,
  login: loginReducer,
  cart: cartReducer,
  contact: contactReducer,
  order: orderReducer,
});

const root = (state, action) => {
  return allReducers(state, action);
};

const store = createStore(root, composeWithDevTools(applyMiddleware(thunk)));

export default store;
