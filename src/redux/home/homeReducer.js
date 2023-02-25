import axios from "axios";
import linkURL from "../link";

const GET_HOME_ITEMS_LIST = 'redux/store/getStoresReducer/GET_HOME_ITEMS_LIST';


const homeReducer = (state = [], action) => {
    switch (action.type) {
        case GET_HOME_ITEMS_LIST: {
           return action.data;
        }default:
            return state
    }
}

export const getHomeItems = (user, token) => (dispatch) => {
    axios.get(`${linkURL}/user/user_params/home_page`)
      .then((response) => {dispatch(
        {
          type: GET_HOME_ITEMS_LIST,
          data: response.data,
        },
      )
    });
}

export default homeReducer;