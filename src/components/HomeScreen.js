import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import NavigationBar from 'react-native-navbar';

import { withThemeContext } from '../context/ThemeContext';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
    };
  }

  componentDidMount() {
    let postsUrl = `https://www.googleapis.com/calendar/v3/calendars/ifosupwavre.be_8gvh4v3v8dae5ktb21hisci9h0@group.calendar.google.com/events?key=AIzaSyCTHMnkmKEU6cMQzd6I6qG9LKvttLPf70c&singleEvents=true&orderBy=startTime`;
    fetch(postsUrl)
      .then(response => response.json())
      .then(response => {
        this.setState({
          events: response,
        });
      });
  }

  renderEvents = () => {
    if (this.state.events === null) {
      return false;
    }
    return this.state.events.items.map(event => {
      const style = { color: `${this.props.ThemeProvider.themeStyle.foreground}` };
      return (
        <View key={event.id} style={[{ marginBottom: 20 }]}>
          <Text style={style}>{event.summary}</Text>
          <Text style={style}>{event.start.date || event.start.dateTime}</Text>
          <Text style={style}>{event.end.date || event.end.dateTime}</Text>
        </View>
      );
    });
  };

  render() {
    const containerStyle = {
      paddingTop: 20,
      paddingBottom: 10,
      borderBottomColor: `${this.props.ThemeProvider.themeStyle.navigationBar.borderColor}`,
      borderBottomWidth: 1,
      borderStyle: `solid`,
    };

    const titleConfig = {
      title: `Calendrier`,
      tintColor: `${this.props.ThemeProvider.themeStyle.foreground}`,
      style: {
        fontWeight: `900`,
        fontSize: 24,
        letterSpacing: 1,
      },
    };

    return (
      <View>
        <View>
          <NavigationBar
            title={titleConfig}
            containerStyle={containerStyle}
            tintColor={`${this.props.ThemeProvider.themeStyle.background}`}
          />
        </View>
        <View>
          <ScrollView style={[
            styles.container,
            { backgroundColor: `${this.props.ThemeProvider.themeStyle.background}` }]}>

            {this.renderEvents()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default withThemeContext(HomeScreen);
