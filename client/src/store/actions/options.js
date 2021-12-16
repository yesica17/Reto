import * as creators from "../creators/options";
import { GETData, SETData } from "../../services/WebServices";

export const setTypeDocument = (payload) => {
  return {
    type: creators.SET_TYPE_DOCUMENT,
    payload,
  };
};

export const loadTypeDocument = () => {
  return async (dispatch, getState) => {
    await GETData(`user/document`, "GET")
      .then((response) => {
        if (response !== null) {
          dispatch(setTypeDocument(response));
        }
      })
      .catch((response) => console.error(response));
  };
};

export const createUser = (payload) => {
  return async (dispatch, getState) => {
    await SETData(`user`, "POST", payload)
      .then((response) => {
        if (response !== null) {
          console.log(response);
        }
      })
      .catch((response) => console.error(response));
  };
};

export const setColor = (payload) => {
  return {
    type: creators.SET_COLOR,
    payload,
  };
};

export const loadColor = () => {
  return async (dispatch, getState) => {
    await GETData(`stock/color`, "GET")
      .then((response) => {
        if (response !== null) {
          dispatch(setColor(response));
        }
      })
      .catch((response) => console.error(response));
  };
};

export const setSize = (payload) => {
  return {
    type: creators.SET_SIZE,
    payload,
  };
};

export const loadSize = () => {
  return async (dispatch, getState) => {
    await GETData(`stock/size`, "GET")
      .then((response) => {
        if (response !== null) {
          dispatch(setSize(response));
        }
      })
      .catch((response) => console.error(response));
  };
};
