import axios from 'axios';
import linkURL from '../link';

const GET_ORDER_LIST = 'redux/store/createCartsReducer/GET_ORDER_LIST';

const ordersIndexReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ORDER_LIST: {
      return action.data;
    } default:
      return state;
  }
};

export const getOrderIndex = (userId, token) => (dispatch) => {
  axios
    .get(`${linkURL}/orders/${userId}`)
    .then((response) => {
      dispatch({
        type: GET_ORDER_LIST,
        data: response.data,
      });
    }).catch((_err) => {
      dispatch({
        type: GET_ORDER_LIST,
        data: { error: 'Ooops! Backend error. Back to the Home page!' },
      });
    });
};

export default ordersIndexReducer;
