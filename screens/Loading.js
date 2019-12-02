import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { connect } from 'react-redux';

import styles from '../styles';

class LoadingScreen extends React.Component {

    componentDidMount() {
        const {user} = this.props;
        this.props.navigation.navigate(user.email ? "Home" : "Auth");
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        );
    }
}

const mapState = state => ({
    user: state.user
})

export default connect(mapState)(LoadingScreen);