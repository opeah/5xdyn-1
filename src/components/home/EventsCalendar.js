import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import { withThemeContext } from '../../context/ThemeContext';

class EventsCalendar extends Component {
  render() {
    const { background, foreground } = this.props.ThemeProvider.themeStyle;
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

export default withThemeContext(EventsCalendar);
