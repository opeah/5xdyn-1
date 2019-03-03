import React, { Component, createContext } from 'react';

import { storage } from '../storage/Storage';
import lessons from '../data/lessons';

export const AppContext = createContext();

export class Store extends Component {
  state = {
    apiKey: `AIzaSyCTHMnkmKEU6cMQzd6I6qG9LKvttLPf70c`,
    events: {
      first: null,
      second: null,
    },
    currentYear: `first`,
    darkMode: false,
    calendar: {
      all: false,
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
      .load({ key: `currentYear` })
      .then(({ currentYear }) => {
        this.setState({ currentYear });
        this.fetchEvents();
      })
      .catch(() => {
        this.setState({ currentYear: `first` });
        this.fetchEvents();
      });
    storage
      .load({ key: `theme` })
      .then(({ theme }) => this.setState({ darkMode: theme }))
      .catch(() => this.setState({ darkMode: false }));
    storage
      .load({ key: `all` })
      .then(({ all }) => this.setState({ calendar: { ...this.state.calendar, all } }))
      .catch(() => this.setState({ calendar: { ...this.state.calendar, all: false } }));
  }

  fetchEvents = () => {
    const { apiKey, currentYear, calendar } = this.state;
    let postsUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendar[currentYear]}/events?key=${apiKey}&singleEvents=true&orderBy=startTime`;
    fetch(postsUrl)
      .then(response => response.json())
      .then(response => this.setState({
        events: {
          ...this.state.events,
          [currentYear]: response.items,
        },
      }));
  };

  toggleCalendar = () => {
    this.setState({
      calendar: {
        ...this.state.calendar,
        all: !this.state.calendar.all,
      },
    }, () => {
      storage
        .save({
          key: `all`, data: {
            all: this.state.calendar.all,
          },
        });
    });
  };

  setCurrentYear = value => {
    this.setState({
      currentYear: value,
    }, () => {
      if (this.state.events[this.state.currentYear] === null) {
        this.fetchEvents();
      }
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


