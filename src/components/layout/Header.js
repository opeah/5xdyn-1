import React from 'react';
import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native';
import PropTypes from 'prop-types';

import { withAppContext } from '../../context/AppContext';

const Header = ({ title, Store }) => {
  return (
    <View style={
      {
        ...styles.Header__container,
        backgroundColor: `${Store.themeStyle.background}`,
        borderBottomColor: `${Store.themeStyle.navigationBar.borderColor}`,
        paddingTop: Platform.OS === `android` ? 30 : 10,
      }
    }>
      <StatusBar barStyle={Store.darkMode ? `light-content` : `dark-content`} />
      <View>
        <Text
          style={{
            ...styles.Header__title,
            color: `${Store.themeStyle.foreground}`,
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
  Store: PropTypes.object.isRequired,
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

export default withAppContext(Header);
