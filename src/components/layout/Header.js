import React from 'react';
import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native';
import PropTypes from 'prop-types';

import { withThemeContext } from '../../context/ThemeContext';

const Header = ({ title, ThemeProvider, icon }) => {
  return (
    <View style={
      {
        ...styles.Header__container,
        backgroundColor: `${ThemeProvider.themeStyle.background}`,
        borderBottomColor: `${ThemeProvider.themeStyle.navigationBar.borderColor}`,
        paddingTop: Platform.OS === `android` ? 30 : 10,
      }
    }>
      <StatusBar barStyle={ThemeProvider.darkMode ? `light-content` : `dark-content`} />
      <View>
        <Text
          style={{
            ...styles.Header__title,
            color: `${ThemeProvider.themeStyle.foreground}`,
          }}>{title}</Text>
      </View>
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
  Header__container: {
    paddingTop: 0,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderStyle: `solid`,
  },
  Header__title: {
    fontWeight: `900`,
    fontSize: 24,
    letterSpacing: 1,
    textAlign: `center`,
  },
});

export default withThemeContext(Header);
