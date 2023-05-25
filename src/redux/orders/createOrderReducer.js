import axios from 'axios';
import linkURL from '../link';

const CREATE_ORDER = 'redux/store/createOrderReducer/CREATE_ORDER';
const ADD_ORDER_DESTINATION = 'redux/store/createOrderReducer/ADD_ORDER_DESTINATION';
const UPDATE_ORDER_QUANTITY = 'redux/store/createOrderReducer/UPDATE_ORDER_QUANTITY';
const DELETE_ORDER_ITEM = 'redux/store/createOrderReducer/DELETE_ORDER_ITEM';
const SET_CREATE_ORDER_STEP = 'redux/store/createOrderReducer/SET_CREATE_ORDER_STEP';
const DELETE_ORDER_MESSAGE_RESPONSE = 'redux/store/createCartsReducer/DELETE_ORDER_MESSAGE_RESPONSE';

const createOrderReducer = (state = { message: null, step: 1 }, action) => {
  switch (action.type) {
    case CREATE_ORDER: {
      return action.data;
    } case UPDATE_ORDER_QUANTITY: {
      return action.data;
    } case ADD_ORDER_DESTINATION: {
      return action.data;
    }
    case DELETE_ORDER_ITEM: {
      return action.data;
    }
    case DELETE_ORDER_MESSAGE_RESPONSE: {
      return { message: null };
    }
    case SET_CREATE_ORDER_STEP: {
      return { ...state, step: action.step };
    }
    default:
      return state;
  }
};

export const setCreateOrderStep = (step) => ({
  type: SET_CREATE_ORDER_STEP,
  step,
});

export const deleteOrderItemResponse = () => ({
  type: DELETE_ORDER_MESSAGE_RESPONSE,
});

export const createNewOrderItem = (data, token) => (dispatch) => {
  axios
    .post(`${linkURL}/orders/new`, data)
    .then((response) => {
      dispatch({
        type: CREATE_ORDER,
        data: response.data,
      });
    })
    .catch((_err) => {
      dispatch({
        type: CREATE_ORDER,
        data: {
          error: 'Error while creating cart-item!',
          message: null,
        },
      });
    });
};

export const addOrderDestination = (data, token) => (dispatch) => {
  axios
    .post(`${linkURL}/orders/${data.token_id}/destination`, data)
    .then((response) => {
      dispatch({
        type: ADD_ORDER_DESTINATION,
        data: response.data,
      });
    })
    .catch((_err) => {
      dispatch({
        type: ADD_ORDER_DESTINATION,
        data: {
          message: 'Error addind destination!',
          step: 1,
        },
      });
    });
};

export const deleteOrder = (id, token) => (dispatch) => {
  axios
    .delete(`${linkURL}/cart/delete/${id}`)
    .then((response) => {
      dispatch({
        type: DELETE_ORDER_ITEM,
        data: response.data,
      });
    })
    .catch((_err) => {
      dispatch({
        type: DELETE_ORDER_ITEM,
        data: {
          error: 'Error while deleting cart-item!',
          message: null,
        },
      });
    });
};

export default createOrderReducer;
