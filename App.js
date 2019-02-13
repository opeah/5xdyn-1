import React from 'react';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';

import HomeScreen from './src/components/HomeScreen';
import SettingsScreen from './src/components/SettingsScreen';

const TabNavigator = createBottomTabNavigator({
  Home: {screen: HomeScreen},
  Settings: {screen: SettingsScreen},
});

export default createAppContainer(TabNavigator);
