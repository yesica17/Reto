import * as creators from "../creators/login";
import { GETData, SETData } from "../../services/WebServices";

export const setUser = (payload) => {
  return {
    type: creators.SET_LOGIN,
    payload,
  };
};

export const loadUser = () => {
  return async (dispatch, getState) => {
    await GETData(`user`, "GET")
      .then((response) => {
        if (response !== null) {
          dispatch(setUser(response));
          
        }
      })
      .catch((response) => console.error(response));
  };
};

export const loginUser = (payload) => {
  return async (dispatch, getState) => {
    await SETData(`user/login`, "POST", payload)
      .then((response) => {
        if (response !== null) {
          dispatch(setUser(response));
          localStorage.setItem('token', response.token);
          console.log(response)
        }
      })
      .catch((response) => console.error(response));
  };
};
