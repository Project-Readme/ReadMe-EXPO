import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles';

export default function () {
    return (
        <View style={styles.topBar}>
            <Image
style={{ width: 50, height: 50 }}
                source={require('../assets/icon.png')} />
            <Text style={{ color: 'white', fontSize: 20 }}>
                ReadMe: Reading Made Easy
            </Text>
        </View>
    )
}
