import React from 'react';
import { View } from 'react-native';
import NavigationBar from 'react-native-navbar';
import PropTypes from 'prop-types';

import { withThemeContext } from '../../context/ThemeContext';

const TopBar = ({ title, ThemeProvider }) => {
  const containerStyle = {
    paddingTop: 20,
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
    <View>
      <NavigationBar
        title={titleConfig}
        containerStyle={containerStyle}
        tintColor={`${ThemeProvider.themeStyle.background}`}
      />
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

export default withThemeContext(TopBar);
