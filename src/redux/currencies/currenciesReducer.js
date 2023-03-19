import axios from 'axios';
import linkURL from '../link';

const GET_CURRENCIES = 'redux/store/getStoresReducer/GET_CURRENCIES';

const currenciesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CURRENCIES: {
      return action.data;
    } default:
      return state;
  }
};

export const getCurrencies = (token) => (dispatch) => {
  axios.get(`${linkURL}/currencies`)
    .then((response) => {
      dispatch(
        {
          type: GET_CURRENCIES,
          data: response.data,
        },
      );
    });
};

export default currenciesReducer;
