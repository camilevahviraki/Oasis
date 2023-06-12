import axios from 'axios';
import linkURL from '../link';

const GET_ORDER_SHOW = 'redux/store/createCartsReducer/GET_ORDER_SHOW';

const orderShowReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDER_SHOW: {
      return action.data;
    } default:
      return state;
  }
};

export const getOrderShow = (tokenId, token) => (dispatch) => {
  axios
    .get(`${linkURL}/orders/show/${tokenId}`)
    .then((response) => {
      dispatch({
        type: GET_ORDER_SHOW,
        data: response.data,
      });
    }).catch((_err) => {
      dispatch({
        type: GET_ORDER_SHOW,
        data: { error: 'Ooops! Backend error. Back to the Home page!' },
      });
    });
};

export default orderShowReducer;
