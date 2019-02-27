import React, { Component } from 'react';
import { View } from 'react-native';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import PropTypes from 'prop-types';

import { config } from '../../locale/calendar';
import { withThemeContext } from '../../context/ThemeContext';

LocaleConfig.locales['fr'] = config;
LocaleConfig.defaultLocale = 'fr';

class EventsCalendar extends Component {
  render() {
    const { background, foreground } = this.props.ThemeProvider.themeStyle;
    return (
      <View>
        <CalendarList theme={{
          calendarBackground: `${background}`,
          textSectionTitleColor: `${foreground}`,
          monthTextColor: `${foreground}`,
        }} />
      </View>
    );
  }
}

EventsCalendar.propTypes = {
  events: PropTypes.array,
};

export default withThemeContext(EventsCalendar);
