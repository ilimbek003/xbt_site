import {POST_RESPONSE} from "../actions/actionRegister";

const initialState = {
    response: false,
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_POST":
            return {...state, response: action.payload};
        case POST_RESPONSE:
            return {...state, response: action.payload};
        default:
            return state;
    }
};

export default postReducer;
