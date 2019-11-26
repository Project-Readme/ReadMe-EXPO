import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles';

export default function () {
    return (
        <View >
            <Image style={{ width: 50, height: 50 }}
                source={require('../assets/icon.png')}>

            </Image>
            <Text style={{ color: 'black', fontSize: 30 }}>
                ReadMe: Reading Made Easy
            </Text>
        </View>
    )
}