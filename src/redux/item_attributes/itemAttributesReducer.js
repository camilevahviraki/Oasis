import axios from 'axios';
import linkURL from '../link';

const GET_ITEM_COLORS = 'redux/store/getStoresReducer/GET_ITEM_COLORS';
const GET_ITEM_SIZES = 'redux/store/getStoresReducer/GET_ITEM_SIZES';
const GET_ITEM_CAPACITY = 'redux/store/getStoresReducer/GET_ITEM_CAPACITY';
const GET_ITEM_MATERIAL = 'redux/store/getStoresReducer/GET_ITEM_MATERIAL';

const itemAttributeReducer = (state = {
  colors: [],
  capacities: [],
  sizes: [],
  materials: [],
}, action) => {
  switch (action.type) {
    case GET_ITEM_COLORS: {
      const colors = action.data;
      const capacities = state.capacities;
      const materials = state.materials;
      const sizes = state.sizes;

      return {colors, capacities, materials, sizes};
    }case GET_ITEM_SIZES: {
      const colors = state.colors;
      const capacities = state.capacities;
      const materials = state.materials;
      const sizes = action.data;

      return {colors, capacities, materials, sizes};
    }case GET_ITEM_CAPACITY: {
      const colors = state.colors;
      const capacities = action.data;
      const materials = state.materials;
      const sizes = state.sizes;

      return {colors, capacities, materials, sizes};
    }case GET_ITEM_MATERIAL: {
      const colors = state.colors;
      const capacities = state.capacities;
      const materials = action.data;
      const sizes = state.sizes;

      return {colors, capacities, materials, sizes};
    }default:
      return state;
  }
};

export const getItemColors = (itemId, token) => (dispatch) => {
  axios.get(`${linkURL}/item/${itemId}/colors`)
    .then((response) => {
      dispatch(
        {
          type: GET_ITEM_COLORS,
          data: response.data,
        },
      );
    });
};

export const getItemCapacities = (itemId, token) => (dispatch) => {
  axios.get(`${linkURL}/item/${itemId}/capacity`)
    .then((response) => {
      dispatch(
        {
          type: GET_ITEM_CAPACITY,
          data: response.data,
        },
      );
    });
};

export const getItemSizes = (itemId, token) => (dispatch) => {
  axios.get(`${linkURL}/item/${itemId}/sizes`)
    .then((response) => {
      dispatch(
        {
          type: GET_ITEM_SIZES,
          data: response.data,
        },
      );
    });
};

export const getItemMaterials = (itemId, token) => (dispatch) => {
  axios.get(`${linkURL}/item/${itemId}/materials`)
    .then((response) => {
      dispatch(
        {
          type: GET_ITEM_MATERIAL,
          data: response.data,
        },
      );
    });
};

export default itemAttributeReducer;