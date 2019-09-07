import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
