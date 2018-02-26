import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import './styles/css/styles.css'

import { AUTH_USER } from './actions/types'
const token = localStorage.getItem('token')
if (token) {
    store.dispatch({ type: AUTH_USER })
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
