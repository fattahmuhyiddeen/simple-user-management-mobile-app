import React from 'react';
import { View, TouchableOpacity, Keyboard, StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { connect } from 'react-redux';
import Container from './children/container';
import Auth from './children/auth';

class App extends React.Component {
  render() {
    const { token } = this.props.account;
    return (
      <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1} style={{ flex: 1, backgroundColor: 'red' }}>
        <Container>
          {!token && <Auth />}
        </Container>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
});

export default connect((state) => ({
  account: state.persist.account
}))(App);
