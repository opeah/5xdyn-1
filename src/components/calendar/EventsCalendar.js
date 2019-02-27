import React, { Component } from 'react';
import { View } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

class EventsCalendar extends Component {
  render() {
    return (
      <View>
        <Calendar
          markedDates={{
            '2019-02-28': { marked: true },
            '2019-02-27': { marked: true },
            '2019-02-26': { marked: true, dotColor: 'red', activeOpacity: 0 },
            '2019-02-25': { disabled: true, disableTouchEvent: true },
          }}
        />
      </View>
    );
  }
}

export default EventsCalendar;
