import axios from 'axios';
import linkURL from '../link';
import Upload from '../upload';

const DELETE_ITEM_COLOR = 'redux/store/getStoresReducer/DELETE_ITEM_COLOR';
const DELETE_ITEM_SIZE = 'redux/store/getStoresReducer/DELETE_ITEM_SIZE';
const DELETE_ITEM_CAPACITY = 'redux/store/getStoresReducer/DELETE_ITEM_CAPACITY';
const DELETE_ITEM_MATERIAL = 'redux/store/getStoresReducer/DELETE_ITEM_MATERIAL';
const DELETE_MESSAGE = 'redux/store/getStoresReducer/DELETE_MESSAGE';
const ATTACH_IMAGE_TO_COLOR = 'redux/store/getStoresReducer/ATTACH_IMAGE_TO_COLOR';
const ATTACH_IMAGE_TO_SIZE = 'redux/store/getStoresReducer/ATTACH_IMAGE_TO_SIZE';
const ATTACH_IMAGE_TO_MATERIAL = 'redux/store/getStoresReducer/ATTACH_IMAGE_TO_MATERIAL';
const ATTACH_IMAGE_TO_CAPACITY = 'redux/store/getStoresReducer/ATTACH_IMAGE_TO_CAPACITY';

const createItemAttributes = (state = {
  message: null,
  messageCapacity: null,
  messageSize: null,
  messageMaterial: null,
}, action) => {
  switch (action.type) {
    case DELETE_ITEM_COLOR: {
      return action.data;
    } case DELETE_ITEM_CAPACITY: {
      const { message } = state;
      const messageCapacity = action.data.message;
      return { message, messageCapacity };
    } case DELETE_ITEM_SIZE: {
      const { message } = state;
      const messageSize = action.data.message;
      const { messageCapacity } = state;
      return { message, messageCapacity, messageSize };
    } case DELETE_ITEM_MATERIAL: {
      const { message } = state;
      const messageSize = state.message;
      const { messageCapacity } = state;
      const messageMaterial = action.data.message;
      return {
        message, messageCapacity, messageSize, messageMaterial,
      };
    } case DELETE_MESSAGE: {
      return {
        message: null, messageCapacity: null, messageSize: null, messageMaterial: null,
      };
    } case ATTACH_IMAGE_TO_COLOR: {
      return action.data;
    } case ATTACH_IMAGE_TO_CAPACITY: {
      const { message } = state;
      const messageCapacity = action.data.message;
      const { messageSize } = state;
      return { message, messageCapacity, messageSize };
    } case ATTACH_IMAGE_TO_SIZE: {
      const { message } = state;
      const { messageCapacity } = state;
      const messageSize = action.data.message;
      return { message, messageSize, messageCapacity };
    } case ATTACH_IMAGE_TO_MATERIAL: {
      const { message } = state;
      const messageSize = state.message;
      const { messageCapacity } = state;
      const messageMaterial = action.data.message;
      return {
        message, messageCapacity, messageSize, messageMaterial,
      };
    } default:
      return state;
  }
};

export const deleteMessage = () => ({
  type: DELETE_MESSAGE,
});

export const deleteItemColors = (id, token) => (dispatch) => {
  axios.delete(`${linkURL}/item/:item_id/colors/${id}`)
    .then((response) => {
      dispatch(
        {
          type: DELETE_ITEM_COLOR,
          data: response.data,
        },
      );
    });
};

export const deleteItemSizes = (id, token) => (dispatch) => {
  axios.delete(`${linkURL}/item/:item_id/sizes/${id}`)
    .then((response) => {
      dispatch(
        {
          type: DELETE_ITEM_SIZE,
          data: response.data,
        },
      );
    });
};

export const deleteItemCapacities = (id, token) => (dispatch) => {
  axios.delete(`${linkURL}/item/${id}/capacity/${id}`)
    .then((response) => {
      dispatch(
        {
          type: DELETE_ITEM_CAPACITY,
          data: response.data,
        },
      );
    });
};

export const deleteItemMaterials = (id, token) => (dispatch) => {
  axios.delete(`${linkURL}/item/:item_id/materials/${id}`)
    .then((response) => {
      dispatch(
        {
          type: DELETE_ITEM_MATERIAL,
          data: response.data,
        },
      );
    });
};

export const attachImageToItemColors = (id, image, token) => (dispatch) => {
  Upload({
    endPoint: `item/:item_id/colors/${id}/image`,
    data: { image },
    sendData: (data) => dispatch({ type: ATTACH_IMAGE_TO_COLOR, data }),
  });
};

export const attachImageToItemSizes = (id, image, token) => (dispatch) => {
  Upload({
    endPoint: `item/:item_id/sizes/${id}/image`,
    data: { image },
    sendData: (data) => dispatch({ type: ATTACH_IMAGE_TO_SIZE, data }),
  });
};

export const attachImageToItemCapacity = (id, image, token) => (dispatch) => {
  Upload({
    endPoint: `item/:item_id/capacity/${id}/image`,
    data: { image },
    sendData: (data) => dispatch({ type: ATTACH_IMAGE_TO_CAPACITY, data }),
  });
};

export const attachImageToItemMaterials = (id, image, token) => (dispatch) => {
  Upload({
    endPoint: `item/:item_id/materials/${id}/image`,
    data: { image },
    sendData: (data) => dispatch({ type: ATTACH_IMAGE_TO_MATERIAL, data }),
  });
};

export default createItemAttributes;
