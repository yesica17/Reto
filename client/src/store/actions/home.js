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

export const setProductsDto = (payload) => {
  return {
    type: creators.SET_PRODUCTSDTO,
    payload,
  };
};

export const loadProductsDto = () => {
  return async (dispatch, getState) => {
    await GETData(`product/dto`, "GET")
      .then((response) => {
        if (response !== null) {
          dispatch(setProductsDto(response));
        }
      })
      .catch((response) => console.error(response));
  };
};
