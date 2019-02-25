import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';

import { withThemeContext } from '../context/ThemeContext';

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
    };
  }

  toggleDarkMode = () => {
    this.setState({ darkMode: !this.state.darkMode });
    this.props.ThemeProvider.toggleDarkMode();
  };

  render() {
    return (
      <View style={[
        styles.container,
        { backgroundColor: `${this.props.ThemeProvider.themeStyle.background}` },
      ]}>
        <Text style={[
          styles.settingsTitle,
          { color: `${this.props.ThemeProvider.themeStyle.foreground}` }]}>Settings</Text>
        <View style={styles.settingsContainer}>
          <ToggleSwitch
            isOn={this.state.darkMode}
            onColor='#68e25d'
            offColor='#dee2de'
            label='Dark Mode'
            labelStyle={{ color: 'black', fontWeight: '900' }}
            size='medium'
            onToggle={() => this.toggleDarkMode()}
          />
          <Text style={styles.settings}>
            <Text>Notifications</Text>
          </Text>
          <Text style={styles.settings}>
            <Text>Thème Dark</Text>
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 30,
  },
  settingsTitle: {
    fontSize: 30,
  },
  settingsContainer: {
    padding: 20,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginBottom: 160,
  },
  settings: {
    fontSize: 30,
    padding: 20,
  },
});

export default withThemeContext(SettingsScreen);
