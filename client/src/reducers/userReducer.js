import {
  SIGN_UP,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP_ERROR,
  SIGN_IN_ERROR
} from "../actions/types";

const initialstate = {
  token: "",
  errorMessage: "",
  isAuthenticated: false
};

export default function (state = initialstate, action) {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        errorMessage: ""
      };
    case SIGN_UP_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };

    case SIGN_IN:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        errorMessage: ""
      };
    case SIGN_IN_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        isAuthenticated: false
      };
    case SIGN_OUT:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: false,
        errorMessage: "",
      }
    default:

      return state;
  }
}