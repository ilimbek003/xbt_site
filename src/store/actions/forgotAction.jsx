import axios from "axios";
import { url } from "../../api";

export const POST_FORGOT = "POST_RESPONSE";

export const forgot = (codeData) => async (dispatch) => {
  const response = await axios.post(url + "/auth/forgot", codeData);
  try {
    dispatch({
      type: "FORGOT",
      payload: response.data,
    });
  } catch (error) {
    alert(error);
  }
};

export const postResponse = (payload) => ({
  type: POST_FORGOT,
  payload,
});
