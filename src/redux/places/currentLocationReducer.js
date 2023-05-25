const SET_CURRENT_LOCATION = 'redux/store/getStoresReducer/SET_CURRENT_LOCATION';

const currentLocationReducer = (state = null, action) => {
  switch (action.type) {
    case SET_CURRENT_LOCATION: {
      return action.data;
    } default: 
      return state;
  }
};



export const setCurrentLocation = (data) => (

        {
          type: SET_CURRENT_LOCATION,
          data: data,
        });

export default currentLocationReducer;