import React, { Component } from 'react';
import Moment from 'moment';

import Navigation from './src/components/layout/Navigation';
import { Store } from './src/context/AppContext';
import { config } from './src/locale/moment';

Moment.defineLocale(`fr`, config);

class App extends Component {
  render() {
    return (
      <Store>
        <Navigation />
      </Store>
    );
  }
}

export default App;
