import linkURL from "../link";
import axios from "axios";

const GET_COUNTRIES = 'redux/store/getStoresReducer/GET_COUNTRIES';


const countriesReducer = (state = [], action) => {
    switch (action.type) {
        case GET_COUNTRIES: {
           return action.data;
        }default:
            return state
    }
} 

export const getCountries = (token) => (dispatch) => {
    axios.get(`${linkURL}/countries`)
      .then((response) => {dispatch(
        {
          type: GET_COUNTRIES,
          data: response.data,
        },
      )
    });
}

export default countriesReducer;