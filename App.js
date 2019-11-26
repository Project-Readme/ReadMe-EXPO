import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import db from './database';
import styles from './styles'

import ReadContent from './components/readContent';
import TopBar from './components/topBar';



export default function App() {
  return (
    <View style={styles.container}>
      <TopBar />
      <ReadContent />
    </View>
  );
}

