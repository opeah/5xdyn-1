import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Moment from 'moment';

import { withAppContext } from '../../context/AppContext';

class EventsCalendar extends Component {
  state = {
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth() + 1,
  };

  renderYears = () => {
    const { Store, events } = this.props;
    const { currentYear } = this.state;

    if (events !== null) {
      if (events[currentYear] !== undefined) {
        return Object
          .keys(events)
          .map(year => {
            if (year.toString() === currentYear.toString()) {
              return (
                <View key={year}>
                  <Text style={{ color: Store.themeStyle.foreground, ...styles.EventsCalendar__year }}>{year}</Text>
                </View>
              );
            }
          });
      } else {
        return (
          <View>
            <Text style={{
              ...styles.EventsCalendar__year,
              color: Store.themeStyle.foreground,
            }}>{this.state.currentYear}</Text>
            <Text style={{
              ...styles.EventsCalendar__month,
              color: Store.themeStyle.foreground,
            }}>Aucun événements pour {currentYear}</Text>
          </View>
        );
      }
    } else {
      return <Text>Aucun événements</Text>;
    }
  };

  renderMonths = () => {
    const { Store, events } = this.props;
    const { currentYear, currentMonth } = this.state;

    if (events !== null) {
      if (events[currentYear][currentMonth] !== undefined) {
        Object
          .keys(events[currentYear])
          .map((item, index) => {
            if (item.toString() === currentMonth.toString()) {
              return (
                <View key={index}>
                  <Text style={{ color: Store.themeStyle.foreground, ...styles.EventsCalendar__month }}>
                    {events[currentYear][item.toString()].month}
                  </Text>
                </View>
              );
            }
          });
      } else {
        return (
          <View>
            <Text style={{
              ...styles.EventsCalendar__year,
              color: Store.themeStyle.foreground,
            }}>{this.state.currentYear}</Text>
            <Text style={{
              ...styles.EventsCalendar__month,
              color: Store.themeStyle.foreground,
            }}>Aucun événements pour {currentMonth}</Text>
          </View>
        );
      }
    } else {
      return <Text>Aucun événements</Text>;
    }
  };

  renderEvents = () => {
    const { Store } = this.props;
    if (this.props.events !== null) {
      if (this.props.events[this.state.currentYear] !== undefined) {
        return Object.keys(this.props.events)
          .map((year, index) => {
            return (
              <View key={index}>
                <View style={{
                  display: this.state.currentYear.toString() === year.toString()
                    ? `flex`
                    : `none`,
                }}>
                  <Text style={{ color: Store.themeStyle.foreground, ...styles.EventsCalendar__year }}>{year}</Text>
                </View>
                <View>
                  {Object.keys(this.props.events[year])
                    .map((number, index) => {
                      return (
                        <View key={index} style={{
                          display: this.state.currentMonth.toString() === (number).toString()
                            ? `flex`
                            : `none`,
                        }}>
                          <Text style={{ color: Store.themeStyle.foreground, ...styles.EventsCalendar__month }}>
                            {this.props.events[this.state.currentYear][number.toString()] !==
                            undefined
                              ? this.props.events[this.state.currentYear][number.toString()].month
                              : `${this.state.currentMonth}`}
                          </Text>
                        </View>
                      );
                    })}
                </View>
                <View style={{
                  display: this.state.currentYear.toString() === year.toString()
                    ? `flex`
                    : `none`,
                }}>
                  {this.props.events[this.state.currentYear][this.state.currentMonth.toString()] ===
                  undefined ? false : (
                    this.props.events[this.state.currentYear][this.state.currentMonth.toString()].events.map(
                      (event) => {
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
                      })
                  )}
                </View>
              </View>
            );
          });
      } else {
        return (
          <View>
            <Text style={{
              ...styles.EventsCalendar__year,
              color: Store.themeStyle.foreground,
            }}>{this.state.currentYear}</Text>
            <Text style={{
              ...styles.EventsCalendar__month,
              color: Store.themeStyle.foreground,
            }}>Aucun événements</Text>
          </View>
        );
      }

    }
  };

  render() {
    return (
      <ScrollView style={styles.EventsCalendar}>
        <View>{this.renderYears()}</View>
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
