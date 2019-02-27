import React, { Component, createContext } from 'react';

import { storage } from '../storage/Storage';

export const AppContext = createContext();

export class Store extends Component {
  state = {
    apiKey: `AIzaSyCTHMnkmKEU6cMQzd6I6qG9LKvttLPf70c`,
    events: null,
    currentYear: `first`,
    darkMode: false,
    notifications: false,
    calendar: {
      horizontal: false,
      first: `ifosupwavre.be_jgjta3bi92ip34u317q3l5tr08@group.calendar.google.com`,
      second: `ifosupwavre.be_8gvh4v3v8dae5ktb21hisci9h0@group.calendar.google.com`,
    },
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
  };

  componentDidMount() {
    storage
      .load({ key: `theme` })
      .then(({ theme }) => this.setState({ darkMode: theme }))
      .catch(() => this.setState({ darkMode: false }));
    storage
      .load({ key: `horizontal` })
      .then(({ horizontal }) => this.setState({ calendar: { ...this.state.calendar, horizontal } }))
      .catch(() => this.setState({ calendar: { ...this.state.calendar, horizontal: false } }));
    storage
      .load({ key: `currentYear` })
      .then(({ currentYear }) => {
        this.setState({ currentYear });
        this.fetchEvents();
      })
      .catch(() => this.setState({ currentYear: `first` }));
  }

  fetchEvents = () => {
    const { apiKey, currentYear, calendar } = this.state;
    let postsUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendar[currentYear]}/events?key=${apiKey}&singleEvents=true&orderBy=startTime`;
    fetch(postsUrl)
      .then(response => response.json())
      .then(response => this.setState({ events: response.items }));
  };

  toggleCalendar = () => {
    this.setState({
      calendar: {
        ...this.state.calendar,
        horizontal: !this.state.calendar.horizontal,
      },
    }, () => {
      storage
        .save({
          key: `horizontal`, data: {
            horizontal: this.state.calendar.horizontal,
          },
        });
    });
  };

  setCurrentYear = value => {
    this.setState({
      currentYear: value,
    }, () => {
      this.fetchEvents();
      storage
        .save({
          key: `currentYear`, data: {
            currentYear: this.state.currentYear,
          },
        });
    });
  };

  toggleDarkMode = () => {
    this.setState({
      darkMode: !this.state.darkMode,
    }, () => {
      storage
        .save({
          key: `theme`, data: {
            theme: this.state.darkMode,
          },
        });
    });
  };

  toggleNotifications = () => {
    this.setState({
      notifications: !this.state.notifications,
    });
  };

  getData = () => {
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
      <AppContext.Provider value={this.getData()}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export function withAppContext(Component) {
  class ComponentWithContext extends React.Component {
    render() {
      return (
        <AppContext.Consumer>
          {value => <Component {...this.props} Store={value} />}
        </AppContext.Consumer>
      );
    }
  }

  return ComponentWithContext;
}


