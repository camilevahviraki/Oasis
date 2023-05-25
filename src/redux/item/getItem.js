import axios from "axios";
import linkURL from "../link";

const GET_ITEMS_LIST = "redux/store/getStoresReducer/GET_ITEMS_LIST";
const SEARCH_STORE_ITEM = "redux/store/getStoresReducer/SEARCH_STORE_ITEM";
const DELETE_SEARCHED_DATA =
  "redux/store/getStoresReducer/DELETE_SEARCHED_DATA";

const getItemsList = (state = { itemsList: [] }, action) => {
  switch (action.type) {
    case GET_ITEMS_LIST: {
      return { itemsList: action.data };
    }
    case SEARCH_STORE_ITEM: {
      return { itemsList: action.data, searchedData: true };
    }
    case DELETE_SEARCHED_DATA: {
      return { itemsList: state.itemsList, searchedData: null };
    }
    default:
      return state;
  }
};

export const deleteSearchedData = () => ({
  type: DELETE_SEARCHED_DATA,
});

export const getItems = (data, token) => (dispatch) => {
  const { store_id, category } = data;
  axios
    .get(`${linkURL}/api_stores/${store_id}/items/${category}`)
    .then((response) => {
      dispatch({
        type: GET_ITEMS_LIST,
        data: response.data,
      });
    });
};

export const searchStoreItem = (data, token) => (dispatch) => {
  const { query, storeId, categoryName } = data;
  axios
    .post(`${linkURL}/api_stores/${storeId}/items/${categoryName}/search`, {
      query,
    })
    .then((response) => {
      dispatch({
        type: SEARCH_STORE_ITEM,
        data: response.data,
      });
    });
};

export default getItemsList;
