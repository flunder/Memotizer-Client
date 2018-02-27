import axios from 'axios'
import { UNAUTH_USER, AUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types'
const ROOT_URL = process.env.REACT_APP_API_URL;

export function signinUser({email, password}) {

    return function (dispatch) {

        // submit email and password to server
        const request = axios.post(`${ROOT_URL}/signin`, {email, password})
        request
            .then(response => {
                // -Save the JWT token
                localStorage.setItem('token', response.data.token)

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

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function fetchMessage() {
    return function (dispatch) {
        axios.get(ROOT_URL, {
            headers: {authorization: localStorage.getItem('token')}
        })
        .then(response => {
            dispatch({
                type: FETCH_MESSAGE,
                payload: response.data.message
            })
        })
    }
}

export function addBook() {
    return function (dispatch) {

        var book = {
            isbn: '111',
            title: '222',
            author: '333',
            publisher: '444'
        };

        axios.post(`${ROOT_URL}/book`, book, {
            headers: { authorization: localStorage.getItem('token') },
        })
        .then(response => {
            console.log(response);
        })
    }
}

export function getBooks() {
    return function (dispatch) {
        axios.get(`${ROOT_URL}/books`, {
            headers: { authorization: localStorage.getItem('token') },
        })
        .then(response => {
            console.log(response);
        })
    }
}
