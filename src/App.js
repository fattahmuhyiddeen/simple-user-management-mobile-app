import React from 'react';
import { Keyboard, Platform } from 'react-native';
import Route from 'route';
import NavigationService from 'route/NavigationService';
import * as deviceActions from 'ducks/device';

class App extends React.PureComponent {
  componentDidMount() {
    Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      this.onKeyboardAppear
    );
    Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      this.onKeyboardHide
    );
  }

  onKeyboardAppear = e =>
    deviceActions.setKeyboard({
      isKeyboardAppear: true,
      keyboardHeight: e.endCoordinates.height,
    });

  onKeyboardHide = () =>
    deviceActions.setKeyboard({ isKeyboardAppear: false, keyboardHeight: 0 });

  render() {
    return (
      <Route
        ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)}
      />
    );
  }
}
export default App;
