import axios from 'axios';
import linkURL from '../link';

const GET_ITEMS_LIST = 'redux/store/getStoresReducer/GET_ITEMS_LIST';

const getItemsList = (state = [], action) => {
  switch (action.type) {
    case GET_ITEMS_LIST: {
      return action.data;
    } default:
      return state;
  }
};

export const getItems = (store, token) => (dispatch) => {
  axios.get(`${linkURL}/api_stores/${store.store_id}/items/${store.category}`)
    .then((response) => {
      dispatch(
        {
          type: GET_ITEMS_LIST,
          data: response.data,
        },
      );
    });
};

export default getItemsList;
