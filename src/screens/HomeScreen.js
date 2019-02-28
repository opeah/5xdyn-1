import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Moment from 'moment';

import EventsCalendar from '../components/home/EventsCalendar';
import EventsList from '../components/home/EventsList';
import Header from '../components/layout/Header';
import { withAppContext } from '../context/AppContext';

class HomeScreen extends Component {
  state = {
    first: null,
    second: null,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.Store.events !== this.props.Store.events) {
      this.sortEvents();
    }
    if (prevProps.Store.currentYear !== this.props.Store.currentYear) {
      this.sortEvents();
    }
  }

  sortEvents = () => {
    const { currentYear } = this.props.Store;
    if (this.state[currentYear] === null) {
      if (this.props.Store.events[currentYear] !== null) {
        const events = this.props.Store.events[currentYear];
        const newEvents = [];
        if (events !== null || events !== undefined) {
          events.filter(event => {
            const start = event.start.date || event.start.dateTime;
            const year = Moment(start)
              .format(`YYYY`);
            const number = Moment(start)
              .format('M');
            const month = Moment(start)
              .format('MMMM');
            if (newEvents[year] === undefined) {
              newEvents[year] = {};
            }
            if (newEvents[year][number] === undefined) {
              newEvents[year][number] = {
                month,
                events: [],
              };
            }
            newEvents[year][number].events.push(event);
          });
          this.setState({ [currentYear]: newEvents });
        }
      }
    }
  };

  displayTabs = () => {
    const { calendar, themeStyle, currentYear } = this.props.Store;

    if (this.state[currentYear] !== null) {
      return !calendar.horizontal ?
        <EventsList events={this.state[currentYear]} /> :
        <EventsCalendar events={this.state[currentYear]} />;
    } else {
      return (
        <View style={styles.Home__loading}>
          <Text style={{
            ...styles.Home__loading__text,
            color: `${themeStyle.foreground}`,
          }}>Chargement...</Text>
        </View>
      );
    }
  };

  render() {
    const { themeStyle } = this.props.Store;

    return (
      <SafeAreaView style={{ height: `100%`, backgroundColor: `${themeStyle.background}` }}>
        <Header title="Calendrier" />
        <View style={{ height: `100%` }}>
          {this.displayTabs()}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  Home__loading: {
    padding: 20,
  },
  Home__loading__text: {
    textAlign: `center`,
    fontSize: 20,
    fontWeight: `800`,
  },
});

HomeScreen.propTypes = { ThemeProvider: PropTypes.any };

export default withAppContext(HomeScreen);
