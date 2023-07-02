import axios from 'axios';
import linkURL from '../link';

const GET_STORE_GRAPHS = 'redux/store/createCartsReducer/GET_STORE_GRAPHS';

const storeGraphsReducer = (state = [], action) => {
  switch (action.type) {
    case  GET_STORE_GRAPHS: {
      return action.data;
    }default:
      return state;
  }
};

export const getStoreGraphs = (store_id, searchParams, token) => (dispatch) => {
  axios
    .get(`${linkURL}/store_sale/${store_id}/graph?${searchParams}`)
    .then((response) => {
      dispatch({
        type:  GET_STORE_GRAPHS,
        data: response.data,
      });
    })
    .catch((_err) => {
      dispatch({
        type:  GET_STORE_GRAPHS,
        data: [],
      });
    });
};

export default storeGraphsReducer;