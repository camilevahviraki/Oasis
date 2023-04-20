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
import getStoreCategories from './stores/getStoreCategories';
import getStoreImagesReducer from './stores/getStoreImagesReducer';
import colorReducer from './attributes/colorReducer';
import capacityReducer from './attributes/capacityReducer';
import sizeReducer from './attributes/sizeReducer';
import materialReducer from './attributes/materialReducer';
import createItemReducer from './item/createItem';
import itemAttributeReducer from './item_attributes/itemAttributesReducer';
import createItemAttributes from './item/createItemAttributes';
import createCartReducer from './cart/createCartReducer';

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
  getStoreCategories,
  getStoreImagesReducer,
  colorReducer,
  capacityReducer,
  sizeReducer,
  materialReducer,
  createItemReducer,
  itemAttributeReducer,
  createItemAttributes,
  createCartReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(logger, thunk),
);

export default store;
