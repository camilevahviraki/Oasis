import Upload from "../upload";

const ADD_STORES_NAMES = "/redux/ADD_STORE_NAMES";
const ADD_STORES_PLACES = "/redux/ADD_STORE_PLACES";
const ADD_STORES_TYPES = "/redux/ADD_STORE_TYPES";
const ADD_STORES_PICTURES = "/redux/ADD_STORE_PICTURES";
const SET_STORES_SUMMARY = "/redux/SET_STORE_SUMMARY";
const BACK_TO_PREVIOUS_PROGRESS = "/redux/BACK_TO_PREVIOUS_PROGRESS";
const SET_PROGRESS = "/redux/SET_PROGRESs";
const POST_STORE_TO_SERVER = '/redux/POST_STORE_TO_SERVER';
const GET_STORE_ID = '/redux/GET_STORE_ID';


const createStoresReducer = (
  state = {
    details: {},
    pictures: [],
    types: [],
    places: [],
    storeId: {step: 1},
  },
  action
) => {
  switch (action.type) {
    case ADD_STORES_NAMES: {
      const pictures = state.pictures;
      const types = state.types;
      const places = state.places;
      const details = action.data;
      const storeId = state.storeId;
      const newState = { pictures, types, places, details, storeId };
      saveToStorage(newState);
      return newState;
    }
    case ADD_STORES_TYPES: {
      const pictures = state.pictures;
      const types = action.data;
      const places = state.places;
      const details = state.details;
      const storeId = state.storeId;
      const newState = { pictures, types, places, details, storeId };
      saveToStorage(newState);
      return newState;
    }
    case ADD_STORES_PLACES: {
      const pictures = state.pictures;
      const types = state.types;
      const places = action.data;
      const details = state.details;
      const storeId = state.storeId;
      const newState = { pictures, types, places, details, storeId };
      saveToStorage(newState);
      return newState;
    }
    case ADD_STORES_PICTURES: {
      const pictures = action.data;
      const types = state.types;
      const places = state.places;
      const details = state.details;
      const storeId = state.storeId;
      const newState = { pictures, types, places, details, storeId };
      saveToStorage(newState);
      return newState;
    }
    case BACK_TO_PREVIOUS_PROGRESS: {
      const pictures = state.pictures;
      const types = state.types;
      const places = state.places;
      const details = state.details;
      const storeId = state.storeId;
      const newState = { pictures, types, places, details, storeId };
      saveToStorage(newState);
      return newState;
    }
    case SET_PROGRESS: {
      const pictures = state.pictures;
      const types = state.types;
      const places = state.places;
      const details = state.details;
      const storeId = state.storeId;
      const newState = { pictures, types, places, details, storeId };
      saveToStorage(newState);
      return newState;
    }
    case SET_STORES_SUMMARY: {
      const pictures = state.pictures;
      const types = state.types;
      const places = state.places;
      const details = state.details;
      const storeId = state.storeId;
      const newState = { pictures, types, places, details, storeId };
      saveToStorage(newState);
      return newState;
    }
    case GET_STORE_ID: {
      const pictures = state.pictures;
      const types = state.types;
      const places = state.places;
      const details = state.details;
      const storeId = action.storeId;
      const newState = { pictures, types, places, details, storeId };
      saveToStorage(newState);
      return newState;
    }
    case POST_STORE_TO_SERVER: {
      const newState = {
        details: {},
        pictures: [],
        types: [],
        places: [],
        storeId: {step: 1},
      }
      localStorage.removeItem('createStoreData');
      return newState;
    }
    default:
      const savedData = JSON.parse(localStorage.getItem('createStoreData'));
      if(savedData && savedData.storeId){
        return savedData
      }
      return state;
  }
};

export const getStoreId = (storeId) => (
   { type: GET_STORE_ID,
     storeId
   }
)

export const addStoreNames = (details, token) => (dispatch) => {
  dispatch({
    type: ADD_STORES_NAMES,
    data: details,
  })
  Upload({data: details, endPoint: 'api_stores', dispatchResponse: (data) => dispatch(getStoreId(data)), token})

};

export const addStorePictures = (pictures, token) => (dispatch) => {
  dispatch({
    type: ADD_STORES_PICTURES,
    data: pictures,
  })
};

  export const addStoreTypes = (data, token) => (dispatch) => {

    Upload({data: data, endPoint: 'api_stores', dispatchResponse: (body) => dispatch(getStoreId(body)), token})
    dispatch({
      type: ADD_STORES_TYPES,
      data: data,
    })
  };

  export const addStorePlaces = (places, token) => (dispatch) => {
    Upload({data: places, endPoint: 'api_stores', dispatchResponse: (data) => dispatch(getStoreId(data), token)})
    dispatch({
      type: ADD_STORES_PLACES,
      data: places,
    })
  }

  export const createStoreProgress = () => ({
    type: BACK_TO_PREVIOUS_PROGRESS,
  });

  export const createStoreSetProgress = (data) => ({
    type: SET_PROGRESS,
    data
  });

  export const postStoreToServer = () => ({
    type: POST_STORE_TO_SERVER, 
  });

const saveToStorage = (data) => {
  localStorage.setItem('createStoreData', JSON.stringify(data));
}

export default createStoresReducer;
