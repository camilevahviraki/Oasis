const STORE_ITEM_LINK = "/redux/authentication/SET_ITEM_LINK";

const itemLinkReducer = (
    state = {link: null}, action ) => {
    switch (action.type) {
      case STORE_ITEM_LINK: {
        localStorage.setItem("storeItemLink", action.data.link);
        localStorage.setItem('current-item-id', action.data.itemId);
        return action.data;
      }default: {
        const link = localStorage.getItem('storeItemLink');
        const itemId = localStorage.getItem('current-item-id');
        if(link){
            return {link: link, itemId: itemId};
        }
        return state;
      }
    }
}

export const setItemLink = (link, itemId) => (
    {
        type: STORE_ITEM_LINK,
        data: {link, itemId},
    }
)

export default itemLinkReducer;
