import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from '@react-native-community/async-storage';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './ducks';

let store;
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['persist'],
};
const reducers = persistReducer(persistConfig, rootReducer);

export default () => {
  if (__DEV__) {
    const logger = createLogger({ collapsed: true });
    store = createStore(reducers, compose(applyMiddleware(thunk, logger)));
  } else {
    store = createStore(reducers, compose(applyMiddleware(thunk)));
  }

  persistStore(store);
  return store;
};
export const getStore = () => store;
export const dispatch = data => getStore() && getStore().dispatch(data);
