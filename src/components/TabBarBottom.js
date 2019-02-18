import React from 'react';
import {View,Text, Image, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';

class TabBarBottom extends React.Component {

  render(){
    return(
      <View style={styles.TabBarContainer}>
        <Text onPress={() => props.navigation.navigate('Home')}>
          <Image source={require('../../assets/images/calendar.png')}
                 style={styles.IconLink}
          />
        </Text>
        <Text>
          <Image source={require('../../assets/images/profile.png')}
                 style={styles.IconLink}
          />
        </Text>
        <Text>
          <Image source={require('../../assets/images/console.png')}
                 style={styles.IconLink}
          />
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  TabBarContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height:100,
  },
  IconLink:{
    width: 40,
    height: 40
  }
});


export default TabBarBottom