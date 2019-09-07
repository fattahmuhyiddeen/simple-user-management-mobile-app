import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import NavigationService from 'route/NavigationService';

const backImg = require('./back.png');

export default props => (
  <TouchableOpacity style={styles.container} onPress={() => NavigationService.goBack()} {...props}>
    <Image source={backImg} style={styles.image} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    padding: 10,
    backgroundColor: 'transparent',
  },
  image: { height: '100%', width: '100%', resizeMode: 'contain' }
});
