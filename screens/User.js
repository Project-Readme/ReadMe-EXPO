import React from 'react';
import TopBar from '../components/topBar';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as firebase from "firebase";

export default class User extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            displayName: ""
        };
    }

    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;

        this.setState({ email, displayName });
    }

    signOutUser = () => {
        firebase.auth().signOut();
    };

    render() {
        return (
            <View style={styles.container}>
                <TopBar></TopBar>
                <Text>Hi {this.state.displayName.trim()}!</Text>

                <TouchableOpacity style={{ marginTop: 32 }} onPress={this.signOutUser}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})