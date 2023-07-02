import axios from 'axios';
import linkURL from '../link';

const GET_WELCOME_PAGE_ITEMS_LIST = 'redux/store/home_page/GET_WELCOME_PAGE_ITEMS_LIST';
const SEARCH_ITEM = 'redux/store/home_page/SEARCH_ITEM';

const welcomePageReducer = (
  state = {
    data: [],
  },
  action,
) => {
  switch (action.type) {
    case GET_WELCOME_PAGE_ITEMS_LIST: {
      return {
        data: action.data,
      };
    }
    case SEARCH_ITEM: {
      return {
        data: action.data,
        searchedData: true,
      };
    }
    default:
      return state;
  }
};

export const welcomeSearchItem = (data, token) => (dispatch) => {
  axios
    .post(`${linkURL}/user/${data.userId}/home_page/search`, data)
    .then((response) => {
      dispatch({
        type: SEARCH_ITEM,
        data: response.data,
      });
    });
};

export const getWelcomItemsItems = (user, token) => (dispatch) => {
  axios.get(`${linkURL}/user/user_params/welcome_page`).then((response) => {
    dispatch({
      type: GET_WELCOME_PAGE_ITEMS_LIST,
      data: response.data,
    });
  });
};

export default welcomePageReducer;
