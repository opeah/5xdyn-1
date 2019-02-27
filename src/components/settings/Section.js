import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { withThemeContext } from '../../context/ThemeContext';

const Section = ({ title, children, ThemeProvider }) => {
  const { backgroundColor } = ThemeProvider.themeStyle.eventsList;
  const { foreground } = ThemeProvider.themeStyle;

  return (
    <View style={{ ...styles.Section }}>
      <Text style={{ ...styles.Section__title, color: `${foreground}` }}>{title}</Text>
      <View style={{ backgroundColor: `${backgroundColor}` }}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Section: {
    marginBottom: 40,
  },
  Section__title: {
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: `800`,
    marginBottom: 10,
  },
});

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default withThemeContext(Section);
