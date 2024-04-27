import { POST_LOGIN } from "../actions/actionLogin";
import {POST_LOGIN_SECURITY} from "../actions/actionLogin"

const initialState = {
  response: false,
  security: "2fa",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_LOGIN":
      return { ...state, response: action.payload };
    case POST_LOGIN:
      return { ...state, response: action.payload };
    case POST_LOGIN_SECURITY:
      return {...state,security : action.payload}
    default:
      return state;
  }
};

export default loginReducer;
