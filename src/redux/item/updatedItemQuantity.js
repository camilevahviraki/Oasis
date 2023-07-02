import axios from 'axios';
import linkURL from '../link';

const UPDATE_ITEM_RESPONSE = 'redux/store/getStoresReducer/UPDATE_ITEM_RESPONSE';
const DELETE_RESPONSE = 'redux/store/getStoresReducer/DELETE_RESPONSE';

const updateItemQuantity = (state = {message: null }, action) => {
  switch (action.type) {
    case UPDATE_ITEM_RESPONSE: {
      return action.data;
    }
    case DELETE_RESPONSE: {
      return {message: null }
    }
    default:
      return state;
  }
};

export const deleteQuantityResponse = () => ({
  type: DELETE_RESPONSE,
});

export const updateQuantity = (data, token) => (dispatch) => {
  const { item_id, quantity } = data;
  axios
    .post(`${linkURL}/api_stores/:store_id/item/${item_id}/update_quantity`, data)
    .then((response) => {
      dispatch({
        type: UPDATE_ITEM_RESPONSE,
        data: response.data,
      });
    });
};

export default updateItemQuantity;