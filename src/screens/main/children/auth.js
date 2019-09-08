import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import CompleteTextInput from 'react-native-complete-textinput';
import SwitchSelector from 'react-native-switch-selector';
import * as accountActions from 'ducks/persist/account';

const options = [
  { label: 'Login', value: 'login' },
  { label: 'Register', value: 'register' }
];

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

  buttonPressed = () => accountActions[this.isRegister ? 'register' : 'login'](this.state);

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={styles.container}>
        <SwitchSelector style={styles.tabStyle} buttonColor={'red'} value={this.state.tab} options={options} borderColor='red' onPress={tab => this.setState({ tab })} />
        {this.isRegister &&
          <CompleteTextInput
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
            textColor='black'
            customStyle={styles.input}
            placeholder='Name'
          />
        }
        <CompleteTextInput
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          textColor='black'
          customStyle={styles.input}
          placeholder='Email'
        />
        <CompleteTextInput
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          textColor='black'
          secureTextEntry
          customStyle={styles.input}
          placeholder='Password'
        />
        <TouchableOpacity onPress={() => this.buttonPressed()} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>{this.isRegister ? 'Register' : 'Login'}</Text>
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
  }
});

export default connect((state) => ({
}))(App);
