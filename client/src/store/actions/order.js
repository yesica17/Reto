import * as creators from "../creators/order";
import { GETData, SETData } from "../../services/WebServices";
import { Alert } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

export const setOrder = (payload) => {
  return {
    type: creators.SET_ORDER,
    payload,
  };
};

export const createOrder = () => {
  return async (dispatch, getState) => {
    const data = {
      user: { id: 4 }      
    };
    await SETData(`order`, "POST", data)
      .then((response) => {
        if (response !== null) {
          dispatch(setOrder(response));
          Alert.success("Su pedido se ha creado exitosamente!")
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

export const sendEmail = (payload) => {
  return async (dispatch, getState) => {
    const data = {
        user: payload.user,
        order: 1223,
        address: "carrera 16 a # 12- 04",
        amount: payload.amount,
        products: payload.products    
    };
    await SETData(`cart/email`, "POST", data)
      .then((response) => {
        if (response !== null) {
          
        }else{console.log("Send email")}
      })
      .catch((response) => console.error(response));
  };
};