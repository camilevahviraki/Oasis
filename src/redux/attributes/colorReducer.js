import axios from 'axios';
import linkURL from '../link';

const GET_ATTRIBUTE_COLOR = 'redux/store/getStoresReducer/GET_ATTRIBUTE_COLOR';

const colorReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ATTRIBUTE_COLOR: {
      return action.data;
    } default:
      return state;
  }
};

export const getColors = (token) => (dispatch) => {
  axios.get(`${linkURL}/color`)
    .then((response) => {
      dispatch(
        {
          type: GET_ATTRIBUTE_COLOR,
          data: response.data,
        },
      );
    });
};

export default colorReducer;