import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from '@react-native-community/async-storage';
import rootReducer from './ducks';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

let store;
const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['persist_'],
};
const reducers = persistReducer(persistConfig, rootReducer);

export default () => {
  if (__DEV__) {
    const logger = createLogger({ collapsed: true });
    store = createStore(reducers, compose(applyMiddleware(sagaMiddleware, logger)));
  } else {
    store = createStore(reducers, compose(applyMiddleware(sagaMiddleware)));
  }
  sagaMiddleware.run(rootSaga);

  persistStore(store);
  return store;
};
export const getStore = () => store;
export const dispatch = data => getStore() && getStore().dispatch(data);
