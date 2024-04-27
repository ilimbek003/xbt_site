import axios from "axios";
import { url } from "../../api";

export const POST_CODE = "POST_CODE";
export const codeAction = (codeData) => async (dispatch) => {
  try {
    const response = await axios.post(url + "/auth/activation", codeData);
    dispatch({
      type: "CHECK_CODE",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "CHECK_CODE",
      payload: error,
    });
  }
};

export const postResponse = (payload) => ({
  type: POST_CODE,
  payload,
});
