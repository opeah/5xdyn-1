import PropTypes from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';
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
      return <Text>Chargement...</Text>;
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

HomeScreen.propTypes = { ThemeProvider: PropTypes.any };

export default withAppContext(HomeScreen);
