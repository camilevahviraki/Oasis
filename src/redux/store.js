import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from './logger/logger';
import logger from './logger/thunk';
import createStoresReducer from './stores/createStoreReducer';
import getStoresReducer from './stores/getStoresReducer';
import authenticationReducer from './authentication/signUpReducer';
import storeLinkReducer from './storeLink/storeLinkReducer';
import getStoreShowReducer from './stores/getStoreShowReducer';

const rootReducer = combineReducers({
  createStoresReducer,
  getStoresReducer,
  authenticationReducer,
  storeLinkReducer,
  getStoreShowReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(logger, thunk),
);

export default store;
