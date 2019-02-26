import React from 'react';
import { createBottomTabNavigator, createAppContainer, navigation } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LessonsScreen from '../screens/LessonsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import IconTabBottom from './IconTabBottom';

const TabNavigator = createBottomTabNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({}) => (
          <IconTabBottom src={require('../../assets/images/calendar.png')} />
        ),
      },
    },
    Profile: {
      screen: LessonsScreen,
      navigationOptions: {
        tabBarIcon: ({}) => (
          <IconTabBottom src={require('../../assets/images/profile.png')} />
        ),
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarIcon: ({}) => (
          <IconTabBottom src={require('../../assets/images/console.png')} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'orange',
      inactiveTintColor: 'gray',
      showLabel: false,
      style: {
        paddingTop: 20,
      },
    },
    initialRoute: HomeScreen,
  },
);

export default createAppContainer(TabNavigator);
