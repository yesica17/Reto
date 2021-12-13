import * as creators from "../creators/options";

const initialState = {
  typeDocument: [],
  colors: [],
};

const optionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case creators.SET_TYPE_DOCUMENT:
      return { ...state, typeDocument: payload };

    default:
      return state;
  }
};

export default optionsReducer;
