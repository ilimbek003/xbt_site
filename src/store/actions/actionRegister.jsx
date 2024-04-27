import axios from "axios";
import { url } from "../../api";

export const POST_RESPONSE = "POST_RESPONSE";

export const createPost = (postData) => async (dispatch) => {
  const response = await axios.post(url + "/auth/registration", postData);
  try {
    dispatch({
      type: "CREATE_POST",
      payload: response.data,
    });
  } catch {}
};

export const postResponse = (payload) => ({
  type: POST_RESPONSE,
  payload,
});
