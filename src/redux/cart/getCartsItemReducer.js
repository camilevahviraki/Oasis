import axios from "axios";
import linkURL from "../link";

const GET_CART_ITEMS = "redux/store/createCartsReducer/GET_CART_ITEMS";

const cartItemsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CART_ITEMS: {
      return action.data;
    }
    default:
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

export default cartItemsReducer;
