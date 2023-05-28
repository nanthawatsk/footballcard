import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from './actions/auth';

const initialState = {
  token: localStorage.getItem('auth token'),
  isAuthenticated: false,
  user: null,
  error: null,
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

    default:
      return state;
  }
};

export default authReducer;
