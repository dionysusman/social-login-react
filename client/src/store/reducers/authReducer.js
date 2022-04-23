import * as constants from '../types';
import { isEmpty } from '../../utils/functions';

const initialState = {
    users: [],
    user: {},
    isAuthenticated: false
}

function authReducer (state = initialState, action) {
    switch (action.type) {
        case constants.SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !isEmpty(action.payload)
            }
        default: 
            return state;
    }
}

export default authReducer;