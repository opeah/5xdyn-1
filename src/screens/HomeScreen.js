import PropTypes from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import EventsCalendar from '../components/home/EventsCalendar';
import EventsList from '../components/home/EventsList';
import Header from '../components/layout/Header';
import { withThemeContext } from '../context/ThemeContext';

const HomeScreen = props => {
  let { ThemeProvider } = props;
  const { calendar, events, themeStyle } = ThemeProvider;

  const displayTabs = () => {
    if (events !== null) {
      return !calendar.horizontal ?
        <EventsList events={events} /> :
        <EventsCalendar events={events} />;
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

export default withThemeContext(HomeScreen);
