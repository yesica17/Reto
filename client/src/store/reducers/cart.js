import * as creators from "../creators/cart";

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case creators.SET_CART:
      return { ...state, cart: payload };

    default:
      return state;
  }
};

export default cartReducer;
