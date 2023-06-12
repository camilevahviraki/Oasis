import axios from 'axios';
import linkURL from '../link';

const GET_ATTRIBUTE_MATERIAL = 'redux/store/getStoresReducer/GET_ATTRIBUTE_MATERIAL';

const materialReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ATTRIBUTE_MATERIAL: {
      return action.data;
    } default:
      return state;
  }
};

export const getMaterials = (token) => (dispatch) => {
  axios.get(`${linkURL}/material`)
    .then((response) => {
      dispatch(
        {
          type: GET_ATTRIBUTE_MATERIAL,
          data: response.data,
        },
      );
    });
};

export default materialReducer;
