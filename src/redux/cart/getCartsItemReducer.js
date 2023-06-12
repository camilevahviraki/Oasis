import axios from 'axios';
import linkURL from '../link';

const GET_CART_ITEMS = 'redux/store/createCartsReducer/GET_CART_ITEMS';
const UPDATE_CART_QUANTITY = 'redux/store/createCartsReducer/UPDATE_CART_QUANTITY_DISPLAY';

const cartItemsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CART_ITEMS: {
      return action.data;
    } case UPDATE_CART_QUANTITY: {
      let newState = [];
      state.forEach((item) => {
        if (item.id === action.data.cart_item_id) {
          const data = { ...item, quantity: action.data.quantity };
          newState = [...newState, data];
        } else {
          newState = [...newState, item];
        }
      });
      return newState;
    } default:
      return state;
  }
};

export const getCartItems = (user_id, token) => (dispatch) => {
  axios
    .get(`${linkURL}/cart/${user_id}`)
    .then((response) => {
      dispatch({
        type: GET_CART_ITEMS,
        data: response.data,
      });
    })
    .catch((_err) => {
      dispatch({
        type: GET_CART_ITEMS,
        data: [],
      });
    });
};

export const updateCartItemQuantityDisplay = (data) => ({
  type: UPDATE_CART_QUANTITY,
  data,
}
);

export default cartItemsReducer;
