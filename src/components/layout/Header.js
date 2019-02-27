import React from 'react';
import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native';
import PropTypes from 'prop-types';

import { withThemeContext } from '../../context/ThemeContext';

const Header = ({ title, ThemeProvider }) => {
  return (
    <View style={
      {
        ...styles.topBar__container,
        backgroundColor: `${ThemeProvider.themeStyle.background}`,
        borderBottomColor: `${ThemeProvider.themeStyle.navigationBar.borderColor}`,
        paddingTop: Platform.OS === `android` ? 30 : 10,
      }
    }>
      <StatusBar barStyle={ThemeProvider.darkMode ? `light-content` : `dark-content`} />
      <Text style={{
        ...styles.topBar__title,
        color: `${ThemeProvider.themeStyle.foreground}`,
      }}>{title}</Text>
    </View>
  );
};

Header.defaultProps = {
  title: `Calendrier`,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  ThemeProvider: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  topBar__container: {
    paddingTop: 0,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderStyle: `solid`,
  },
  topBar__title: {
    fontWeight: `900`,
    fontSize: 24,
    letterSpacing: 1,
    textAlign: `center`,
  },
});

export default withThemeContext(Header);
