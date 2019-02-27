import React, { Component, createContext } from 'react';

import { storage } from '../storage/Storage';

export const ThemeContext = createContext();

export class ThemeProvider extends Component {
  state = {
    apiKey: `AIzaSyCTHMnkmKEU6cMQzd6I6qG9LKvttLPf70c`,
    events: null,
    calendar: {
      horizontal: false,
      first: `ifosupwavre.be_jgjta3bi92ip34u317q3l5tr08@group.calendar.google.com`,
      second: `ifosupwavre.be_8gvh4v3v8dae5ktb21hisci9h0@group.calendar.google.com`,
    },
    darkMode: false,
    light: {
      foreground: `#222222`,
      background: `#FFFFFF`,
      navigationBar: {
        borderColor: `#EEEEEE`,
      },
      eventsList: {
        backgroundColor: `#F7F8FC`,
      },
    },
    dark: {
      foreground: `#FFFFFF`,
      background: `#222222`,
      navigationBar: {
        borderColor: `#333333`,
      },
      eventsList: {
        backgroundColor: `#333333`,
      },
    },
    currentYear: `second`,
    horizontalCalendar: false,
    notifications: false,
  };

  componentDidMount() {
    this.fetchEvents();
    storage.load({
      key: `theme`,
    })
      .then(({ theme }) => this.setState({
        darkMode: theme,
      }))
      .catch(() => this.setState({
        darkMode: false,
      }));
  }

  fetchEvents = () => {
    const { apiKey, currentYear, calendar } = this.state;
    let postsUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendar[currentYear]}/events?key=${apiKey}&singleEvents=true&orderBy=startTime`;
    fetch(postsUrl)
      .then(response => response.json())
      .then(response => this.setState({ events: response.items }));
  };

  toggleDarkMode = () => {
    this.setState({
      darkMode: !this.state.darkMode,
    }, () => {
      storage
        .save({
          key: `theme`,
          data: {
            theme: this.state.darkMode,
          },
        });
    });

  };

  setCurrentYear = value => {
    this.setState({
      currentYear: value,
    }, () => this.fetchEvents());
  };

  toggleNotifications = () => {
    this.setState({
      notifications: !this.state.notifications,
    });
  };

  toggleCalendar = () => {
    this.setState({
      calendar: {
        ...this.state.calendar,
        horizontal: !this.state.calendar.horizontal,
      },
    });
  };

  getTheme = () => {
    return {
      events: this.state.events,
      fetchEvents: this.fetchEvents,
      calendar: this.state.calendar,
      darkMode: this.state.darkMode,
      themeStyle: this.state.darkMode ? this.state.dark : this.state.light,
      toggleDarkMode: this.toggleDarkMode,
      currentYear: this.state.currentYear,
      setCurrentYear: this.setCurrentYear,
      horizontalCalendar: this.state.horizontalCalendar,
      toggleCalendar: this.toggleCalendar,
      notifications: this.state.notifications,
      toggleNotifications: this.toggleNotifications,
    };
  };

  render() {
    return (
      <ThemeContext.Provider value={this.getTheme()}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export function withThemeContext(Component) {
  class ComponentWithContext extends React.Component {
    render() {
      return (
        <ThemeContext.Consumer>
          {value => <Component {...this.props} ThemeProvider={value} />}
        </ThemeContext.Consumer>
      );
    }
  }

  return ComponentWithContext;
}


