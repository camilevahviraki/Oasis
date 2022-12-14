import axios from "axios";
// import linkURL from '../url';

const ADD_STORES_NAMES = "/redux/ADD_STORE_NAMES";
const ADD_STORES_PLACES = "/redux/ADD_STORE_PLACES";
const ADD_STORES_TYPES = "/redux/ADD_STORE_TYPES";
const ADD_STORES_PICTURES = "/redux/ADD_STORE_PICTURES";
const SET_STORES_SUMMARY = "/redux/SET_STORE_SUMMARY";

const createStoresReducer = (
  state = {
    details: {},
    pictures: [],
    types: [],
    places: [],
    progress: 1,
  },
  action
) => {
  switch (action.type) {
    case ADD_STORES_NAMES: {
      const pictures = state.pictures;
      const types = state.types;
      const places = state.places;
      const details = action.data;
      const progress = 2;
      const newState = { pictures, types, places, details, progress };
      return newState;
    }
    case ADD_STORES_TYPES: {
      const pictures = state.pictures;
      const types = action.data;
      const places = state.places;
      const details = state.details;
      const progress = 3;
      const newState = { pictures, types, places, details, progress };
      return newState;
    }
    case ADD_STORES_PLACES: {
      const pictures = state.pictures;
      const types = state.types;
      const places = action.data;
      const details = state.details;
      const progress = 5;
      const newState = { pictures, types, places, details, progress };
      return newState;
    }
    case ADD_STORES_PICTURES: {
      const pictures = action.data;
      const types = state.types;
      const places = state.places;
      const details = state.details;
      const progress = 4;
      const newState = { pictures, types, places, details, progress };
      return newState;
    }
    case SET_STORES_SUMMARY: {
      return state;
    }
    default:
      return state;
  }
};

export const addStoreNames = (details) => ({
  type: ADD_STORES_NAMES,
  data: details,
});

export const addStorePictures = (pictures) => ({
    type: ADD_STORES_PICTURES,
    data: pictures,
  });

  export const addStoreTypes = (data) => ({
    type: ADD_STORES_TYPES,
    data: data,
  });

  export const addStorePlaces = (places) => ({
    type: ADD_STORES_PLACES,
    data: places,
  });

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

export default createStoresReducer;
