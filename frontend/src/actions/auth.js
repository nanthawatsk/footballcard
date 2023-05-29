import api from './api';

// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';
export const GET_ERRORS = 'GET_ERRORS';
export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export const USER_LOADING = 'USER_LOADING';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const CLEAR_LEADS = 'CLEAR_LEADS';

// Action Creators
export const login = (username, password) => async (dispatch) => {
  try {
    const response = await api.post('auth/login/', { username, password });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
      
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('auth token');
    const config = {
      headers: {
        Authorization: `token ${token}`,
      },
    };

    await api.post('auth/logout/', null, config);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data,
    });
  }
};

export const register = (username, first_name, last_name, email, password, confirm_password) => async (dispatch) => {
  try {
    const response = await api.post('auth/register/', { username, first_name, last_name, email, password, confirm_password });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data,
    });
  }
};