import React from 'react';
import { Image, Text, TouchableOpacity, StyleSheet, Dimensions, Keyboard } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';

const icon = require('./icon.png');

const AnimatedTouchable = Animatable.createAnimatableComponent(TouchableOpacity);
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

class Container extends React.Component {
  state = {
    iconContainerWidth: screenWidth,
    iconContainerHeight: screenHeight,
    iconContainerBorderRadius: 0,
    iconContainerTop: 0,
    bodyContainerTop: screenHeight,
  };

  componentDidMount() {
    this.initAnimation();
  }

  initAnimation = () => {
    this.setState({
      iconContainerWidth: 80,
      iconContainerHeight: 80,
      iconContainerBorderRadius: 40,
      iconContainerTop: 120,
      bodyContainerTop: 160,
    });
  };

  render() {
    const {device: { isKeyboardAppear }, children} = this.props;
    const { iconContainerWidth, iconContainerHeight, iconContainerBorderRadius, iconContainerTop, bodyContainerTop } = this.state;
    return (
      <>
        <AnimatedTouchable 
          transition='top' 
          activeOpacity={1} 
          onPress={Keyboard.dismiss} 
          style={[styles.bodyContainer, { top: isKeyboardAppear ? 40 : bodyContainerTop }]}
          children={children}
        />
        <AnimatedTouchable
          transition={['width', 'height', 'borderRadius', 'top']}
          style={[
            styles.iconContainer, 
            { 
              width: iconContainerWidth,
              height: iconContainerHeight,
              borderRadius: iconContainerBorderRadius,
              top: isKeyboardAppear ? 20 : iconContainerTop 
            }
          ]}
        >
          <Image source={icon} style={styles.icon} />
        </AnimatedTouchable>
      </>
    );
  }
}

const styles = StyleSheet.create({
  bodyContainer:{
    position:'absolute',
    backgroundColor: 'white',
    bottom:0,
    left:0,
    right:0,
    paddingTop: 60
  },
  iconContainer: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  icon: { width: 60, height: 60 }
});

export default connect((state) => ({
  device: state.device
}))(Container);