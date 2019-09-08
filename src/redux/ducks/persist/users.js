import { dispatch } from 'root-of-redux/store';
import http from 'services/http';
import endpoints from 'config/endpoints';

const initialState = {
  isLoading: false,
  data: []
};

const GET_ALL_USERS = 'GET_ALL_USERS';
const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
const GET_ALL_USERS_FAIL = 'GET_ALL_USERS_FAIL';

export const getAllUsers = () => {
  dispatch({ type: GET_ALL_USERS });
  http.call({
    endpoint: endpoints.all_users,
    onSuccess: (data) => dispatch({ type: GET_ALL_USERS_SUCCESS, data }),
    onFail: (error) => dispatch({ type: GET_ALL_USERS_FAIL, error })
  });
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, isLoading: true }
    case GET_ALL_USERS_SUCCESS:
      return { ...state, isLoading: false, data: action.data }
    case GET_ALL_USERS_FAIL:
      return { ...state, isLoading: false, error: action.error }
    default:
      return state;
  }
}
