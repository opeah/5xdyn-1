import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import EventsCalendar from '../components/home/EventsCalendar';
import EventsList from '../components/home/EventsList';
import Header from '../components/layout/Header';
import { withAppContext } from '../context/AppContext';

const HomeScreen = ({ Store }) => {
  const { calendar, events, themeStyle, currentYear } = Store;

  const displayTabs = () => {
    if (events[currentYear] !== null) {
      return !calendar.horizontal ?
        <EventsList events={events[currentYear]} /> :
        <EventsCalendar events={events[currentYear]} />;
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

  return (
    <SafeAreaView style={{ height: `100%`, backgroundColor: `${themeStyle.background}` }}>
      <Header title="Calendrier" />
      <View style={{ height: `100%` }}>
        {displayTabs()}
      </View>
    </SafeAreaView>
  );
};

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
