import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles';

export default function() {
  return (
    <View style={styles.topBar}>
      <Image
        style={{ marginTop: 10, marginRight: 10, width: 50, height: 50 }}
        source={require('../assets/icon.png')}
      />
      <Text style={{ marginTop: 10, color: 'white', fontSize: 20 }}>
        ReadMe: Reading on the Go
      </Text>
    </View>
  );
}
