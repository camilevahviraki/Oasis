import axios from 'axios';
import linkURL from '../link';

const GET_STORES_LIST = 'redux/store/getStoresReducer/GET_STORES_LIST';

const getStoresReducer = (state = [], action) => {
  switch (action.type) {
    case GET_STORES_LIST: {
      return action.data;
    } default:
      return state;
  }
};

export const getStoresList = (userId, token) => (dispatch) => {
  axios.get(`${linkURL}/store/${userId}/api_stores`)
    .then((response) => {
      dispatch(
        {
          type: GET_STORES_LIST,
          data: response.data,
        },
      );
    });
};

export default getStoresReducer;
