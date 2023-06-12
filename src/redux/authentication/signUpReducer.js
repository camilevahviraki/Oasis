import axios from 'axios';
import Upload from '../upload';

const SIGNUP_USER = '/redux/authentication/SIGNUP_USER';
const LOGIN_USER = '/redux/authentication/LOGIN_USER';
const USER_RESET_PASSWORD = '/redux/authentication/USER_RESET_PASSWORD';
const USER_UPDATE_ACCOUNT = '/redux/authentication/USER_UPDATE_ACCOUNT';
const USER_LOGOUT = '/redux/authentication/USER_LOGOUT';
const USER_DELETE_ACCOUNT = '/redux/authentication/USER_DELETE_ACCOUNT';
const USER_UPDATE_PASSWORD = '/redux/authentication/USER_UPDATE_PASSWORD';

const authenticationReducer = (
  state = { user: {} }, action,
) => {
  switch (action.type) {
    case SIGNUP_USER: {
      saveToStorage(action.data);
      return action.data;
    }
    case LOGIN_USER: {
      saveToStorage(action.data);
      return action.data;
    }
    case USER_RESET_PASSWORD: {
      return action.data;
    }
    case USER_UPDATE_ACCOUNT: {
      return action.data;
    }
    case USER_LOGOUT: {
      localStorage.clear();
      return { user: {} };
    }
    case USER_DELETE_ACCOUNT: {
      localStorage.clear();
      return { user: {} };
    }
    case USER_UPDATE_PASSWORD: {
      return action.data;
    }
    default: {
      const savedData = JSON.parse(localStorage.getItem('userCredentials'));
      console.log(savedData);
      if (savedData && savedData !== 'null') {
        return savedData;
      }
      return state;
    }
  }
};

export const signUpUser = (userData) => (dispatch) => {
  Upload({
    data: userData,
    endPoint: 'users',
    dispatcthAuthResponse: (data) => dispatch({ type: SIGNUP_USER, data }),
  });
};

export const loginUser = (userData) => (dispatch) => {
  Upload({
    data: userData,
    endPoint: 'users/sign_in',
    dispatcthAuthResponse: (data) => dispatch({ type: LOGIN_USER, data }),
  });
};

export const userResetPassword = (userData) => (dispatch) => {
  Upload({
    data: userData,
    endPoint: 'users/password',
    dispatcthAuthResponse: (data) => dispatch({ type: USER_RESET_PASSWORD, data }),
  });
};

export const userUpdateAccount = (userData) => (dispatch) => {
  Upload({
    data: userData,
    endPoint: 'users',
    method: axios.put,
    dispatcthAuthResponse: (data) => dispatch({ type: USER_UPDATE_ACCOUNT, data }),
  });
};

export const userLogout = (userData) => (dispatch) => {
  // Upload({
  //     data: userData,
  //     endPoint: 'users/sign_out',
  //     method: axios.delete,
  //     dispatcthAuthResponse: (data) => dispatch({type: USER_LOGOUT, data})});
  dispatch({ type: USER_LOGOUT });
};

export const userDeleteAccount = (userData) => (dispatch) => {
  Upload({
    data: userData,
    endPoint: 'users',
    method: axios.delete,
    dispatcthAuthResponse: (data) => dispatch({ type: USER_DELETE_ACCOUNT, data }),
  });
};

export const userUpdatePassword = (userData) => (dispatch) => {
  Upload({
    data: userData,
    endPoint: 'users/password',
    method: axios.put,
    dispatcthAuthResponse: (data) => dispatch({ type: USER_UPDATE_PASSWORD, data }),
  });
};

const saveToStorage = (data) => {
  localStorage.setItem('userCredentials', JSON.stringify(data));
};

export default authenticationReducer;
