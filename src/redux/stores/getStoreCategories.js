import axios from 'axios';
import linkURL from '../link';

const GET_STORE_CATEGORIES = 'redux/store/getStoreShowReducer/GET_STORE_CATEGORIES';

const getStoreCategories = (state = [], action) => {
  switch (action.type) {
    case GET_STORE_CATEGORIES: {
      return action.data;
    } default: {
      return state;
    }
  }
};

export const getCategoriesForAStore = (store_id) => (dispatch) => {
  axios.get(`${linkURL}/store/${store_id}/stores_categories`)
    .then((response) => dispatch(
      {
        type: GET_STORE_CATEGORIES,
        data: response.data,
      },
    ));
};

export default getStoreCategories;
