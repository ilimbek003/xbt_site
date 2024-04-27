import { POST_FORGOT } from "../actions/forgotAction";

const initialState = {
  responseForgot: false,
};

const postForgot = (state = initialState, action) => {
  switch (action.type) {
    case "FORGOT":
      return { ...state, responseForgot: action.payload };
    case POST_FORGOT:
      return { ...state, responseForgot: action.payload };
    default:
      return state;
  }
};

export default postForgot;
