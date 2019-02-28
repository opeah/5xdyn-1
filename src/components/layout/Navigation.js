import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';

import HomeScreen from '../../screens/HomeScreen';
import LessonsScreen from '../../screens/LessonsScreen';
import SettingsScreen from '../../screens/SettingsScreen';

const TabNavigator = createBottomTabNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          let IconComponent = Ionicons;
          const iconName = `ios-calendar`;
          return <IconComponent name={iconName} size={36} color={tintColor} />;
        },
      },
    },
    Lessons: {
      screen: LessonsScreen,
      navigationOptions: {
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          let IconComponent = Ionicons;
          const iconName = `ios-list`;
          return <IconComponent name={iconName} size={36} color={tintColor} />;
        },
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          let IconComponent = Ionicons;
          const iconName = `ios-cog`;
          return <IconComponent name={iconName} size={36} color={tintColor} />;
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#E76F51',
      inactiveTintColor: '#444444',
      showLabel: false,
      style: {
        backgroundColor: `#1F1F1F`,
        paddingTop: Platform.OS === `android` ? 30 : 0,
        paddingBottom: Platform.OS === `android` ? 30 : 0,
      },
    },
    initialRoute: HomeScreen,
  },
);

export default createAppContainer(TabNavigator);
