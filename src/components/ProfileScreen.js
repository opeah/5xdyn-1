import React from 'react';
import { Text, View, Image } from 'react-native';

import { withThemeContext } from '../context/ThemeContext';

class ProfileScreen extends React.Component {

  render() {
    return (
      <View style={[
        { flex: 1, alignItems: `center`, justifyContent: `center` },
        { backgroundColor: `${this.props.ThemeProvider.themeStyle.background}` },
      ]}>
        <Text style={[{ color: `${this.props.ThemeProvider.themeStyle.foreground}` }]}>Profile!</Text>
        <Image
          source={require('../../assets/images/calendar.png')}
        />
      </View>
    );
  }
}

export default withThemeContext(ProfileScreen);
