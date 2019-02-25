import React from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';

import {withThemeContext} from '../context/ThemeContext';

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
    };
  }

  toggleDarkMode = () => {
    this.setState({darkMode: !this.state.darkMode});
    this.props.ThemeProvider.toggleDarkMode();
  };

  render() {
    return (
      <View style={[
        styles.container,
        {backgroundColor: `${this.props.ThemeProvider.themeStyle.background}`},
      ]}>
        <Text style={[
          styles.settingsTitle,
          {color: `${this.props.ThemeProvider.themeStyle.foreground}`}]}>Settings</Text>

        <View style={styles.settingsContainer}>
          <View style={styles.settings}>
            <Text style={styles.textSettings}>Mode nuit</Text>
            <Text>
              <Switch
                value={this.state.darkMode}
                onValueChange={() => this.toggleDarkMode()}
              />
            </Text>
          </View>

          <Text>
            <Text>Notifications</Text>

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
    borderRadius: 10,
    marginBottom: 160,
  },
  settings: {
    fontSize: 20,
    paddingBottom: 30,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  textSettings: {
    fontSize: 25,
    paddingBottom: 7,
    paddingRight: 150
  }
});

export default withThemeContext(SettingsScreen);
