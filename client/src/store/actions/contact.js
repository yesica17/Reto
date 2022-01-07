import * as creators from "../creators/contact";
import { GETData, SETData } from "../../services/WebServices";

export const setContact = (payload) => {
  return {
    type: creators.SET_CONTACT,
    payload,
  };
};

export const createContact = (payload) => {
  return async (dispatch, getState) => {
    const data = {
      users: { id: 4 },
      state: payload.state,
      city: payload.city,
      adress: payload.adress,
    };
    console.log(data);
    await SETData(`contact`, "POST", data)
      .then((response) => {
        if (response !== null) {
          dispatch(setContact(response));
        }
      })
      .catch((response) => console.error(response));
  };
};

export const updateAmount = (payload) => {
  return async (dispatch, getState) => {
    const data = {      
      state_cart: true
    };
    console.log("payload", payload)
    await SETData(`cart/amount/${payload}`, "PUT", data)
      .then((response) => {
        if (response !== null) {
          console.log(response);
        }
      })
      .catch((response) => console.error(response));
  };
};
