import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { withThemeContext } from '../context/ThemeContext';
import EventsCalendar from '../components/home/EventsCalendar';
import EventsList from '../components/home/EventsList';
import Header from '../components/layout/Header';

class HomeScreen extends React.Component {
  state = {
    events: null,
    currentTab: 0,
  };

  componentDidMount() {
    let postsUrl = `https://www.googleapis.com/calendar/v3/calendars/ifosupwavre.be_8gvh4v3v8dae5ktb21hisci9h0@group.calendar.google.com/events?key=AIzaSyCTHMnkmKEU6cMQzd6I6qG9LKvttLPf70c&singleEvents=true&orderBy=startTime`;
    fetch(postsUrl)
      .then(response => response.json())
      .then(response => this.setState({ events: response.items }));
  }

  displayTabs = () => {
    const tabs = [
      <EventsList events={this.state.events} />,
      <EventsCalendar events={this.state.events} />,
    ];

    if (this.state.events !== null) {
      return tabs.map((tab, index) => {
        return index === this.state.currentTab ? <View key={index}>{tab}</View> : false;
      });
    }
  };

  toggleTab = () => {
    this.setState({
      currentTab: this.state.currentTab === 0 ? 1 : 0,
    });
  };

  render() {
    const { background, foreground } = this.props.ThemeProvider.themeStyle;
    const IconComponent = Ionicons;
    const IconName = this.state.currentTab === 0 ? `ios-calendar` : `ios-list`;
    return (
      <SafeAreaView style={{ height: `100%`, backgroundColor: `${background}` }}>
        <Header
          title="Calendrier"
          icon={
            <IconComponent
              onPress={() => this.toggleTab()}
              name={IconName}
              size={36}
              color={foreground}
            />
          }
        />
        <View style={{ height: `100%` }}>
          {this.displayTabs()}
        </View>
      </SafeAreaView>
    );
  }
}

export default withThemeContext(HomeScreen);
