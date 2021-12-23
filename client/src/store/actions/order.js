import * as creators from "../creators/order";
import { GETData, SETData } from "../../services/WebServices";

export const setOrder = (payload) => {
  return {
    type: creators.SET_ORDER,
    payload,
  };
};

export const createOrder = () => {
  return async (dispatch, getState) => {
    const data = {
      contact: { id: 4 },
      amount: 100,
    };
    await SETData(`order`, "POST", data)
      .then((response) => {
        if (response !== null) {
          dispatch(setOrder(response));
        }
      })
      .catch((response) => console.error(response));
  };
};

export const updateStock = (payload) => {
  return async (dispatch, getState) => {
    const data = {
      state_cart: false,
    };
    await SETData(`cart/${payload}`, "PUT", data)
      .then((response) => {
        if (response !== null) {
          console.log(response);
        }
      })
      .catch((response) => console.error(response));
  };
};
