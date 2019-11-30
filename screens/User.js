import React from 'react';
import TopBar from '../components/topBar';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';

import { signOut } from '../store/user';
import styles from '../styles';

function User(props) {
    return (
        <View style={styles.container}>
            <TopBar></TopBar>
            <Text>Hi {props.displayName}!</Text>

            <TouchableOpacity style={{ marginTop: 32 }} onPress={() => {
                props.signOutUser();
                props.navigation.navigate("Auth");
            }}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const mapState = state => ({
    displayName: state.user.displayName.trim()
})

const mapDispatch = dispatch => ({
    signOutUser: () => dispatch(signOut())
        
})

export default connect(mapState, mapDispatch)(User);