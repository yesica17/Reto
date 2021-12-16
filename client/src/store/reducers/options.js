import * as creators from "../creators/options";

const initialState = {
  typeDocument: [],
  colors: [],
  sizes: [],
};

const optionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case creators.SET_TYPE_DOCUMENT:
      return { ...state, typeDocument: payload };

    case creators.SET_COLOR:
      return { ...state, colors: payload };

    case creators.SET_SIZE:
      return { ...state, sizes: payload };

    default:
      return state;
  }
};

export default optionsReducer;
