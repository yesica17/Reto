import * as creators from "../creators/cart";
import { GETData, SETData } from "../../services/WebServices";

export const setCart = (payload) => {
  return {
    type: creators.SET_CART,
    payload,
  };
};

export const loadCart = () => {
  return async (dispatch, getState) => {
    const data = {
      user: { id: 4 },
      state_cart: true,
    };
    await SETData(`cart/load`, "POST", data)
      .then((response) => {
        if (response !== null) {
          dispatch(setCart(response));
        } else {
          console.log("es nula");
        }
      })
      .catch((response) => console.error(response));
  };
};
