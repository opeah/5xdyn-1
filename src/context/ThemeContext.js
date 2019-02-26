import React, { Component, createContext } from 'react';

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
    },
    dark: {
      foreground: `#FFFFFF`,
      background: `#222222`,
      navigationBar: {
        borderColor: `#333333`,
      },
    },
    currentYear: `second`,
  };

  toggleDarkMode = () => {
    this.setState({
      darkMode: !this.state.darkMode,
    });
  };

  toggleYear = () => {
    this.setState({
      currentYear: this.state.currentYear === `second` ? `first` : `second`,
    });
  };

  getTheme = () => {
    return {
      themeStyle: this.state.darkMode ? this.state.dark : this.state.light,
      toggleDarkMode: this.toggleDarkMode,
      currentYear: this.state.currentYear,
      toggleYear: this.toggleYear,
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


