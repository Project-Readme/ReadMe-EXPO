import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { loadContentList } from '../store/contentList';
import { loadMostPopular } from '../store/mostPopularList';
import { checkInternetConnection, offlineActionCreators } from 'react-native-offline';

import styles from '../styles';

class LoadingScreen extends React.Component {

    componentDidMount() {
        const {user} = this.props;
        checkInternetConnection().then(isConnected => {
            this.props.connectionChange(isConnected);
            if (isConnected && this.props.user) {
                this.props.loadContentList(this.props.user);
                this.props.loadMostPopular();
            }
        })
        this.props.navigation.navigate(user.email ? 'Home' : 'Auth');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
                <ActivityIndicator size="large" />
            </View>
        );
    }
}

const mapState = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    loadContentList: (user) => dispatch(loadContentList(user)),
    loadMostPopular: () => dispatch(loadMostPopular()),
    connectionChange: (isConnected) => dispatch(offlineActionCreators.connectionChange(isConnected))
})

export default connect(mapState, mapDispatchToProps)(LoadingScreen);
