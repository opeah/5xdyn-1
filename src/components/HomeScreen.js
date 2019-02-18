import React from 'react';
import { Image, Text, View } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
    };
  }

  componentDidMount() {
    let postsUrl = `https://www.googleapis.com/calendar/v3/calendars/ifosupwavre.be_8gvh4v3v8dae5ktb21hisci9h0@group.calendar.google.com/events?key=AIzaSyCTHMnkmKEU6cMQzd6I6qG9LKvttLPf70c`;
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
      return (
        <View key={event.id}>
          <Text>{event.summary}</Text>
          <Text>{event.start.date || event.start.dateTime}</Text>
          <Text>{event.end.date || event.end.dateTime}</Text>
        </View>
      );
    });
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        {this.renderEvents()}
      </View>
    );
  }
}

export default HomeScreen;
