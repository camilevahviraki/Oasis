import axios from 'axios';
import linkURL from '../link';

const GET_SINGLE_ITEM = 'redux/store/getStoresReducer/GET_SINGLE_ITEM';
const REFRESH_SINGLE_ITEM = 'redux/store/getStoresReducer/REFRESH_SINGLE_ITEM';

const getItemDetails = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_ITEM: {
      return action.data;
    } case REFRESH_SINGLE_ITEM: {
      return {};
    } default:
      return state;
  }
};

export const refreshItem = () => ({
  type: REFRESH_SINGLE_ITEM,
});

export const getItem = (item, token) => (dispatch) => {
  axios.get(`${linkURL}/api_stores/${item.store_id}/item/${item.id}`)
    .then((response) => {
      dispatch(
        {
          type: GET_SINGLE_ITEM,
          data: response.data,
        },
      );
    });
};

export default getItemDetails;
