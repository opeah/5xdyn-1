import React, { Component, createContext } from 'react';

import { storage } from '../storage/Storage';

export const ThemeContext = createContext();

export class ThemeProvider extends Component {
  state = {
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
    });
  };

  toggleNotifications = () => {
    this.setState({
      notifications: !this.state.notifications,
    });
  };

  toggleCalendar = () => {
    this.setState({
      horizontalCalendar: !this.state.horizontalCalendar,
    });
  };

  getTheme = () => {
    return {
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


