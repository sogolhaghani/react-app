import { handleResponse } from '../common/actions.utils'
export const LOAD_MESSAGES = 'SIGNIN_LOAD_MESSAGES';
export const INPUT_CHANGED = 'SIGNIN_INPUT_CHANGED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const REQUIRED_VALIDATION = 'SIGNIN_REQUIRED_VALIDATION'

export const loadMessages = () => {
    return {
        type: LOAD_MESSAGES
    }
};

export const inputChangeHandler = (value, property) => {
    return {
        type: INPUT_CHANGED, property, value
    }
}

export const submitHandler = () => {
    return (dispatch, getState) => {
        if (!validateUserPass(getState().authentication.login))
            return;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: getState().authentication.login.email, password: getState().authentication.login.password })
        };

        return fetch('http://localhost:8080/api/authenticate', requestOptions)
            .then(handleResponse)
            .then(token => {
                localStorage.setItem('token', token.id_token);
                dispatch(loginSuccess(token))
            })


    }
}

export const requiredValidation = (field) => {
    return {
        type: REQUIRED_VALIDATION, field
    }
};


function validateUserPass(login) {
    return (dispatch, getState) => {
        dispatch(requiredValidation('email'));
        dispatch(requiredValidation('password'));
        if (getState().authentication.validation.length > 0)
            return false;
        return true;
    }

};

function loginSuccess(token) {
    return {
        type: LOGIN_SUCCESS, token
    }
}