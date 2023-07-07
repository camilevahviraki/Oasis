const SET_CURRENT_LINK = '/redux/authentication/SET_CURRENT_LINK';
const SHOW_LOGIN_POP_UP = '/redux/authentication/SHOW_LOGIN_POP_UP';

const reusableAuth = (
  state = { showPopUp: false, link: null }, action,
) => {
  switch (action.type) {
    case SET_CURRENT_LINK: {
      return { showPopUp: true, link: action.data };
    } case SHOW_LOGIN_POP_UP: {
      return { showPopUp: action.status, link: null };
    }
    default: {
      return state;
    }
  }
};

export const showAuthPopUp = (status) => (
  { type: SHOW_LOGIN_POP_UP, status }
);

export const setCurrentLink = (data) => (
  { type: SET_CURRENT_LINK, data }
);

export default reusableAuth;
