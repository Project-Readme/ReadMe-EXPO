import React from 'react';
import { Text, View } from 'react-native';
import TopBar from '../components/topBar';
import styles from '../styles'


const Home = props => {
    return (
        <View style={styles.homeContainer}>
            <TopBar />
            {/* <Text>hi</Text> */}
        </View>
    )
}

export default Home;