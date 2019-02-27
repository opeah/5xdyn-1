import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Check from '../components/settings/Check';
import Section from '../components/settings/Section';
import Toggle from '../components/settings/Toggle';

import { withThemeContext } from '../context/ThemeContext';
import { storage } from '../storage/Storage';
import Header from '../components/layout/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    storage
      .save({
        key: `theme`,
        data: {
          theme: this.state.darkMode,
        },
      })
      .then(() => this.props.ThemeProvider.toggleDarkMode())
      .catch(err => console.log(err));
  };

  renderIconComponent = year => {
    let IconComponent = Ionicons;
    let IconName = 'ios-checkmark';
    if (this.props.ThemeProvider.currentYear === year)
      return (
        <IconComponent name={IconName} size={40} color={this.state.darkMode
          ? '#E76F51'
          : '#222222'} />
      );
  };

  render() {
    const { darkMode, currentYear, setCurrentYear } = this.props.ThemeProvider;
    return (
      <SafeAreaView style={{
        height: `100%`,
        backgroundColor: `${this.props.ThemeProvider.themeStyle.background}`,
      }}>
        <Header title="Réglages" />
        <View style={{
          ...styles.container,
        }}>
          <Section title="Général">
            <Toggle
              title="Mode nuit"
              active={darkMode}
              first={true}
              callback={() => this.toggleDarkMode()}
            />
            <Toggle
              title="Notifications"
              active={darkMode}
              callback={() => this.toggleDarkMode()}
            />
          </Section>
          <Section title="Calendrier">
            <Toggle
              title="Horizontal"
              active={darkMode}
              first={true}
              callback={() => this.toggleDarkMode()}
            />
          </Section>
          <Section title="Année">
            <Check
              title="Première"
              checked={currentYear === `first`}
              first={true}
              callback={() => setCurrentYear(`first`)}
            />
            <Check
              title="Deuxième"
              checked={currentYear === `second`}
              callback={() => setCurrentYear(`second`)}
            />
          </Section>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
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
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  textSettings: {
    fontSize: 20,
    paddingBottom: 7,
    paddingRight: 150,
  },

  checkedText: {
    fontSize: 20,
  },
  section: {
    marginBottom: 50,
  },
});

export default withThemeContext(SettingsScreen);
