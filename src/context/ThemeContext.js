import React, { Component, createContext } from 'react';

export const ThemeContext = createContext();

export class ThemeProvider extends Component {
  state = {
    darkMode: false,
    light: {
      foreground: `#000000`,
      background: `#EEEEEE`,
    },
    dark: {
      foreground: `#FFFFFF`,
      background: `#222222`,
    },
  };

  toggleDarkMode = () => {
    this.setState({
      darkMode: !this.state.darkMode,
    });
  };

  getTheme = () => {
    return {
      themeStyle: this.state.darkMode ? this.state.dark : this.state.light,
      toggleDarkMode: this.toggleDarkMode,
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


