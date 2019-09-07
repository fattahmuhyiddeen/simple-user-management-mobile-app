import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'root-of-redux/store';
import App from './App';

export default () => (
  <Provider store={configureStore()}>
    <App />
  </Provider>
);
