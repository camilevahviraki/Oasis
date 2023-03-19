import axios from 'axios';
import linkURL from '../link';

const GET_STORE_IMAGES = 'redux/store/getStoreShowReducer/GET_STORE_IMAGES';

const getStoreImagesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_STORE_IMAGES: {
      return action.data;
    } default: {
      return state;
    }
  }
};

export const getImagesForAStore = (store_id) => (dispatch) => {
  axios.get(`${linkURL}/store/${store_id}/images`)
    .then((response) => dispatch(
      {
        type: GET_STORE_IMAGES,
        data: response.data,
      },
    ));
};

export default getStoreImagesReducer;
