/* eslint-disable react/display-name */
import React from 'react';
import Home from '../screens/Home';
import Articles from '../screens/Articles';
import User from '../screens/User';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Loading from '../screens/Loading';
import Add from '../screens/Search';

import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
import SingleArticle from '../screens/SingleArticle';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { SimpleLineIcons } from '@expo/vector-icons';
import styles from '../styles';

const AuthStack = createStackNavigator({
  Login,
  Signup,
});

const HomeScreen = createStackNavigator({
  Home: Home,
  Article: SingleArticle,
});

const UserStack = createStackNavigator({
  User: User,
});

const ArticlesStack = createStackNavigator({
  Articles: Articles,
  Article: SingleArticle,
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    Articles: { screen: ArticlesStack },
    Add,
    User: { screen: UserStack },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = SimpleLineIcons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `home`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
        } else if (routeName === 'User') {
          iconName = `user`;
        } else if (routeName === 'Add') {
          iconName = `magnifier-add`;
        } else if (routeName === 'Articles') {
          iconName = `book-open`;
        }

        // You can return any component that you like here!
        return (
          <IconComponent
            name={iconName}
            size={24}
            color={focused ? '#a82323' : 'gray'}
            style={{ marginTop: 10 }}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: '#a82323',
      inactiveTintColor: 'gray',
    },
  }
);

const AuthSwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: Loading,
    Home: TabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default createAppContainer(AuthSwitchNavigator);
