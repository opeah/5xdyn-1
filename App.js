import React, { Component } from 'react';
import {View} from 'react-native';
import Menu from './src/components/layout/Navigation';
import { Store } from './src/context/AppContext';

import LocalNotification from './src/notifications/NotificationsPush';

class App extends Component {
  render() {
    return (
      <Store>
        <View>
          <LocalNotification ref="localNotification"/>
        </View>
        <Menu />
      </Store>
    );
  }
}

export default App;
