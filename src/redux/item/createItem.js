import axios from 'axios';
import linkURL from '../link';

const SET_CURRENT_ITEM = 'redux/store/getStoresReducer/SET_CURRENT_ITEM';
const SET_CURRENT_STEP = 'redux/store/getStoresReducer/SET_CURRENT_STEP';
const ADD_ITEM_COLORS = 'redux/store/getStoresReducer/ADD_ITEM_COLORS';
const ADD_ITEM_CAPACITIES = 'redux/store/getStoresReducer/ADD_ITEM_CAPACITIES';
const ADD_ITEM_SIZE = 'redux/store/getStoresReducer/ADD_ITEM_SIZE';
const ADD_ITEM_MATERIAL = 'redux/store/getStoresReducer/ADD_ITEM_MATERIAL';
const SET_ATTRIBUTE_STEP = 'redux/store/getStoresReducer/SET_ATTRIBUTE_STEP';
const RESET_CREATE_ITEM_DATA = 'redux/store/getStoresReducer/RESET_CREATE_ITEM_DATA';

const createItemReducer = (
  state = {
    item: {},
    step: 1,
    colors: null,
    sizes: null,
    capacities: null,
    materials: null,
    attributeStep: 1,
  },
  action,
) => {
  switch (action.type) {
    case SET_CURRENT_ITEM: {
      const item = action.data;
      const currentObj = {
        item,
        step: 2,
        attributeStep: 1,
      };
      localStorage.setItem('createdItem', JSON.stringify(currentObj));

      return currentObj;
    }
    case SET_ATTRIBUTE_STEP: {
      const currentObj = {
        item: state.item,
        step: 2,
        attributeStep: action.data,
      };
      localStorage.setItem('createdItem', JSON.stringify(currentObj));
      return currentObj;
    }
    case ADD_ITEM_COLORS: {
      const { item } = state;
      const currentObj = {
        item,
        step: 2,
        colors: action.data,
        attributeStep: state.attributeStep,
      };
      localStorage.setItem('createdItem', JSON.stringify(currentObj));
      return currentObj;
    } case ADD_ITEM_CAPACITIES: {
      const { item } = state;
      const currentObj = {
        item,
        step: 2,
        capacities: action.data,
        attributeStep: state.attributeStep,
      };
      localStorage.setItem('createdItem', JSON.stringify(currentObj));
      return currentObj;
    } case ADD_ITEM_SIZE: {
      const { item } = state;
      const currentObj = {
        item,
        step: 2,
        sizes: action.data,
        attributeStep: state.attributeStep,
      };
      localStorage.setItem('createdItem', JSON.stringify(currentObj));
      return currentObj;
    } case ADD_ITEM_MATERIAL: {
      const { item } = state;
      const currentObj = {
        item,
        step: 2,
        materials: action.data,
        attributeStep: state.attributeStep,
      };
      localStorage.setItem('createdItem', JSON.stringify(currentObj));
      return currentObj;
    } case SET_CURRENT_STEP: {
      const currentObj = {
        item: state.item,
        step: action.data,
        attributeStep: state.attributeStep,
      };
      localStorage.setItem('createdItem', JSON.stringify(currentObj));
      return currentObj;
    } case RESET_CREATE_ITEM_DATA: {
      const currentObj = {
        item: {},
        step: 1,
        colors: null,
        sizes: null,
        capacities: null,
        materials: null,
        attributeStep: 1,
      };
      localStorage.setItem('createdItem', JSON.stringify(currentObj));
      return currentObj;
    }
    default: {
      const savedObject = localStorage.getItem('createdItem');
      if (savedObject) {
        return JSON.parse(savedObject);
      }
      return state;
    }
  }
};

export const resetCreateStoreData = () => ({
  type: RESET_CREATE_ITEM_DATA,
});

export const setCurrentStep = (step) => ({
  type: SET_CURRENT_STEP,
  data: step,
});

export const setAttributeStep = (step) => ({
  type: SET_ATTRIBUTE_STEP,
  data: step,
});

export const setCurrentItem = (item) => {
  console.log(item);
  return ({
  type: SET_CURRENT_ITEM,
  data: item,
})};

export const uploadItemColor = (color, itemId, token) => (dispatch) => {
  axios.post(`${linkURL}/item/${itemId}/colors`, color).then((res) => {
    dispatch({
      type: ADD_ITEM_COLORS,
      data: res.data,
    });
  });
};

export const uploadItemCapacity = (size, itemId, token) => (dispatch) => {
  axios.post(`${linkURL}/item/${itemId}/capacity`, size).then((res) => {
    dispatch({
      type: ADD_ITEM_CAPACITIES,
      data: res.data,
    });
  });
};

export const uploadItemSize = (size, itemId, token) => (dispatch) => {
  axios.post(`${linkURL}/item/${itemId}/sizes`, size).then((res) => {
    dispatch({
      type: ADD_ITEM_SIZE,
      data: res.data,
    });
  });
};

export const uploadItemMaterial = (material, itemId, token) => (dispatch) => {
  axios.post(`${linkURL}/item/${itemId}/materials`, material).then((res) => {
    dispatch({
      type: ADD_ITEM_MATERIAL,
      data: res.data,
    });
  });
};

export default createItemReducer;
