import axios from "axios";
import linkURL from "../link";

const GET_STORES_PLACES = "redux/store/createCartsReducer/GET_STORES_PLACES";

const storesPlacesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_STORES_PLACES: {
      return action.data;
    }default:
      return state;
  }
};

export const getStoresPlaces = () => (dispatch) => {
  axios
    .get(`${linkURL}/places`)
    .then((response) => {
      dispatch({
        type: GET_STORES_PLACES,
        data: response.data,
      });
    }).catch((_err) => {
      dispatch({
        type: GET_STORES_PLACES,
        data: {error: 'Ooops! Backend error. Back to the Home page!'}
      })
    })
};

export default storesPlacesReducer;