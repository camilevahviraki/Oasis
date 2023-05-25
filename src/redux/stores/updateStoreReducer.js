import axios from 'axios';
import linkURL from '../link';
import Upload from '../upload';

const UPDATE_STORE = 'redux/store/getStoreShowReducer/UPDATE_STORE';
const SET_FIELD = 'redux/store/getStoreShowReducer/SET_FIELD';
const DELETE_CATEGORY = 'redux/store/getStoreShowReducer/DELETE_CATEGORY';
const ADD_NEW_CATEGORY = 'redux/store/getStoreShowReducer/ADD_NEW_CATEGORY';
const RESET_FIELD_RESPONSE = 'redux/store/getStoreShowReducer/RESET_FIELD_RESPONSE';
const DELETE_STORE_IMAGE = 'redux/store/getStoreShowReducer/DELETE_STORE_IMAGE';
const UPDATE_STORE_PLACE = '/redux/UPDATE_STORE_PLACE';

const updateStoreReducer = (state = {
  field: null,
  response: null,
  fieldValue: null,
}, action) => {
  switch (action.type) {
    case SET_FIELD: {
      const newState = {
        field: action.field,
        fieldValue: action.fieldValue,
        response: null,
      };
      saveToStorage(newState);
      return newState;
    } case UPDATE_STORE: {
      const newState = {
        field: state.field,
        fieldValue: state.fieldValue,
        response: action.data,
      };
      saveToStorage(newState);
      return newState;
    } case DELETE_CATEGORY: {
      const newState = {
        field: state.field,
        fieldValue: state.fieldValue,
        response: action.data,
      };
      saveToStorage(newState);
      return newState;
    } case DELETE_STORE_IMAGE: {
      console.log(action.data);
      const newState = {
        field: state.field,
        fieldValue: state.fieldValue,
        response: action.data,
      };
      saveToStorage(newState);
      return newState;
    } case ADD_NEW_CATEGORY: {
      const newState = {
        field: state.field,
        fieldValue: state.fieldValue,
        response: action.data,
      };
      saveToStorage(newState);
      return newState;
    } case UPDATE_STORE_PLACE: {
      const newState = {
        field: state.field,
        fieldValue: state.fieldValue,
        response: action.data,
      };
      saveToStorage(newState);
      return newState;
    }
    case RESET_FIELD_RESPONSE: {
      const newState = {
        field: state.field,
        fieldValue: state.fieldValue,
        response: null,
      };
      saveToStorage(newState);
      return newState;
    } default: {
      const defaultData = localStorage.getItem('update-store-data');
      if (defaultData) {
        return JSON.parse(defaultData);
      }
      return state;
    }
  }
};

const saveToStorage = (data) => {
  localStorage.setItem('update-store-data', JSON.stringify(data));
};

export const updateStorePlaces = (places, token) => (dispatch) => {
  Upload({ data: places, endPoint: 'api_stores', dispatchResponse: (data) => dispatch(getStoreId(data), token) });
  dispatch({
    type: UPDATE_STORE_PLACE,
    data: 'Updated coordinates',
  });
};

export const resetStoreFieldToUpdate = () => ({
  type: RESET_FIELD_RESPONSE,
});

export const setStoreFieldToUpdate = (field, fieldValue) => ({
  type: SET_FIELD,
  field,
  fieldValue,
});

export const deleteStoreCategory = (id) => (dispatch) => {
  axios.delete(`${linkURL}/stores_category/${id}`)
    .then((response) => dispatch(
      {
        type: DELETE_CATEGORY,
        data: response.data,
      },
    ));
};

export const deleteStoreImage = (id) => (dispatch) => {
  axios.delete(`${linkURL}/store_image/${id}`)
    .then((response) => dispatch(
      {
        type: DELETE_STORE_IMAGE,
        data: response.data,
      },
    ));
};

export const addNewStoreCategory = (category, store_id) => (dispatch) => {
  axios.post(`${linkURL}/stores_categories`, { category, store_id })
    .then((response) => dispatch(
      {
        type: ADD_NEW_CATEGORY,
        data: response.data,
      },
    ));
};

export const updateStore = (data, token) => (dispatch) => {
  axios.post(`${linkURL}/store/update`, data,
    {
      headers: {
      // Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => dispatch(
      {
        type: UPDATE_STORE,
        data: response.data,
      },
    ));
};

export default updateStoreReducer;
