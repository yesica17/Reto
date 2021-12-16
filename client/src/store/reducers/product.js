import * as creators from "../creators/product";

const initialState = {
  product: null,
};

const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case creators.SET_DETAIL_PRODUCT:
      return { ...state, product: payload };

    default:
      return state;
  }
};

export default productReducer;
