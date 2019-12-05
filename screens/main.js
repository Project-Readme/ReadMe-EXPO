import React from 'react';
import { View } from 'react-native';
import styles from '../styles'

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { connect } from 'react-redux';
import { checkInternetConnection, offlineActionCreators } from 'react-native-offline';

import { loadContentList } from '../store/contentList';
import { loadMostPopular } from '../store/mostPopularList';

import Home from './Home'
import Articles from './Articles'
import User from './User'
import Login from './Login'
import Signup from './Signup'
import Loading from './Loading'
import Search from './Search'

import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
import SingleArticle from './SingleArticle';

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
  Home: HomeScreen,
  Articles: ArticlesStack,
  Add: Search,
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
      if (isConnected && this.props.user) {
        this.props.loadContentList(this.props.user);
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

const mapStateToProps = state => ({
  user: state.user.email
});

const mapDispatch = dispatch => ({
  loadContentList: (user) => dispatch(loadContentList(user)),
  loadMostPopular: () => dispatch(loadMostPopular()),
  connectionChange: (isConnected) => dispatch(offlineActionCreators.connectionChange(isConnected))
})

export default connect(mapStateToProps, mapDispatch)(Main);
