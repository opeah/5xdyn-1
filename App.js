import React, { Component } from 'react';

import Menu from './src/components/layout/Navigation';
import { Store } from './src/context/AppContext';

class App extends Component {
  render() {
    return (
      <Store>
        <Menu />
      </Store>
    );
  }
}

export default App;
