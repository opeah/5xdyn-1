import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import { withAppContext } from '../../context/AppContext';

class EventsCalendar extends Component {
  render() {
    return (
      <View>
        <Text>Calendrier</Text>
      </View>
    );
  }
}

EventsCalendar.propTypes = {
  events: PropTypes.array,
};

export default withAppContext(EventsCalendar);
