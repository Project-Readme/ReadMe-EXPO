import React from 'react';
import TopBar from '../components/topBar';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';

import { signOut, updateProfile } from '../store/user';
import styles from '../styles';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <TopBar />
        <View style={styles.userContainer}>
          <Text style={{ textAlign: 'center', padding: 10, fontSize: 50 }}>
            Edit Profile
          </Text>
          <TextInput style={styles.input} />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.updateProfile();
            }}
          >
            <Text style={{ fontWeight: '500' }}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.signOutUser();
              this.props.navigation.navigate('Auth');
            }}
          >
            <Text style={{ fontWeight: '500' }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapState = state => ({
  displayName: state.user.displayName
    ? state.user.displayName.trim()
    : 'friend',
});

const mapDispatch = dispatch => ({
  updateProfile: () => dispatch(updateProfile()),
  signOutUser: () => dispatch(signOut()),
});

export default connect(mapState, mapDispatch)(User);
