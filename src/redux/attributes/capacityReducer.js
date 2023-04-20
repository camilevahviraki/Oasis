import axios from 'axios';
import linkURL from '../link';

const GET_ATTRIBUTE_CAPACITY = 'redux/store/getStoresReducer/GET_ATTRIBUTE_CAPACITY';

const capacityReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ATTRIBUTE_CAPACITY: {
      return action.data;
    } default:
      return state;
  }
};

export const getCapacities = (token) => (dispatch) => {
  axios.get(`${linkURL}/capacity`)
    .then((response) => {
      dispatch(
        {
          type: GET_ATTRIBUTE_CAPACITY,
          data: response.data,
        },
      );
    });
};

export default capacityReducer;