import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import Moment from 'moment';

Moment.locale('fr', {
  months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
  monthsShort: 'janv_févr_mars_avr_mai_juin_juil_août_sept_oct_nov_déc'.split('_'),
  monthsParseExact: true,
  weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
  weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
  weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm',
  },
  calendar: {
    sameDay: '[Aujourd’hui à] LT',
    nextDay: '[Demain à] LT',
    nextWeek: 'dddd [à] LT',
    lastDay: '[Hier à] LT',
    lastWeek: 'dddd [dernier à] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'dans %s',
    past: 'il y a %s',
    s: 'quelques secondes',
    m: 'une minute',
    mm: '%d minutes',
    h: 'une heure',
    hh: '%d heures',
    d: 'un jour',
    dd: '%d jours',
    M: 'un mois',
    MM: '%d mois',
    y: 'un an',
    yy: '%d ans',
  },
  dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
  ordinal: function (number) {
    return number + (number === 1 ? 'er' : 'e');
  },
  meridiemParse: /PD|MD/,
  isPM: function (input) {
    return input.charAt(0) === 'M';
  },
  // In case the meridiem units are not separated around 12, then implement
  // this function (look at locale/id.js for an example).
  // meridiemHour : function (hour, meridiem) {
  //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
  // },
  meridiem: function (hours, minutes, isLower) {
    return hours < 12 ? 'PD' : 'MD';
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4,  // Used to determine first week of the year.
  },
});

import { withThemeContext } from '../context/ThemeContext';
import TopBar from './layout/TopBar';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
    };
  }

  componentDidMount() {
    let postsUrl = `https://www.googleapis.com/calendar/v3/calendars/ifosupwavre.be_8gvh4v3v8dae5ktb21hisci9h0@group.calendar.google.com/events?key=AIzaSyCTHMnkmKEU6cMQzd6I6qG9LKvttLPf70c&singleEvents=true&orderBy=startTime`;
    fetch(postsUrl)
      .then(response => response.json())
      .then(response => {
        this.setState({
          events: response,
        });
      });
  }

  renderEvents = () => {
    if (this.state.events === null) {
      return false;
    }
    return this.state.events.items.map(event => {
      const style = { color: `${this.props.ThemeProvider.themeStyle.foreground}` };
      const day = Moment(event.start.date || event.start.dateTime)
        .format(`DD`);
      const month = Moment(event.start.date || event.start.dateTime)
        .format(`MMM`);
      return (
        <View key={event.id} style={{ ...styles.eventsItem }}>
          <View style={{ ...styles.eventsItem__left }}>
            <Text style={{ ...styles.eventsItem__day }}>{day}</Text>
            <Text style={{ ...styles.eventsItem__month }}>{month}</Text>
          </View>
          <View style={{ ...styles.eventsItem__right }}>
            <Text style={{ ...style }}>{event.summary}</Text>
            <Text style={style}>{event.end.date || event.end.dateTime}</Text>
          </View>
        </View>
      );
    });
  };

  render() {
    return (
      <View>
        <TopBar title="Calendrier" />
        <View>
          <ScrollView style={[
            styles.container,
            { backgroundColor: `${this.props.ThemeProvider.themeStyle.background}` }]}
          >
            {this.renderEvents()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  eventsItem: {
    flex: 1,
    flexDirection: `row`,
    backgroundColor: `#F7F8FC`,
    marginBottom: 20,
    padding: 20,
    borderRadius: 3,
  },
  eventsItem__left: {
    width: `20%`,
  },
  eventsItem__right: {
    width: `80%`,
  },
  eventsItem__day: {
    fontSize: 20,
    fontWeight: `800`,
  },
  eventsItem__month: {
    fontSize: 14,
    fontWeight: `500`,
  },
});

export default withThemeContext(HomeScreen);
