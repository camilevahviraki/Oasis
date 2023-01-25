import axios from "axios";
import linkURL from "../link";

const GET_STORES_LIST = 'redux/store/getStoresReducer/GET_STORES_LIST';


const getStoresReducer = (state = [], action) => {
    switch (action.state) {
        case GET_STORES_LIST: 
           return action.data;
        default:
            return state
    }
} 

export const getStoresList = (data, token) => (dispatch) => {
    axios.get(`${linkURL}/api_stores`)
      .then((response) => dispatch(
        {
          type: GET_STORES_LIST,
          data: response.data,
        },
      ));
}

export default getStoresReducer;