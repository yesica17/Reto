import * as creators from "../creators/options";

const initialState = {
  typeDocument: [],
  colors: [],
  sizes: [],
  brands:[],
  styles: [],
};

const optionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case creators.SET_TYPE_DOCUMENT:
      return { ...state, typeDocument: payload };

    case creators.SET_COLOR:
      return { ...state, colors: payload };

    case creators.SET_SIZE:
      return { ...state, sizes: payload };

    case creators.SET_BRAND:
      return { ...state, brands: payload };
    
    case creators.SET_STYLE:
      return { ...state, styles: payload };

    default:
      return state;
  }
};

export default optionsReducer;
