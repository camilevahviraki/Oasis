import axios from 'axios';
import linkURL from '../link';

const GET_CURRENCIES = 'redux/store/getStoresReducer/GET_CURRENCIES';

const searchItemReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CURRENCIES: {
      return action.data;
    } default: 
      return state;
  }
};



export const searchItem = (data ,token) => (dispatch) => {
  // data = {
  //   pageName: 'Home',
  //   query: 'azerty',
  //   userId: 12
  // }
  axios.post(`${linkURL}/user/${data.userId}/home_page/search`, data)
    .then((response) => {
      dispatch(
        {
          type: GET_CURRENCIES,
          data: response.data,
        },
      );
    });
};

export default searchItemReducer;