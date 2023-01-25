import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from './logger/logger';
import logger from './logger/thunk';
import createStoresReducer from './stores/createStoreReducer';
import getStoresReducer from './stores/getStoresReducer';

const rootReducer = combineReducers({
  createStoresReducer,
  getStoresReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(logger, thunk),
);

export default store;
