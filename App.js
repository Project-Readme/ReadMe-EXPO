import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import db from './database';
import { Provider } from 'react-redux';
import styles from './styles'
<<<<<<< HEAD

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

=======
import store from './store';
>>>>>>> e6e4fb3101e49cadb4d88ee74860c50f2921733e
import ReadContent from './components/readContent';
import Home from './screens/Home'
import Articles from './screens/Articles'
import User from './screens/User'

const TabNavigator = createBottomTabNavigator({
  Home: { screen: Home },
  Articles: { screen: Articles },
  User: { screen: User }
});

<<<<<<< HEAD
const BottomTabNavigator = createAppContainer(TabNavigator);

export default function App() {
  return (
    <View style={styles.container}>

      {/* <ReadContent /> */}
      <BottomTabNavigator></BottomTabNavigator>
    </View>
=======
export default function App() {
  return (
    <Provider store={store} >
      <View style={styles.container}>
        <TopBar />
        <ReadContent />
      </View>
    </Provider>
>>>>>>> e6e4fb3101e49cadb4d88ee74860c50f2921733e
  );
}
