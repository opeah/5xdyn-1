import React, { Component } from 'react';
import Moment from 'moment';

import Menu from './src/components/layout/Navigation';
import { Store } from './src/context/AppContext';
import { config } from './src/locale/moment';

Moment.defineLocale(`fr`, config);

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
