import React, { Component } from 'react';

import Menu from './src/components/Menu';
import {AsyncStorage} from 'react-native'
import { ThemeProvider } from './src/context/ThemeContext';

class App extends Component {

  state = {

  };
  getTheme = () => {
    AsyncStorage.getItem('theme').then((value) => {
      this.setState({darkMode: value});
    }).done();
  };



  render() {
    return (
      <ThemeProvider>
        <Menu />
      </ThemeProvider>
    );
  }
}

export default App;
