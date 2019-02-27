import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { withThemeContext } from '../../context/ThemeContext';
import EventsCalendar from '../home/EventsCalendar';
import EventsList from '../home/EventsList';
import TopBar from '../layout/TopBar';

class HomeScreen extends React.Component {
  state = {
    events: null,
  };

  componentDidMount() {
    let postsUrl = `https://www.googleapis.com/calendar/v3/calendars/ifosupwavre.be_8gvh4v3v8dae5ktb21hisci9h0@group.calendar.google.com/events?key=AIzaSyCTHMnkmKEU6cMQzd6I6qG9LKvttLPf70c&singleEvents=true&orderBy=startTime`;
    fetch(postsUrl)
      .then(response => response.json())
      .then(response => this.setState({ events: response.items }));
  }

  render() {
    const { background } = this.props.ThemeProvider.themeStyle;
    return (
      <SafeAreaView style={{ height: `100%`, backgroundColor: `${background}` }}>
        <TopBar title="Calendrier" />
        <View style={{ height: `100%` }}>
          {this.state.events !== null ? <EventsCalendar events={this.state.events} /> : false}
          {this.state.events !== null ? <EventsList events={this.state.events} /> : false}
        </View>
      </SafeAreaView>
    );
  }
}

export default withThemeContext(HomeScreen);
