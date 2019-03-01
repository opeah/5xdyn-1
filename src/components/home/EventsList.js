import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Moment from 'moment';
import PropTypes from 'prop-types';

import { withAppContext } from '../../context/AppContext';

class EventsList extends Component {
  renderEvents = () => {
    const { Store } = this.props;
    if (this.props.events !== null) {
      return Object.keys(this.props.events)
        .map(year => {
          return (
            <View key={year}>
              <Text style={{
                ...styles.EventsList__year,
                color: Store.themeStyle.foreground,
              }}>{year}</Text>
              {Object.keys(this.props.events[year])
                .map((number, index) => {
                  return (
                    <View key={index}>
                      <Text style={{
                        ...styles.EventsList__month,
                        color: Store.themeStyle.foreground,
                      }}>{this.props.events[year][number].month}</Text>
                      {this.props.events[year][number].events.map(event => {
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
                        const first = Moment(event.start.date || event.start.dateTime)
                          .format(`DD`);
                        const last = Moment(event.end.date || event.end.dateTime)
                          .format(`DD`);
                        return (
                          <View key={event.id} style={{ ...styles.EventsItem, ...background }}>
                            <View style={{ ...styles.EventsItem__left }}>
                              <Text style={{ ...styles.EventsItem__day, ...color }}>{day}</Text>
                              <Text style={{ ...styles.EventsItem__month, ...color }}>{month}</Text>
                            </View>
                            <View style={{ ...styles.EventsItem__right }}>
                              <Text style={{ ...styles.EventsItem__title, ...color }}>{event.summary}</Text>
                              <View style={{ ...styles.EventsItem__hour }}>
                                <Text style={{ ...styles.EventsItem__begin, ...color }}>
                                  {begin === `00:00` ? `Toute la journée` : `${begin} -`}
                                </Text>
                                <Text style={{ ...styles.EventsItem__end, ...color }}>
                                  {begin === `00:00` ? `` : ` ${end}`}
                                </Text>
                                <Text style={{ ...styles.EventsItem__begin, ...color }}>
                                  {first === last ? `` : ` - Jusqu'au ${last} ${month}`}
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
    }
  };

  render() {
    return (
      <ScrollView style={styles.EventsList}>
        <View style={styles.EventsList__container}>
          {this.renderEvents()}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  EventsList: {
    padding: 20,
  },
  EventsList__container: {
    paddingBottom: 30,
    marginBottom: 50,
  },
  EventsList__year: {
    fontSize: 20,
    fontWeight: `800`,
  },
  EventsList__month: {
    fontSize: 16,
    fontWeight: `800`,
    marginBottom: 10,
    marginTop: 10,
  },
  EventsItem: {
    flex: 1,
    flexDirection: `row`,
    marginBottom: 15,
    padding: 20,
    borderRadius: 5,
  },
  EventsItem__left: {
    width: `20%`,
  },
  EventsItem__right: {
    width: `80%`,
  },
  EventsItem__day: {
    fontSize: 20,
    fontWeight: `800`,
  },
  EventsItem__month: {
    fontSize: 14,
    fontWeight: `500`,
  },
  EventsItem__title: {
    fontSize: 16,
    fontWeight: `800`,
    marginBottom: 5,
  },
  EventsItem__hour: {
    flex: 1,
    flexDirection: `row`,
  },
  EventsItem__begin: {
    fontSize: 12,
  },
  EventsItem__end: {
    fontSize: 12,
  },
});

EventsList.propTypes = {
  events: PropTypes.array.isRequired,
};

export default withAppContext(EventsList);
