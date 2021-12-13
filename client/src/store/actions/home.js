import * as creators from "../creators/home";
import { GETData, SETData } from "../../services/WebServices";

export const setProducts = (payload) => {
  return {
    type: creators.SET_PRODUCTS,
    payload,
  };
};

export const loadProducts = () => {
  return async (dispatch, getState) => {
    await GETData(`product`, "GET")
      .then((response) => {
        if (response !== null) {
          dispatch(setProducts(response));
        }
      })
      .catch((response) => console.error(response));
  };
};
