import axios from "axios";
import linkURL from "../link";

const UPDATE_STORE = 'redux/store/getStoreShowReducer/UPDATE_STORE';
const SET_FIELD = 'redux/store/getStoreShowReducer/SET_FIELD';

const updateStoreReducer = (state = {
    field: null,
    response: null,
}, action) => {
    switch (action.type) {
        case SET_FIELD: {
          const newState = {
            field: action.field,
            response: null,
          }  
          return newState;
        }case UPDATE_STORE: {
            const newState = {
                field: state.field,
                response: action.data,
            }
            console.log(action);
            return newState;
        }default: {
          return state
        }
    }
}

export const setStoreFieldToUpdate = (field) => ({
   type: SET_FIELD,
   field,
})

export const updateStore = (data, token) => (dispatch) => {
    axios.post(`${linkURL}/store/update`, data)
      .then((response) => dispatch(
        {
          type: UPDATE_STORE,
          data: response.data,
        },
      ));
}

export default updateStoreReducer;
