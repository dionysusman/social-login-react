import * as constants from '../types';

const initialState = {};

function errorReducer(state = initialState, action) {
    switch (action.type) {
        case constants.GET_ERRORS:
            return action.payload;
        default:
            return state;
    }

}

export default errorReducer;