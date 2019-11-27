import React from 'react';
import { View } from 'react-native';
import styles from '../styles'

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { connect } from 'react-redux';

import { loadContentList } from '../store/contentList';

import Home from '../screens/Home'
import Articles from '../screens/Articles'
import User from '../screens/User'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Loading from '../screens/Loading'

import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
import SingleArticle from '../screens/SingleArticle';

const AuthStack = createStackNavigator({
  Login,
  Signup
});

const HomeStack = createStackNavigator({
  Home: Home,
});

const UserStack = createStackNavigator({
  User: User,
});

const ArticlesStack = createStackNavigator({
  Articles: Articles,
  Article: SingleArticle
});

const TabNavigator = createBottomTabNavigator({
  Home,
  ArticlesStack,
  User
});

const AuthSwitchNavigator = createSwitchNavigator(
  {
    Loading,
    Home: TabNavigator,
    Auth: AuthStack
  }
)

const SwitchNavigator = createAppContainer(AuthSwitchNavigator);

class Main extends React.Component {

  componentDidMount() {
    this.props.loadContentList();
  }

  render() {
    return (
      <View style={styles.container}>
        <SwitchNavigator />
      </View>
    );
  }
}

const mapDispatch = dispatch => ({
  loadContentList: () => dispatch(loadContentList())
})

export default connect(null, mapDispatch)(Main);
