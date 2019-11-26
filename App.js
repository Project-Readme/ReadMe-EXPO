import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import db from './database';
import { Provider } from 'react-redux';
import styles from './styles'
import store from './store';
import ReadContent from './components/readContent';
import TopBar from './components/topBar';


export default function App() {
  return (
    <Provider store={store} >
      <View style={styles.container}>
        <TopBar />
        <ReadContent />
      </View>
    </Provider>
  );
}

