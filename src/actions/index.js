import axios from 'axios'
import { UNAUTH_USER, AUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types'
const ROOT_URL = process.env.REACT_APP_API_URL;

export function signinUser({email, password}) {

    return function (dispatch) {

        // Submit email and password to server
        const request = axios.post(`${ROOT_URL}/signin`, {email, password})

        console.log('sending', email, password);

        request
            .then(response => {
                console.log(response);
                // -Save the JWT token
                localStorage.setItem('token', response.data.token)
                console.log('yo');
                // -if request is good, we need to update state to indicate user is authenticated
                dispatch({type: AUTH_USER})
            })

            // If request is bad...
            // -Show an error to the user
            .catch(() => {
                dispatch(authError('bad login info'))
            })

    }
}

export function signoutUser() {
    localStorage.removeItem('token')
    return {
        type: UNAUTH_USER
    }
}

export function signupUser({email, password, passwordConfirmation}) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/signup`, {email, password, passwordConfirmation})
            .then(response => {
                dispatch({type: AUTH_USER})
                localStorage.setItem('token', response.data.token)
            })
            .catch(({response}) => {
                dispatch(authError(response.data.error))
            })
    }
}

export function resetPassword({email, password, resetToken}) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/resetPassword`, {email, password, resetToken})
            .then(response => {
                dispatch({type: AUTH_USER})
                localStorage.setItem('token', response.data.token)
            })
            .catch(({response}) => {
                dispatch(authError(response.data.error))
            })
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function apiRequestResetPassword(email) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/requestResetPassword`, {email})
            .then(res => {
                console.log(res);
            })
    }
}
