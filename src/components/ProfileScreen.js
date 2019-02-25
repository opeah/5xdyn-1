import React from 'react';
import { Text, View, Image } from 'react-native';

import { withThemeContext } from '../context/ThemeContext';
import TopBar from './layout/TopBar';

class ProfileScreen extends React.Component {

  render() {
    return (
      <View>
        <View>
          <TopBar title="Profile" />
        </View>
        <View style={[
          { flex: 1, alignItems: `center`, justifyContent: `center` },
          { backgroundColor: `${this.props.ThemeProvider.themeStyle.background}` },
        ]}>
        </View>
      </View>
    );
  }
}

export default withThemeContext(ProfileScreen);
