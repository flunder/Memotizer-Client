import { createStore, applyMiddleware, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as form } from 'redux-form'
import thunk from 'redux-thunk'

import authReducer  from './reducers/auth'
import memoReducer from './reducers/memo'

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    form,
    auth: authReducer,
    memo: memoReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persistedReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store;
export const persistor = persistStore(store);
