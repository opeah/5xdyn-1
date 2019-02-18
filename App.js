import React from 'react';
import {createBottomTabNavigator, createAppContainer, navigation} from 'react-navigation';


import HomeScreen from './src/components/HomeScreen';
import ProfileScreen from './src/components/ProfileScreen';
import SettingsScreen from './src/components/SettingsScreen';
import IconTabBottom from './src/components/IconTabBottom';
import TabBarBottom from './src/components/TabBarBottom';


const TabBarComponent = () => <TabBarBottom navigation={'Home'} src={require('./assets/images/calendar.png')}/>;


const TabNavigator = createBottomTabNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({}) => (
          <IconTabBottom src={require('./assets/images/calendar.png')}/>
        )
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({}) => (
          <IconTabBottom src={require('./assets/images/profile.png')}/>
        )
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarIcon: ({}) => (
          <IconTabBottom src={require('./assets/images/console.png')}/>
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
      }
    },
    initialRoute: HomeScreen,

  }
);

export default createAppContainer(TabNavigator);


/*defaultNavigationOptions: ({navigation}) => ({
  tabBarIcon: () => {
    // You can return any component that you like here!
    const {routeName} = navigation.state;
    if (routeName === 'Home') {
      return <IconTabBottom src={require('./assets/images/calendar.png')}/>;
    }
    if (routeName === 'Profile') {
      return <IconTabBottom src={require('./assets/images/profile.png')}/>;
    }
    if (routeName === 'Settings') {
      return <IconTabBottom src={require('./assets/images/calendar.png')}/>;
    }
  },
}),*/