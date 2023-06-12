import Upload from '../upload';

const ADD_STORES_NAMES = '/redux/ADD_STORE_NAMES';
const ADD_STORES_PLACES = '/redux/ADD_STORE_PLACES';
const ADD_STORES_TYPES = '/redux/ADD_STORE_TYPES';
const ADD_STORES_PICTURES = '/redux/ADD_STORE_PICTURES';
const SET_STORES_SUMMARY = '/redux/SET_STORE_SUMMARY';
const BACK_TO_PREVIOUS_PROGRESS = '/redux/BACK_TO_PREVIOUS_PROGRESS';
const SET_PROGRESS = '/redux/SET_PROGRESs';
const POST_STORE_TO_SERVER = '/redux/POST_STORE_TO_SERVER';
const GET_STORE_ID = '/redux/GET_STORE_ID';
const ADD_COORDINATES_TO_STORE = '/redux/ADD_COORDINATES_TO_STORE';

const createStoresReducer = (
  state = {
    details: {},
    pictures: [],
    types: [],
    places: [],
    storeId: { step: 1 },
    coordinates: null,
  },
  action,
) => {
  switch (action.type) {
    case ADD_STORES_NAMES: {
      const { pictures } = state;
      const { types } = state;
      const { places } = state;
      const details = action.data;
      const { storeId, coordinates } = state;
      const newState = {
        pictures, types, places, details, storeId, coordinates,
      };
      saveToStorage(newState);
      return newState;
    }
    case ADD_STORES_TYPES: {
      const { pictures } = state;
      const types = action.data;
      const { places } = state;
      const { details } = state;
      const { storeId, coordinates } = state;
      const newState = {
        pictures, types, places, details, storeId, coordinates,
      };
      saveToStorage(newState);
      return newState;
    }
    case ADD_STORES_PLACES: {
      const { pictures } = state;
      const { types } = state;
      const places = action.data;
      const { details } = state;
      const { storeId, coordinates } = state;
      const newState = {
        pictures, types, places, details, storeId, coordinates,
      };
      saveToStorage(newState);
      return newState;
    }
    case ADD_STORES_PICTURES: {
      const pictures = action.data;
      const { types } = state;
      const { places } = state;
      const { details } = state;
      const { storeId, coordinates } = state;
      const newState = {
        pictures, types, places, details, storeId, coordinates,
      };
      saveToStorage(newState);
      return newState;
    }
    case BACK_TO_PREVIOUS_PROGRESS: {
      const { pictures } = state;
      const { types } = state;
      const { places } = state;
      const { details } = state;
      const { storeId, coordinates } = state;
      const newState = {
        pictures, types, places, details, storeId, coordinates,
      };
      saveToStorage(newState);
      return newState;
    }
    case SET_PROGRESS: {
      const { pictures } = state;
      const { types } = state;
      const { places } = state;
      const { details } = state;
      const { storeId, coordinates } = state;
      const newState = {
        pictures, types, places, details, storeId, coordinates,
      };
      saveToStorage(newState);
      return newState;
    }
    case SET_STORES_SUMMARY: {
      const { pictures } = state;
      const { types } = state;
      const { places } = state;
      const { details } = state;
      const { storeId, coordinates } = state;
      const newState = {
        pictures, types, places, details, storeId, coordinates,
      };
      saveToStorage(newState);
      return newState;
    }
    case GET_STORE_ID: {
      const { pictures } = state;
      const { types } = state;
      const { places } = state;
      const { details, coordinates } = state;
      const { storeId } = action;
      const newState = {
        pictures, types, places, details, storeId, coordinates,
      };
      saveToStorage(newState);
      return newState;
    }
    case ADD_COORDINATES_TO_STORE: {
      const { pictures } = state;
      const { types } = state;
      const { places } = state;
      const { details } = state;
      const { storeId } = state;
      const coordinates = action.data;
      const newState = {
        pictures, types, places, details, storeId, coordinates,
      };
      // saveToStorage(newState);
      return newState;
    }
    case POST_STORE_TO_SERVER: {
      const newState = {
        details: {},
        pictures: [],
        types: [],
        places: [],
        storeId: { step: 1 },
        coordinates: null,
      };
      localStorage.removeItem('createStoreData');
      return newState;
    }
    default:
      const savedData = JSON.parse(localStorage.getItem('createStoreData'));
      if (savedData && savedData.storeId) {
        return savedData;
      }
      return state;
  }
};

export const addCoordinatesToStore = (data) => ({
  type: ADD_COORDINATES_TO_STORE,
  data,
});

export const getStoreId = (storeId) => (
  {
    type: GET_STORE_ID,
    storeId,
  }
);

export const addStoreNames = (details, token) => (dispatch) => {
  dispatch({
    type: ADD_STORES_NAMES,
    data: details,
  });
  Upload({
    data: details, endPoint: 'api_stores', dispatchResponse: (data) => dispatch(getStoreId(data)), token,
  });
};

export const addStorePictures = (pictures, token) => (dispatch) => {
  dispatch({
    type: ADD_STORES_PICTURES,
    data: pictures,
  });
};

export const addStoreTypes = (data, token) => (dispatch) => {
  Upload({
    data, endPoint: 'api_stores', dispatchResponse: (body) => dispatch(getStoreId(body)), token,
  });
  dispatch({
    type: ADD_STORES_TYPES,
    data,
  });
};

export const addStorePlaces = (places, token) => (dispatch) => {
  Upload({ data: places, endPoint: 'api_stores', dispatchResponse: (data) => dispatch(getStoreId(data), token) });
  dispatch({
    type: ADD_STORES_PLACES,
    data: places,
  });
};

export const createStoreProgress = () => ({
  type: BACK_TO_PREVIOUS_PROGRESS,
});

export const createStoreSetProgress = (data) => ({
  type: SET_PROGRESS,
  data,
});

export const postStoreToServer = () => ({
  type: POST_STORE_TO_SERVER,
});

const saveToStorage = (data) => {
  localStorage.setItem('createStoreData', JSON.stringify(data));
};

export default createStoresReducer;
