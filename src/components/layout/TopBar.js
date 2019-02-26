import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavigationBar from 'react-native-navbar';
import PropTypes from 'prop-types';

import { withThemeContext } from '../../context/ThemeContext';

const TopBar = ({ title, ThemeProvider }) => {
  const containerStyle = {
    paddingTop: 0,
    paddingBottom: 10,
    borderBottomColor: `${ThemeProvider.themeStyle.navigationBar.borderColor}`,
    borderBottomWidth: 1,
    borderStyle: `solid`,
  };

  const titleConfig = {
    title,
    tintColor: `${ThemeProvider.themeStyle.foreground}`,
    style: {
      fontWeight: `900`,
      fontSize: 24,
      letterSpacing: 1,
    },
  };

  return (
    <View style={
      {
        ...styles.topBar__container,
        backgroundColor: `${ThemeProvider.themeStyle.background}`,
        borderBottomColor: `${ThemeProvider.themeStyle.navigationBar.borderColor}`,
      }
    }>
      <Text style={{
        ...styles.topBar__title,
        color: `${ThemeProvider.themeStyle.foreground}`,
      }}>{title}</Text>
    </View>
  );
};

TopBar.defaultProps = {
  title: `Calendrier`,
};

TopBar.propTypes = {
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

export default withThemeContext(TopBar);
