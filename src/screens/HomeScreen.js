import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { withThemeContext } from '../context/ThemeContext';
import EventsCalendar from '../components/home/EventsCalendar';
import EventsList from '../components/home/EventsList';
import Header from '../components/layout/Header';

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

  displayTabs = () => {
    const { horizontalCalendar } = this.props.ThemeProvider;

    return !horizontalCalendar && this.state.events !== null ?
      <EventsList events={this.state.events} /> :
      <EventsCalendar events={this.state.events} />;
  };

  render() {
    const { background } = this.props.ThemeProvider.themeStyle;
    return (
      <SafeAreaView style={{ height: `100%`, backgroundColor: `${background}` }}>
        <Header title="Calendrier" />
        <View style={{ height: `100%` }}>
          {this.displayTabs()}
        </View>
      </SafeAreaView>
    );
  }
}

export default withThemeContext(HomeScreen);
