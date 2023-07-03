import axios from 'axios';
import linkURL from '../link';

const MASS_DELETE_ITEMS = 'redux/store/getStoresReducer/MASS_DELETE_ITEMS';
const RESET_MASS_DELETE_ITEMS_RES = 'redux/store/getStoresReducer/RESET_MASS_DELETE_ITEMS_RES';

const massDeleteItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case MASS_DELETE_ITEMS: {
      return action.data;
    }
    case RESET_MASS_DELETE_ITEMS_RES: {
      return {};
    }
    default:
      return state;
  }
};

export const resetMassDeleteItemsResponse = () => ({
  type: RESET_MASS_DELETE_ITEMS_RES,
});

export const massDeleteItems = (ids, token) => (dispatch) => {
  axios
    .post(`${linkURL}/api_stores/show/items/mass_delete`, { ids })
    .then((response) => {
      dispatch({
        type: MASS_DELETE_ITEMS,
        data: response.data,
      });
    });
};

export default massDeleteItemsReducer;
