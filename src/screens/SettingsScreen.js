import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import Header from '../components/layout/Header';
import Check from '../components/settings/Check';
import Section from '../components/settings/Section';
import Toggle from '../components/settings/Toggle';
import { withThemeContext } from '../context/ThemeContext';

const SettingsScreen = ({ ThemeProvider }) => {
  const {
    darkMode,
    currentYear,
    themeStyle,
    setCurrentYear,
    toggleDarkMode,
    horizontalCalendar,
    toggleCalendar,
    notifications,
    toggleNotifications,
  } = ThemeProvider;

  return (
    <SafeAreaView style={{ ...styles.Settings, backgroundColor: `${themeStyle.background}` }}>
      <Header title="Réglages" />
      <View style={styles.Settings__container}>
        <Section title="Général">
          <Toggle
            title="Mode nuit"
            active={darkMode}
            first={true}
            callback={() => toggleDarkMode()}
          />
          <Toggle
            title="Notifications"
            active={notifications}
            callback={() => toggleNotifications()}
          />
        </Section>
        <Section title="Calendrier">
          <Toggle
            title="Horizontal"
            active={horizontalCalendar}
            first={true}
            callback={() => toggleCalendar()}
          />
        </Section>
        <Section title="Année">
          <Check
            title="Première"
            checked={currentYear === `first`}
            first={true}
            callback={() => setCurrentYear(`first`)}
          />
          <Check
            title="Deuxième"
            checked={currentYear === `second`}
            callback={() => setCurrentYear(`second`)}
          />
        </Section>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Settings: {
    height: `100%`,
  },
  Settings__container: {
    paddingTop: 30,
    height: `100%`,
  },
});

export default withThemeContext(SettingsScreen);
