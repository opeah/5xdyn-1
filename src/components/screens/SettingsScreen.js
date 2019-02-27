import React from 'react';
import { View, Text, StyleSheet, Switch,TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { withThemeContext } from '../../context/ThemeContext';
import { storage } from '../../storage/Storage';
import TopBar from '../layout/TopBar';
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

  renderIconComponent = (year) => {
    let IconComponent = Ionicons;
    let IconName = 'ios-checkmark';
    if(this.props.ThemeProvider.currentYear === year)
    return (
      <IconComponent name={IconName} size={40} color={this.state.darkMode ? '#E76F51': '#222222'}/>
    )
  };

  render() {

    console.log(this.props.ThemeProvider.currentYear);
    return (
      <SafeAreaView style={{
        height: `100%`,
        backgroundColor: `${this.props.ThemeProvider.themeStyle.background}`,
      }}>
        <TopBar title="Réglages" />
        <View style={{
          ...styles.container,
        }}>
        <View style={styles.section}>
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

        <View style={styles.section}>
          <View>
            <TouchableOpacity onPress={() => this.props.ThemeProvider.toggleYear('first')} >
            <View style={styles.settings}>
              <Text style={{...styles.checkedText,color: `${this.props.ThemeProvider.themeStyle.foreground}`}}>Cours première</Text>
              <Text>{this.renderIconComponent('first')}</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.ThemeProvider.toggleYear('second')} >
            <View style={styles.settings}>
              <Text style={{...styles.checkedText,color: `${this.props.ThemeProvider.themeStyle.foreground}`}}>Cours deuxième</Text>
              <Text>{this.renderIconComponent('second')}</Text>
            </View>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop:30,
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
    paddingBottom:10,
    paddingTop:10,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textSettings: {
    fontSize: 20,
    paddingBottom: 7,
    paddingRight: 150,
  },

  checkedText: {
    fontSize:20
  },
  section:{
    backgroundColor: '#333333',
    paddingTop:10,
    paddingBottom:10,
    paddingRight:20,
    paddingLeft:20,
    marginBottom: 20,
  }
});

export default withThemeContext(SettingsScreen);
