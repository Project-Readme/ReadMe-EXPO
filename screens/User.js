import React from 'react';
import TopBar from '../components/topBar';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';

import { signOut } from '../store/user';
import styles from '../styles';

function User(props) {
  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.userContainer}>
        <Text>Hi {props.displayName}!</Text>
        <TextInput style={{ backgroundColor: '#de6d7a' }} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.signOutUser();
            props.navigation.navigate('Auth');
          }}
        >
          <Text style={{ fontWeight: '500' }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const mapState = state => ({
  displayName: state.user.displayName
    ? state.user.displayName.trim()
    : 'friend',
});

const mapDispatch = dispatch => ({
  signOutUser: () => dispatch(signOut()),
});

export default connect(mapState, mapDispatch)(User);
