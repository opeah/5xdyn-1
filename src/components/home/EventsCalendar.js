import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { withAppContext } from '../../context/AppContext';

class EventsCalendar extends Component {
  render() {
    return (
      <View style={styles.EventsCalendar}>
        <Text>Calendrier</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  EventsCalendar: {
    padding: 20,
  },
});

EventsCalendar.propTypes = {
  events: PropTypes.array,
};

export default withAppContext(EventsCalendar);
