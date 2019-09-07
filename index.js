/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src';
import { name } from './app.json';
console.disableYellowBox = true;
AppRegistry.registerComponent(name, () => App);
