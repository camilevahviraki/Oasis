import axios from "axios";
import linkURL from "../link";

const GET_STORE_SHOW = 'redux/store/getStoreShowReducer/GET_STORE_SHOW';

const getStoreShowReducer = (state = [], action) => {
    switch (action.state) {
        case GET_STORE_SHOW: 
           return action.data;
        default:
            return state
    }
} 

export const getStoresShow = (data, token) => (dispatch) => {
    axios.get(`${linkURL}/api_stores`)
      .then((response) => dispatch(
        {
          type: GET_STORE_SHOW,
          data: response.data,
        },
      ));
}

export default getStoreShowReducer;
