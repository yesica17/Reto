import * as creators from "../creators/home";

const initialState = {
  products: [],
  productsDto: [],
};

const homeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case creators.SET_PRODUCTS:
      return { ...state, products: payload };

    case creators.SET_PRODUCTSDTO:
      return { ...state, productsDto: payload };

    default:
      return state;
  }
};

export default homeReducer;
