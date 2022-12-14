import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from './logger/logger';
import logger from './logger/thunk';
import createStoresReducer from './stores/createStoreReducer';

const rootReducer = combineReducers({
  createStoresReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(logger, thunk),
);

export default store;
