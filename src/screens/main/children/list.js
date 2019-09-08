import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import CompleteFlatList from 'react-native-complete-flatlist';

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

  render() {
    const { users } = this.props;

    return (
      <CompleteFlatList
        backgroundStyles={{ backgroundColor: '#eee' }}
        searchKey={['name', 'email', 'created_at']}
        isRefreshing={users.isLoading}
        data={users.data}
        renderItem={(item, index) => (
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.renderItemTitle}>{item.name}</Text>
              <Text> {item.email}</Text>
            </View>
          </View>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  renderItemTitle: {
    color: 'black'
  }
});

export default connect((state) => ({
  users: state.persist.users
}))(App);
