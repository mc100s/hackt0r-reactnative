import { StackNavigator } from 'react-navigation'
import GuessActorScreen from '../Containers/GuessActorScreen'
import HomeScreen from '../Containers/HomeScreen'
import TextablesScreen from '../Containers/TextablesScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  GuessActorScreen: { screen: GuessActorScreen },
  HomeScreen: { screen: HomeScreen },
  TextablesScreen: { screen: TextablesScreen },
  LaunchScreen: { screen: LaunchScreen },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: { title: 'Login' }
  }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'HomeScreen',
  navigationOptions: {
    header: {
      style: styles.header
    }
  }
})

export default PrimaryNav
