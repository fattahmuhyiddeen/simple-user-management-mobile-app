import { combineReducers } from 'redux';
import account from './account';
import users from './users';

export default combineReducers({
  account,
  users,
});
