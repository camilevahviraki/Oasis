import axios from 'axios';
import linkURL from '../link';

const GET_STORE_SHOW = 'redux/store/getStoreShowReducer/GET_STORE_SHOW';
const CLEAR_STORE_DATA = 'redux/store/getStoreShowReducer/CLEAR_STORE_DATA';

const getStoreShowReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_STORE_SHOW: {
      localStorage.setItem('currentStoreData', JSON.stringify(action.data));
      return action.data;
    }
    case CLEAR_STORE_DATA: {
      localStorage.removeItem('currentStoreData');
      return {};
    } default: {
      const storeData = JSON.parse(localStorage.getItem('currentStoreData'));
      if (storeData) {
        return storeData;
      }
      return state;
    }
  }
};

export const clearStoreData = () => ({
  type: CLEAR_STORE_DATA,
});

export const getStoresShow = (data, token) => (dispatch) => {
  axios.get(`${linkURL}/store/${data.user_id}/api_stores/${data.store_id}`)
    .then((response) => dispatch(
      {
        type: GET_STORE_SHOW,
        data: response.data,
      },
    ));
};

export default getStoreShowReducer;
