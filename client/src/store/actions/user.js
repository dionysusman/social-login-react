import * as constants from '../types';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const signupUser = (formData, history) => dispatch => {
    axios.post('/api/users/signup', formData)
        .then(res => {
            if (res.data.success) {
                history.push('/');
            }
        })
        .catch(err => {
            dispatch({
                type: constants.GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/signin', userData)
        .then(res => {
            // Save to localStorage
            const { token } = res.data;
            // Set token to ls
            localStorage.setItem('jwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: constants.GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const setCurrentUser = decoded => {
    return {
        type: constants.SET_CURRENT_USER,
        payload: decoded
    };
};
