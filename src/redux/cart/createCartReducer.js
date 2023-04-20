import axios from "axios";
import linkURL from "../link";

const CREATE_CART = "redux/store/createCartsReducer/CREATE_CART";
const DELETE_CART_MESSAGE_RESPONSE =
  "redux/store/createCartsReducer/DELETE_CART_MESSAGE_RESPONSE";

const createCartReducer = (state = { message: null }, action) => {
  switch (action.type) {
    case CREATE_CART: {
      return action.data;
    }
    case DELETE_CART_MESSAGE_RESPONSE: {
      return { message: null };
    }
    default:
      return state;
  }
};

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
          error: "Error while creating cart-item!",
          message: null,
        },
      });
    });
};

export default createCartReducer;
