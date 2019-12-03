import Home from '../screens/Home'
import Articles from '../screens/Articles'
import User from '../screens/User'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Loading from '../screens/Loading'
import Add from '../screens/Search'

import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
import SingleArticle from '../screens/SingleArticle';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';


const AuthStack = createStackNavigator({
    Login,
    Signup
  });

  const HomeScreen = createStackNavigator({
    Loading,
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
    Add,
    User
  });

  const AuthSwitchNavigator = createSwitchNavigator(
    {
        Home: TabNavigator,
        Auth: AuthStack,
    }
  )

 export default createAppContainer(AuthSwitchNavigator);

