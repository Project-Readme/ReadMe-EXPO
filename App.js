import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import db from './database';
import { Provider } from 'react-redux';
import styles from './styles'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import store from './store';
import Home from './screens/Home';
import Articles from './screens/Articles';
import User from './screens/User';
import { createStackNavigator } from 'react-navigation-stack';
import SingleArticle from './screens/SingleArticle';

const ArticlesStack = createStackNavigator({
  Articles: Articles,
  Article: SingleArticle
});

const HomeStack = createStackNavigator({
  Home: Home,
});

const UserStack = createStackNavigator({
  User: User,
});

const TabNavigator = createBottomTabNavigator({
  Home,
  ArticlesStack,
  User
});

export const BottomTabNavigator = createAppContainer(TabNavigator);

export default function App() {
  return (
    <Provider store={store} >
      <View style={styles.container}>
        <BottomTabNavigator />
      </View>
    </Provider>
  );
}
