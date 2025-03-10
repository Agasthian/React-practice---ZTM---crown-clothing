import {compose, createStore, applyMiddleware} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
// import {thunk} from 'redux-thunk'
import createSagaMiddleware from 'redux-saga' // if we are using redux-saga we comment out redux-thunk. can use only one at a time

import {rootReducer} from './root-reducer'
import {rootSaga} from './root-saga' //Saga middleware -setup


//middleware - are library helper that run before an action hits reducers

  const persistConfig = {
    key : 'root',
    storage : storage,
    whiteList : ['cart']
  }

  const sagaMiddleware = createSagaMiddleware() //Saga middleware -setup

  const persistedReducer = persistReducer(persistConfig,rootReducer)

  //logger - middleware activates only in development and if false, it filters the boolean value to avoid error
const middleWares = [
    process.env.NODE_ENV !=='production' && logger, 
    // thunk
    sagaMiddleware
  ].filter(Boolean)

const composeEnhancer = (process.env.NODE_ENV !=='production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composedEnhancers)

sagaMiddleware.run(rootSaga) //Saga middleware -setup - this should come after store so that it works

export const persistor = persistStore(store)