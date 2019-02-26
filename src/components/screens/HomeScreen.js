import React from 'react';
import { Text, View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Moment from 'moment';

import { withThemeContext } from '../../context/ThemeContext';
import TopBar from '../layout/TopBar';

Moment.locale(`fr`, {
  months: 'Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre'.split('_'),
  monthsShort: 'jan_fév_mar_avr_mai_jui_jui_aoû_sep_oct_nov_déc'.split('_'),
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

class HomeScreen extends React.Component {
  state = {
    events: null,
    sortedEvents: null,
  };

  sortEventsByYear = () => {
    const sortedEvents = {};
    if (this.state.events !== null) {
      this.state.events.filter(event => {
        const start = event.start.date || event.start.dateTime;
        const year = Moment(start)
          .format(`YYYY`);
        const number = Moment(start)
          .format('M');
        const month = Moment(start)
          .format('MMMM');
        if (sortedEvents[year] === undefined) {
          sortedEvents[year] = {};
        }
        if (sortedEvents[year][number] === undefined) {
          sortedEvents[year][number] = {
            month,
            events: [],
          };
        }
        sortedEvents[year][number].events.push(event);
      });
    }
    this.setState({ sortedEvents });
  };

  componentDidMount() {
    let postsUrl = `https://www.googleapis.com/calendar/v3/calendars/ifosupwavre.be_8gvh4v3v8dae5ktb21hisci9h0@group.calendar.google.com/events?key=AIzaSyCTHMnkmKEU6cMQzd6I6qG9LKvttLPf70c&singleEvents=true&orderBy=startTime`;
    fetch(postsUrl)
      .then(response => response.json())
      .then(response => {
        this.setState({
          events: response.items,
        }, () => this.sortEventsByYear());
      });
  }

  renderEvents = () => {
    if (this.state.sortedEvents === null) {
      return false;
    }
    return Object.keys(this.state.sortedEvents)
      .map(year => {
        return (
          <View key={year}>
            <Text style={{
              ...styles.eventsList__year,
              color: this.props.ThemeProvider.themeStyle.foreground,
            }}>{year}</Text>
            {Object.keys(this.state.sortedEvents[year])
              .map((number, index) => {
                return (
                  <View key={index}>
                    <Text style={{
                      ...styles.eventsList__month,
                      color: this.props.ThemeProvider.themeStyle.foreground,
                    }}>{this.state.sortedEvents[year][number].month}</Text>
                    {this.state.sortedEvents[year][number].events.map(event => {
                      const color = { color: `${this.props.ThemeProvider.themeStyle.foreground}` };
                      const background = { backgroundColor: `${this.props.ThemeProvider.themeStyle.eventsList.backgroundColor}` };
                      const day = Moment(event.start.date || event.start.dateTime)
                        .format(`DD`);
                      const month = Moment(event.start.date || event.start.dateTime)
                        .format(`MMM`);
                      const begin = Moment(event.start.date || event.start.dateTime)
                        .format(`HH:mm`);
                      const end = Moment(event.end.date || event.end.dateTime)
                        .format(`HH:mm`);
                      return (
                        <View key={event.id} style={{ ...styles.eventsItem, ...background }}>
                          <View style={{ ...styles.eventsItem__left }}>
                            <Text style={{ ...styles.eventsItem__day, ...color }}>{day}</Text>
                            <Text style={{ ...styles.eventsItem__month, ...color }}>{month}</Text>
                          </View>
                          <View style={{ ...styles.eventsItem__right }}>
                            <Text style={{ ...styles.eventsItem__title, ...color }}>{event.summary}</Text>
                            <View style={{ ...styles.eventsItem__hour }}>
                              <Text style={{ ...styles.eventsItem__begin, ...color }}>
                                {begin === `00:00` ? `Toute la journée` : `${begin} -`}
                              </Text>
                              <Text style={{ ...styles.eventsItem__end, ...color }}>
                                {begin === `00:00` ? `` : ` ${end}`}
                              </Text>
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
          </View>
        );
      });
  };

  render() {
    return (
      <SafeAreaView style={{
        height: `100%`,
        backgroundColor: `${this.props.ThemeProvider.themeStyle.background}`,
      }}>
        <TopBar title="Calendrier" />
        <View style={{ height: `100%` }}>
          <ScrollView style={styles.eventsList}>
            {this.renderEvents()}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  eventsList: {
    padding: 20,
    marginBottom: 20,
  },
  eventsList__year: {
    fontSize: 20,
    fontWeight: `800`,
    marginBottom: 10,
  },
  eventsList__month: {
    fontSize: 16,
    fontWeight: `800`,
    marginBottom: 10,
  },
  eventsItem: {
    flex: 1,
    flexDirection: `row`,
    marginBottom: 15,
    padding: 20,
    borderRadius: 5,
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
  eventsItem__title: {
    fontSize: 16,
    fontWeight: `800`,
    marginBottom: 5,
  },
  eventsItem__hour: {
    flex: 1,
    flexDirection: `row`,
  },
  eventsItem__begin: {
    fontSize: 12,
  },
  eventsItem__end: {
    fontSize: 12,
  },
});

export default withThemeContext(HomeScreen);
