import { createStackNavigator, createAppContainer } from 'react-navigation';

import Main from 'screens/main';

const config = {
  headerMode: 'none'
};

const AppNavigator = createStackNavigator(
  {
    Main: { screen: Main },
  },
  config
);

export default createAppContainer(AppNavigator);
