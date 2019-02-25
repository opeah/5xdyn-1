import React from 'react';
import { createBottomTabNavigator, createAppContainer, navigation } from 'react-navigation';

import HomeScreen from '../../src/components/HomeScreen';
import ProfileScreen from '../../src/components/ProfileScreen';
import SettingsScreen from '../../src/components/SettingsScreen';
import IconTabBottom from '../../src/components/IconTabBottom';

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
      screen: ProfileScreen,
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
