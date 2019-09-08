import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Keyboard, Alert } from 'react-native';
import { connect } from 'react-redux';
import CompleteTextInput from 'react-native-complete-textinput';
import SwitchSelector from 'react-native-switch-selector';
import * as accountActions from 'ducks/persist/account';

const options = [
  { label: 'Login', value: 'login' },
  { label: 'Register', value: 'register' }
];

const nameRegex = /^[a-zA-Z ]+$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^([0-9]|[a-z])+([0-9a-z]+)$/i
class App extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    tab: 'login'
  };

  get isRegister() {
    return this.state.tab === 'register';
  }

  buttonPressed = () => {
    if (this.props.account.isLoading) return;

    const { password } = this.state;

    if (this.isRegister && !nameRegex.test(this.state.name)) {
      return Alert.alert('Sorry', 'Please enter correct name. Name can only letters and spaces only');
    }

    if (!emailRegex.test(this.state.email)) {
      return Alert.alert('Sorry', 'Please enter correct email');
    }

    if (!emailRegex.test(this.state.email)) {
      return Alert.alert('Sorry', 'Please enter correct email');
    }

    if (!password || !passwordRegex.test(password)) {
      return Alert.alert('Sorry', 'Please enter correct password. Only alphanumeric is allowed');
    }

    accountActions[this.isRegister ? 'register' : 'login'](this.state);
    Keyboard.dismiss();
  }

  render() {
    const { isLoading } = this.props.account;
    return (
      <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={styles.container}>
        <SwitchSelector
          style={styles.tabStyle}
          buttonColor={'red'}
          value={this.state.tab}
          options={options}
          borderColor='red'
          disabled={isLoading}
          onPress={tab => this.setState({ tab })}
        />
        {this.isRegister &&
          <CompleteTextInput
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
            textColor='black'
            editable={!isLoading}
            customStyle={styles.input}
            placeholder='Name'
          />
        }
        <CompleteTextInput
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          textColor='black'
          keyboardType='email-address'
          editable={!isLoading}
          customStyle={styles.input}
          placeholder='Email'
        />
        <CompleteTextInput
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          textColor='black'
          secureTextEntry
          editable={!isLoading}
          customStyle={styles.input}
          placeholder='Password'
        />
        <TouchableOpacity onPress={() => this.buttonPressed()} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>{this.isRegister ? 'Register' : 'Login'}</Text>
          {isLoading && <View style={styles.loading}><ActivityIndicator color='white' /></View>}
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 60,
    backgroundColor: 'white',
    paddingBottom: 100
  },
  input: {
    borderBottomWidth: 0.5,
    borderColor: 'black',
    width: '100%',
    alignSelf: 'center'
  },

  tabStyle: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: 'red',
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 10,
    marginVertical: 20
  },
  buttonText: {
    color: 'white'
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#00000033',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default connect((state) => ({
  account: state.persist.account
}))(App);
