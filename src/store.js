import { createStore, applyMiddleware, combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import authReducer  from './reducers/auth'
import memoReducer from './reducers/memo'

const rootReducer = combineReducers({
    form,
    auth: authReducer,
    memo: memoReducer
})

export default createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)
