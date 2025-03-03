import {compose, createStore, applyMiddleware} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
import {thunk} from 'redux-thunk'
import {rootReducer} from './root-reducer'

//middleware - are library helper that run before an action hits reducers




  const persistConfig = {
    key : 'root',
    storage : storage,
    whiteList : ['cart']
  }

  const persistedReducer = persistReducer(persistConfig,rootReducer)

  //logger - middleware activates only in development and if false, it filters the boolean value to avoid error
const middleWares = [process.env.NODE_ENV !=='production' && logger, thunk].filter(Boolean)

const composeEnhancer = (process.env.NODE_ENV !=='production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composedEnhancers)

export const persistor = persistStore(store)