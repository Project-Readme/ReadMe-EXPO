import React from 'react';
import { View } from 'react-native';
import styles from '../styles'

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { connect } from 'react-redux';
import { checkInternetConnection, offlineActionCreators } from 'react-native-offline';

import { loadContentList } from '../store/contentList';
import { loadMostPopular } from '../store/mostPopularList';

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

  const HomeScreen = createStackNavigator({
    Home: Home,
    Article: SingleArticle,
  });

const UserStack = createStackNavigator({
  User: User,
});

const ArticlesStack = createStackNavigator({
  Articles: Articles,
  Article: SingleArticle
});

const TabNavigator = createBottomTabNavigator({
  HomeScreen,
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
    checkInternetConnection().then(isConnected => {
      this.props.connectionChange(isConnected);
      console.log(isConnected)
      if (isConnected) {
        this.props.loadContentList();
        this.props.loadMostPopular();
      }
    }) 
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
  loadContentList: () => dispatch(loadContentList()),
  loadMostPopular: () => dispatch(loadMostPopular()),
  connectionChange: (isConnected) => dispatch(offlineActionCreators.connectionChange(isConnected))
})

export default connect(null, mapDispatch)(Main);
