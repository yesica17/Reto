import * as creators from "../creators/product";
import { GETData, SETData } from "../../services/WebServices";

import { Alert } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

export const setProduct = (payload) => {
  return {
    type: creators.SET_DETAIL_PRODUCT,
    payload,
  };
};

export const loadProduct = (payload) => {
  return async (dispatch, getState) => {
    await GETData(`product/${payload}`, "GET")
      .then((response) => {
        if (response !== null) {
          dispatch(setProduct(response));
          
        }
      })
      .catch((response) => console.error(response));
  };
};

export const createCart = (payload) => {
  return async (dispatch, getState) => {
    const stock = {
      user: { id: 4 },
      product: { id: getState().product.product.id },
      order: { id: "" },
      req_quantity: payload.req_quantity,
      state_cart: payload.state_cart,
      size: payload.size,
      color: payload.color,
    };
   
    await SETData(`cart`, "POST", stock)
      .then((response) => {
        if (response !== null) {          
          console.log(response);
          if(response==true){
            Alert.error("El producto ya fue agregado")
          }else{Alert.success("El producto ha sido agregado al carrito")}
        } 
      })
      .catch((response) => console.error(response));
  };
};

export const updateViews = (payload) => {
  return async (dispatch, getState) => {
    const data = {
      views: payload.views,      
    };
    await SETData(`product/${payload.id}`, "PUT", data)
      .then((response) => {
        if (response !== null) {
          console.log(response);          
        }
      })
      .catch((response) => console.error(response));
  };
};
