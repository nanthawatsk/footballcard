import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('auth token'),
  isAuthenticated: false,
  user: null,
  error: null,
  registrationStatus: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('auth token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        user: action.payload.user,
        error: null,
      };

    case LOGIN_FAIL:
      localStorage.removeItem('auth token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOGOUT_SUCCESS:
      localStorage.removeItem('auth token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    
    case LOGOUT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    
    case REGISTER_SUCCESS:
      localStorage.setItem('auth token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        user: action.payload.user,
        registrationStatus: 'success',
        error: null,
      };
    
    case REGISTER_FAIL:
      return {
        ...state,
        registrationStatus: 'error',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
