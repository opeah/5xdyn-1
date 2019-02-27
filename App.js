import React, { Component } from 'react';

import Menu from './src/components/menu/Navigation';
import { ThemeProvider } from './src/context/ThemeContext';



class App extends Component {


  render() {
    return (
      <ThemeProvider>
        <Menu />
      </ThemeProvider>
    );
  }
}

export default App;
