const SET_STORE_LINK = "/redux/authentication/SET_STORE_LINK";

const storeLinkReducer = (
    state = {link: null}, action ) => {
    switch (action.type) {
      case SET_STORE_LINK: {
        return action.data;
      }default: {
        const link = JSON.parse(localStorage.getItem('storeLink'));
        if(link){
            return {link: link};
        }
        return state;
      }
    }
}

export const setStoreLink = (link) => (
    {
        type: SET_STORE_LINK,
        data: {link}
    }
)

export default storeLinkReducer;