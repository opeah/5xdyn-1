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
                ...styles.eventsList__year,
                color: Store.themeStyle.foreground,
              }}>{year}</Text>
              {Object.keys(this.props.events[year])
                .map((number, index) => {
                  return (
                    <View key={index}>
                      <Text style={{
                        ...styles.eventsList__month,
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
    }
  };

  render() {
    return (
      <ScrollView style={styles.eventsList}>
        <View style={styles.eventsList__container}>
          {this.renderEvents()}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  eventsList: {
    padding: 20,
  },
  eventsList__container: {
    paddingBottom: 30,
    marginBottom: 50,
  },
  eventsList__year: {
    fontSize: 20,
    fontWeight: `800`,
  },
  eventsList__month: {
    fontSize: 16,
    fontWeight: `800`,
    marginBottom: 10,
    marginTop: 10,
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

EventsList.propTypes = {
  events: PropTypes.array.isRequired,
};

export default withAppContext(EventsList);
