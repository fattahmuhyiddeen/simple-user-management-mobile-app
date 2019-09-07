import { combineReducers } from 'redux';
import persist from './persist';
import device from './device';

export default combineReducers({
  persist,
  device
});
