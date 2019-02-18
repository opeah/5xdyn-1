import React from 'react';
import {Text, View, Image} from "react-native";


class ProfileScreen extends React.Component {

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Profile!</Text>
        <Image
          source={require('../../assets/images/calendar.png')}
        />
      </View>
    );
  }
}


export default ProfileScreen;