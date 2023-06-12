import axios from 'axios';
import linkURL from '../link';

const CREATE_CART = 'redux/store/createCartsReducer/CREATE_CART';
const UPDATE_CART_QUANTITY = 'redux/store/createCartsReducer/UPDATE_CART_QUANTITY';
const DELETE_CART_ITEM = 'redux/store/createCartsReducer/DELETE_CART_ITEM';
const DELETE_CART_MESSAGE_RESPONSE = 'redux/store/createCartsReducer/DELETE_CART_MESSAGE_RESPONSE';

const createCartReducer = (state = { message: null }, action) => {
  switch (action.type) {
    case CREATE_CART: {
      return action.data;
    } case UPDATE_CART_QUANTITY: {
      return action.data;
    } case DELETE_CART_ITEM: {
      return action.data;
    }
    case DELETE_CART_MESSAGE_RESPONSE: {
      return { message: null };
    }
    default:
      return state;
  }
};

export const deleteCartItemResponse = () => ({
  type: DELETE_CART_MESSAGE_RESPONSE,
});

export const createNewCartItem = (data, token) => (dispatch) => {
  axios
    .post(`${linkURL}/cart/new`, data)
    .then((response) => {
      dispatch({
        type: CREATE_CART,
        data: response.data,
      });
    })
    .catch((_err) => {
      dispatch({
        type: CREATE_CART,
        data: {
          error: 'Error while creating cart-item!',
          message: null,
        },
      });
    });
};

export const deleteCartItem = (id, token) => (dispatch) => {
  axios
    .delete(`${linkURL}/cart/delete/${id}`)
    .then((response) => {
      dispatch({
        type: DELETE_CART_ITEM,
        data: response.data,
      });
    })
    .catch((_err) => {
      dispatch({
        type: DELETE_CART_ITEM,
        data: {
          error: 'Error while deleting cart-item!',
          message: null,
        },
      });
    });
};

export const updateCartItemQuantity = (data, token) => (dispatch) => {
  axios
    .post(`${linkURL}/cart/update/${data.cart_item_id}`, data)
    .then((response) => {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        data: response.data,
      });
    })
    .catch((_err) => {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        data: {
          error: 'Error while updating quantity!',
          message: null,
        },
      });
    });
};

export default createCartReducer;
