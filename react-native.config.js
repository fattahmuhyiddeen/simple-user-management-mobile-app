module.exports = {
  dependencies: {
    'react-native-device-info': {
      platforms: {
        android: {
          packageInstance: 'new RNDeviceInfo(false)',
        },
      },
    },
  },
};