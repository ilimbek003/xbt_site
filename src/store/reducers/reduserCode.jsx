import {POST_CODE} from "../actions/actionCode";

const initialState = {
    response: false,
};

const codeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHECK_CODE":
            return {...state, response: action.payload}
        case POST_CODE:
            return {...state, response: action.payload}
        default:
            return state;
    }
};

export default codeReducer;
