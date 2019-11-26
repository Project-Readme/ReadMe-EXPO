import React from 'react';
import { View } from 'react-native';
import styles from '../styles'

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { connect } from 'react-redux';

import { loadContentList } from '../store/contentList';


import Home from '../screens/Home'
import Articles from '../screens/Articles'
import User from '../screens/User'


import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
import SingleArticle from '../screens/SingleArticle';

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

const BottomTabNavigator = createAppContainer(TabNavigator);

class Main extends React.Component {

    componentDidMount() {
        this.props.loadContentList();
    }

    render() {
        return (
            <View style={styles.container}>
                <BottomTabNavigator />
            </View>
        );
    }
}

const mapDispatch = dispatch => ({
    loadContentList: () => dispatch(loadContentList())
})

export default connect(null, mapDispatch)(Main);
