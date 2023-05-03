const ADD_NEW_ITEM_ID = "redux/store/createCartsReducer/ADD_NEW_ITEM_ID";
const DELETE_CART_ITEM_ID = "redux/store/createCartsReducer/DELETE_CART_ITEM_ID";

const addedToCartIdList = (state = {data :[]}, action) => {
    switch (action.type) {
      case  ADD_NEW_ITEM_ID: {
        const newState = {
            data: [...state.data, action.data],
        }
        localStorage.setItem('addedToCartIdList', JSON.stringify(newState));
        return newState;
      }case DELETE_CART_ITEM_ID: {
        const newData =  state.data.filter(id => id !== action.data);
        const newState = {
            data: newData,
        }
        console.log(newData);
        console.log('================',action.data,'==================||||||||=================')
        localStorage.setItem('addedToCartIdList', JSON.stringify(newState));
        return newState;
      }
      default:{
        const savedData = localStorage.getItem('addedToCartIdList');
        if(savedData){
            return JSON.parse(savedData);
        }
        return state;
      }
    }
  };

export const addNewItemIdToCartList = (data) => ({
    type: ADD_NEW_ITEM_ID,
    data,
});

export const deleteItemIdToCartList = (data) => ({
    type: DELETE_CART_ITEM_ID,
    data,
});

export default addedToCartIdList;  
  