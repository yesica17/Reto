import * as creators from "../creators/login";

const initialState = {
  user: null,
};

const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case creators.SET_LOGIN:
      return { ...state, user: payload };

    default:
      return state;
  }
};

export default loginReducer;
