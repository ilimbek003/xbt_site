import { combineReducers } from "redux";
import postReducer from "./reduserRegister";
import codeReducer from "./reduserCode";
import loginReducer from "./reducerLogin";
import reducerJwToken from "./reduserJwt";
import postForgot from "./reducersForgot";

export const rootReducer = combineReducers({
    post: postReducer,
    coding: codeReducer,
    login: loginReducer,
    forgot: postForgot,
    jwtToken: reducerJwToken,
})