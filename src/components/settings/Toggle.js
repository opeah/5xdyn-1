import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { withAppContext } from '../../context/AppContext';

const Toggle = props => {
  const { background, foreground } = props.Store.themeStyle;
  const { title, active, first, callback } = props;

  return (
    <View
      style={{
        ...styles.Toggle,
        borderTopStyle: !first ? `solid` : ``,
        borderTopWidth: !first ? 1 : 0,
        borderColor: !first ? `${background}` : ``,
      }}>
      <Text style={{ ...styles.Toggle__text, color: `${foreground}` }}>
        {title}
      </Text>
      <Switch
        style={{ marginLeft: `auto` }}
        value={active}
        onValueChange={() => callback()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Toggle: {
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    flexDirection: `row`,
    alignItems: `center`,
  },
  Toggle__text: {
    fontSize: 18,
  },
});

Toggle.defaultProps = {
  active: false,
  first: false,
};

Toggle.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  first: PropTypes.bool,
  callback: PropTypes.func.isRequired,
};

export default withAppContext(Toggle);
