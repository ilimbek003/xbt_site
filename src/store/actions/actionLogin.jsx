import axios from "axios";
import {url} from "../../api";

export const POST_LOGIN_SECURITY = "POST_LOGIN_SECURITY";
export const POST_LOGIN = "POST_LOGIN";

export const loginAction = (codeData) => async (dispatch) => {
    const response = await axios.post(url + "/auth/login", codeData);
    // console.log(response)
    try {
        dispatch({
            type: "CREATE_LOGIN",
            payload: response.data,
        });
    } catch {
    }
};

export const postLogin = (payload) => ({
    type: POST_LOGIN,
    payload,
});
export const loginSecurity = (payload) => ({
    type: POST_LOGIN_SECURITY,
    payload,
});
