import { combineReducers, compose, legacy_createStore as createStore } from 'redux'
import { stayReducer } from './reducers/stay.reducer'
import { userReducer } from './reducers/user.reducer'
import { appReducer } from './reducers/app.reducer'
import { orderReducer } from './reducers/order.reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    stayModule: stayReducer,
    userModule: userReducer,
    appModule: appReducer,
    orderModule:orderReducer,
})

export const store = createStore(rootReducer, composeEnhancers())

// Dev only!
window.gStore = store