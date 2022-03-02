import * as creators from "../creators/order";

const initialState = {
  order: null,
};

const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case creators.SET_ORDER:
      return { ...state, order: payload };

    default:
      return state;
  }
};

export default orderReducer;
