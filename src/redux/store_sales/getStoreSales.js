import axios from 'axios';
import linkURL from '../link';

const GET_STORE_SALES_ITEMS = 'redux/store/createCartsReducer/GET_STORE_SALES_ITEMS';
const UPDATE_STORE_SALES_QUANTITY = 'redux/store/createCartsReducer/UPDATE_STORE_SALES_QUANTITY_DISPLAY';

const storeSalesItemsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_STORE_SALES_ITEMS: {
      return action.data;
    } case UPDATE_STORE_SALES_QUANTITY: {
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

export const getStoreSales = (store_id, searchParams, token) => (dispatch) => {
  axios
    .get(`${linkURL}/store_sale/${store_id}?${searchParams}`)
    .then((response) => {
      dispatch({
        type: GET_STORE_SALES_ITEMS,
        data: response.data,
      });
    })
    .catch((_err) => {
      dispatch({
        type: GET_STORE_SALES_ITEMS,
        data: [],
      });
    });
};

export const updateStoreItemQuantityDisplay = (data) => ({
  type: UPDATE_STORE_SALES_QUANTITY,
  data,
}
);

export default storeSalesItemsReducer;
