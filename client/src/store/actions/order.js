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
    console.log(data);
    await SETData(`order`, "POST", data)
      .then((response) => {
        if (response !== null) {
          dispatch(setOrder(response));
        }
      })
      .catch((response) => console.error(response));
  };
};
