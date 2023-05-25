import axios from 'axios';
import linkURL from '../link';

const GET_ATTRIBUTE_SIZE = 'redux/store/getStoresReducer/GET_ATTRIBUTE_SIZE';

const sizeReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ATTRIBUTE_SIZE: {
      return action.data;
    } default:
      return state;
  }
};

export const getSizes = (token) => (dispatch) => {
  axios.get(`${linkURL}/size`)
    .then((response) => {
      dispatch(
        {
          type: GET_ATTRIBUTE_SIZE,
          data: response.data,
        },
      );
    });
};

export default sizeReducer;
