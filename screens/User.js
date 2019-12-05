import React, { useState } from 'react';
import TopBar from '../components/topBar';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';

import { signOut, updateProfile } from '../store/user';
import styles from '../styles';


function User(props) {
  const [email, updateEmail] = useState(props.user.email);
  const [displayName, updateDisplayName] = useState(props.user.displayName);
  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.userContainer}>
        <Text style={{ textAlign: 'center', padding: 10, fontSize: 30 }}>
          Edit Profile
        </Text>

        <View>
          <Text style={styles.inputTitle}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder={props.user.displayName}
            onChangeText={text => updateDisplayName(text)}
          />
        </View>

        <View>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder={props.user.email}
            onChangeText={text => updateEmail(text)}
          />

        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.updateProfile(email, displayName);
            props.navigation.navigate('Auth');
          }}
        >
          <Text style={{ fontWeight: '500' }}>Update Profile</Text>
        </TouchableOpacity>
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

User.navigationOptions = {
  header: null,
};

const mapState = state => ({
  user: state.user,
});

const mapDispatch = dispatch => ({
  updateProfile: (newEmail, newDisplayName) =>
    dispatch(updateProfile(newEmail, newDisplayName)),
  signOutUser: () => dispatch(signOut()),
});

export default connect(mapState, mapDispatch)(User);
