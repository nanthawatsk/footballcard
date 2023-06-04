import api from './api';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';


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
    window.location.href = '/login';
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