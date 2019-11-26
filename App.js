import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TopBar, ReadContent } from './components';
import styles from './styles';

export default function App() {
  return (
    <View style={styles.container}>
      <TopBar />
      <ReadContent />
    </View>
  );
}
