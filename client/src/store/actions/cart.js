import * as creators from "../creators/cart";
import { GETData, SETData } from "../../services/WebServices";

import { Alert } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

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

export const deleteCart = (payload) => {
  return async (dispatch, getState) => {
    await SETData(`cart/${payload}`, "DELETE")
      .then((response) => {
        if (response !== null) {
          console.log(response);
        }
      })
      .catch((response) => console.error(response));
  };
};

export const updateCart = (payload) => {
  return async (dispatch, getState) => {
    const data = {
      req_quantity: payload.req_quantity,
      state_cart: payload.state_cart
    };
    await SETData(`cart/quantity/${payload.id}`, "PUT", data)
      .then((response) => {
        if (response !== null) {
          console.log(response);
          Alert.success("Se ha actualizado la cantidad requerida")
        }
      })
      .catch((response) => console.error(response));
  };
};


