import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { withAppContext } from '../../context/AppContext';

const Section = ({ title, children, Store }) => {
  const { backgroundColor } = Store.themeStyle.eventsList;
  const { foreground } = Store.themeStyle;

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

export default withAppContext(Section);
