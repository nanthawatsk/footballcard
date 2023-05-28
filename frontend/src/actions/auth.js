import api from './api';

// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';

// Action Creators
export const login = (username, password) => async (dispatch) => {
  try {
    const response = await api.post('login/', { username, password });
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
      const token = localStorage.getItem('AuthToken'); // Retrieve the token from storage
      const config = {
        headers: {
          Authorization: `Token ${token}`, // Include the token in the request headers
        },
      };
  
      await api.post('logout/', null, config); // Make sure the URL is correct
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({
        type: LOGOUT_FAIL,
        payload: error.response.data,
      });
    }
  };
  