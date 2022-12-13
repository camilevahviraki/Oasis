import axios from 'axios';
// import linkURL from '../url';

const ADD_STORES_NAMES = '/redux/ADD_STORE_NAMES';
const ADD_STORES_PLACES = '/redux/ADD_STORE_PLACES';
const ADD_STORES_TYPES = '/redux/ADD_STORE_TYPES';
const ADD_STORES_PICTURES = '/redux/ADD_STORE_PICTURES';
const SET_STORES_SUMMARY = '/redux/SET_STORE_SUMMARY';

const createStoresReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_STORES_NAMES:
      return action;
    case ADD_STORES_TYPES: {
      return action;
    }
    case ADD_STORES_PLACES: {
      return action;
    }
    case ADD_STORES_PICTURES: {
        return action;
    }
    case SET_STORES_SUMMARY: {
        return action;
    }
    default:
      return state;
  }
};

// export const fetchMotorcycles = (varToken) => (dispatch) => {
//   axios.get(`${linkURL}/api/v1/motorcycle`,
//     {
//       headers: {
//         Authorization: `Bearer ${varToken}`,
//       },
//     })
//     .then((response) => dispatch(
//       {
//         type: MOTORCYCLES,
//         motorcycles: response.data,
//       },
//     ));
// };

// export const removeMotorcycle = (id, token) => (dispatch) => {
//   axios.delete(`${linkURL}/api/v1/motorcycle/${id}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((response) => dispatch(
//       {
//         type: DELETE_MOTORCYCLES,
//         id,
//       },
//     ));
// };

// export const reserveMotorcycle = (data, token) => (dispatch) => {
//   axios.post(`${linkURL}/api/v1/motorcycle/${data.id}/reservation`, {
//     reserve: data,
//   },
//   {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((response) => dispatch(
//       {
//         type: RESERVE_BIKE,
//         id: data.motorcycle_id,
//       },
//     ));
// };

export default createStoresReducer;
