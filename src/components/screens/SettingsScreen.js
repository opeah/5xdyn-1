import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { withThemeContext } from '../../context/ThemeContext';
import { storage } from '../../storage/Storage';
import TopBar from '../layout/TopBar';

class SettingsScreen extends React.Component {
  state = {
    darkMode: false,
    notifications: false,
  };

  componentDidMount() {
    this.setState({
      darkMode: this.props.ThemeProvider.darkMode,
    });
  }

  toggleDarkMode = () => {
    this.setState({ darkMode: !this.state.darkMode }, () => {
      storage.save({
        key: `theme`,
        data: {
          theme: this.state.darkMode,
        },
      });
    });
    this.props.ThemeProvider.toggleDarkMode();
  };

  render() {
    return (
      <SafeAreaView style={{
        height: `100%`,
        backgroundColor: `${this.props.ThemeProvider.themeStyle.background}`,
      }}>
        <TopBar title="Réglages" />
        <View style={{
          ...styles.container,
        }}>
          <View style={styles.settings}>
            <Text style={[
              styles.textSettings,
              { color: `${this.props.ThemeProvider.themeStyle.foreground}` }]}>
              Mode nuit
            </Text>
            <Switch
              value={this.state.darkMode}
              onValueChange={() => {
                this.toggleDarkMode();
              }}
            />
          </View>
          <View style={styles.settings}>
            <Text
              style={[
                styles.textSettings,
                { color: `${this.props.ThemeProvider.themeStyle.foreground}` }]}>Notifications</Text>
            <Switch
              value={this.state.notifications}
              onValueChange={() => {
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: `100%`,
  },
  settingsTitle: {
    fontSize: 20,
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textSettings: {
    fontSize: 25,
    paddingBottom: 7,
    paddingRight: 150,
  },
});

export default withThemeContext(SettingsScreen);
