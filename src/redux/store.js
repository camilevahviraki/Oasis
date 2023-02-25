import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from './logger/logger';
import logger from './logger/thunk';
import createStoresReducer from './stores/createStoreReducer';
import getStoresReducer from './stores/getStoresReducer';
import authenticationReducer from './authentication/signUpReducer';
import storeLinkReducer from './storeLink/storeLinkReducer';
import getStoreShowReducer from './stores/getStoreShowReducer';
import currenciesReducer from './currencies/currenciesReducer'; 
import storeCategoriesReducer from './stores_categories/stores_categories_reducer';
import getItemsList from './item/getItem';
import countriesReducer from './countries/countriesReducer';
import itemLinkReducer from './itemLink/itemLinkreducer';
import getItemDetails from './item/itemShow';
import homeReducer from './home/homeReducer';
import updateStoreReducer from './stores/updateStoreReducer';

const rootReducer = combineReducers({
  createStoresReducer,
  getStoresReducer,
  authenticationReducer,
  storeLinkReducer,
  getStoreShowReducer,
  currenciesReducer,
  storeCategoriesReducer,
  getItemsList,
  countriesReducer,
  itemLinkReducer,
  getItemDetails,
  homeReducer,
  updateStoreReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(logger, thunk),
);

export default store;
