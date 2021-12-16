import * as creators from "../creators/contact";

const initialState = {
  contact: null,
};

const contactReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case creators.SET_CONTACT:
      return { ...state, contact: payload };

    default:
      return state;
  }
};

export default contactReducer;
