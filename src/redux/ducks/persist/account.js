import { dispatch } from 'root-of-redux/store';
import http from 'services/http';
import endpoints from 'config/endpoints';

const initialState = {
  isLoading: false,
  error: null,
  token: '',
  name: '',
  email: ''
};

const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';

const REGISTER = 'REGISTER';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAIL = 'REGISTER_FAIL';

export const login = data => {
  dispatch({ type: LOGIN, data });
  http.call({
    endpoint: endpoints.login,
    data,
    onSuccess: (data) => dispatch({ type: LOGIN_SUCCESS, data }),
    onFail: (error) => dispatch({ type: LOGIN_FAIL, error })
  });
};

export const register = data => {
  dispatch({ type: REGISTER, data });
  http.call({
    endpoint: endpoints.register,
    data,
    onSuccess: (data) => dispatch({ type: REGISTER_SUCCESS, data }),
    onFail: (error) => dispatch({ type: REGISTER_FAIL, error })
  });
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
    case REGISTER:
      return { ...state, isLoading: true }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return { ...state, isLoading: false, ...action.data }
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return { ...state, isLoading: false }
    default:
      return state;
  }
}
