import * as creators from "../creators/product";

const initialState = {
  product: null,
  stockDto: [],
};

const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case creators.SET_DETAIL_PRODUCT:
      return { ...state, product: payload };

    case creators.SET_STOCKDTO:
      return { ...state, stockDto: payload };

    default:
      return state;
  }
};

export default productReducer;
