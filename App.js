import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import db from './database';
import styles from './styles'

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import store from './store';
import ReadContent from './components/readContent';
import Home from './screens/Home'
import Articles from './screens/Articles'
import User from './screens/User'

const TabNavigator = createBottomTabNavigator({
  Home: { screen: Home },
  Articles: { screen: Articles },
  User: { screen: User }
});

const BottomTabNavigator = createAppContainer(TabNavigator);

export default function App() {
  return (
    <Provider store={store} >
      <View style={styles.container}>
        <BottomTabNavigator />
      </View>
    </Provider>
  );
}

