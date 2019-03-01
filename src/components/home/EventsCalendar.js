import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Moment from 'moment';

import { withAppContext } from '../../context/AppContext';
import { config } from '../../locale/moment';

class EventsCalendar extends Component {
  state = {
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth() + 1,
    months: [],
  };

  componentDidMount() {
    this.setState({ months: config.months });
  }

  renderEvents = () => {
    const { Store, events } = this.props;
    const { currentYear, currentMonth } = this.state;

    if (events !== null) {
      if (events[currentYear] !== undefined) {
        if (events[currentYear][currentMonth] !== undefined) {
          return events[currentYear][currentMonth].events.map(event => {
            const color = { color: `${Store.themeStyle.foreground}` };
            const background = { backgroundColor: `${Store.themeStyle.eventsList.backgroundColor}` };
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
          });
        } else {
          return (
            <View>
              <Text style={{ ...styles.EventsCalendar__error, color: Store.themeStyle.foreground }}>
                Aucun événements pour {currentMonth}
              </Text>
            </View>
          );
        }
      } else {
        return (
          <View>
            <Text style={{ ...styles.EventsCalendar__error, color: Store.themeStyle.foreground }}>
              Aucun événements pour {currentYear}
            </Text>
          </View>
        );
      }
    } else {
      return (
        <View>
          <Text style={{ ...styles.EventsCalendar__error, color: Store.themeStyle.foreground }}>
            Aucun événements
          </Text>
        </View>
      );
    }
  };

  render() {
    const { Store } = this.props;
    return (
      <ScrollView style={styles.EventsCalendar}>
        <View>
          <Text style={{ color: Store.themeStyle.foreground, ...styles.EventsCalendar__year }}>
            {this.state.currentYear}
          </Text>
        </View>
        <View>
          <Text style={{ color: Store.themeStyle.foreground, ...styles.EventsCalendar__month }}>
            {this.state.months[this.state.currentMonth - 1]}
          </Text>
        </View>
        <View style={styles.eventsList__container}>{this.renderEvents()}</View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  EventsCalendar: {
    padding: 20,
  },
  eventsList__container: {
    paddingBottom: 30,
    marginBottom: 50,
  },
  EventsCalendar__year: {
    textAlign: `center`,
    fontSize: 20,
    fontWeight: `800`,
    marginBottom: 10,
  },
  EventsCalendar__month: {
    textAlign: `center`,
    fontSize: 18,
    fontWeight: `700`,
    marginBottom: 20,
  },
  EventsCalendar__error: {
    textAlign: `center`,
    fontSize: 20,
    fontWeight: `800`,
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

EventsCalendar.propTypes = {
  events: PropTypes.array,
};

export default withAppContext(EventsCalendar);
