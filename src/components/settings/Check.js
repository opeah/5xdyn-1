import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { withThemeContext } from '../../context/ThemeContext';

const Check = props => {
  const { title, first, callback } = props;
  const { background, foreground } = props.ThemeProvider.themeStyle;

  const renderIcon = () => {
    let IconComponent = Ionicons;
    let IconName = `ios-checkmark`;
    return !props.checked ? false : (
      <IconComponent
        name={IconName}
        size={36}
        color={props.ThemeProvider.darkMode ? `#E76F51` : `#222222`}
      />
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={() => callback()}>
        <View style={{
          ...styles.Check,
          borderTopStyle: !first ? `solid` : ``,
          borderTopWidth: !first ? 1 : 0,
          borderColor: !first ? `${background}` : ``,
        }}>
          <Text style={{ ...styles.Check__text, color: `${foreground}` }}>{title}</Text>
          <View style={{ marginLeft: `auto` }}>{renderIcon()}</View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Check: {
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    flexDirection: `row`,
    alignItems: `center`,
  },
  Check__text: {
    fontSize: 18,
  },
});

Check.defaultProps = {
  checked: false,
  first: false,
};

Check.propTypes = {
  title: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  first: PropTypes.bool,
  callback: PropTypes.func.isRequired,
};

export default withThemeContext(Check);