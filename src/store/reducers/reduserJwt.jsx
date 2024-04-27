const initialState = {
  tokens: null,
};

const reducerJwToken = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        tokens: action.payload,
      };
    default:
      return state;
  }
};

export default reducerJwToken;
