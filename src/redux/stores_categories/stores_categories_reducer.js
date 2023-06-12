import axios from 'axios';
import linkURL from '../link';

const GET_CATEGORIES = 'redux/store/getStoresReducer/GET_CATEGORIES';

const storeCategoriesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES: {
      return action.data;
    } default:
      return state;
  }
};

export const getCategories = (token) => (dispatch) => {
  axios.get(`${linkURL}/stores_categories_list`)
    .then((response) => {
      dispatch(
        {
          type: GET_CATEGORIES,
          data: response.data,
        },
      );
    });
};

export default storeCategoriesReducer;
