import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import CompleteFlatList from 'react-native-complete-flatlist';
import * as usersAction from 'ducks/persist/users';

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
        searchKey={['name']}
        isRefreshing={users.isLoading}
        pullToRefreshCallback={() => usersAction.getAllUsers()}
        data={users.data}
        renderItem={(item, index) => (
          <View style={{ flex: 1, padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.renderItemTitle}>{item.name}</Text>
              <Text> {item.email}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.renderItemTitle}>Registered at</Text>
              <Text> {item.created_at}</Text>
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
