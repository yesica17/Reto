import * as creators from "../creators/login";
import jwt_decode from "jwt-decode";

const token= localStorage.getItem("token");

let initialState;

if(token){
    initialState = {    
        user: jwt_decode(localStorage.getItem("token")).user  
    };
}
else{
    initialState = {    
        user: null
    };
}



const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case creators.SET_LOGIN:
      return { ...state, user: payload };

    default:
      return state;
  }
};

export default loginReducer;
