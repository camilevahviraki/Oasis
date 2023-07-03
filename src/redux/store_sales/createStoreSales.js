import axios from 'axios';
import linkURL from '../link';

const CREATE_STORE_SALE = 'redux/store/createCartsReducer/CREATE_STORE_SALE';
const UPDATE_STORE_SALE_QUANTITY = 'redux/store/createCartsReducer/UPDATE_STORE_SALE_QUANTITY';
const DELETE_STORE_SALE_ITEM = 'redux/store/createCartsReducer/DELETE_STORE_SALE_ITEM';
const DELETE_STORE_SALE_MESSAGE_RESPONSE = 'redux/store/createCartsReducer/DELETE_STORE_SALE_MESSAGE_RESPONSE';

const createStoreSaleReducer = (state = { message: null }, action) => {
  switch (action.type) {
    case CREATE_STORE_SALE: {
      return action.data;
    } case UPDATE_STORE_SALE_QUANTITY: {
      return action.data;
    } case DELETE_STORE_SALE_ITEM: {
      return action.data;
    }
    case DELETE_STORE_SALE_MESSAGE_RESPONSE: {
      return { message: null };
    }
    default:
      return state;
  }
};

export const deleteStoreSaleResponse = () => ({
  type: DELETE_STORE_SALE_MESSAGE_RESPONSE,
});

export const createNewStoreSale = (data, token) => (dispatch) => {
  axios
    .post(`${linkURL}/store_sale/new`, data)
    .then((response) => {
      dispatch({
        type: CREATE_STORE_SALE,
        data: response.data,
      });
    })
    .catch((_err) => {
      dispatch({
        type: CREATE_STORE_SALE,
        data: {
          error: 'Error while creating store_sale-item!',
          message: null,
        },
      });
    });
};

export const deleteStoreSale = (id, token) => (dispatch) => {
  axios
    .delete(`${linkURL}/store_sale/delete/${id}`)
    .then((response) => {
      dispatch({
        type: DELETE_STORE_SALE_ITEM,
        data: response.data,
      });
    })
    .catch((_err) => {
      dispatch({
        type: DELETE_STORE_SALE_ITEM,
        data: {
          error: 'Error while deleting store_sale!',
          message: null,
        },
      });
    });
};

export const updateCartItemQuantity = (data, token) => (dispatch) => {
  axios
    .post(`${linkURL}/store_sale/update/${data.id}`, data)
    .then((response) => {
      dispatch({
        type: UPDATE_STORE_SALE_QUANTITY,
        data: response.data,
      });
    })
    .catch((_err) => {
      dispatch({
        type: UPDATE_STORE_SALE_QUANTITY,
        data: {
          error: 'Error while updating quantity!',
          message: null,
        },
      });
    });
};

export default createStoreSaleReducer;
