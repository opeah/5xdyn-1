import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const IconTabBottom = props => {
  const styles = StyleSheet.create({
    Icon: {
      width: 30,
      height: 30,
    },
  });

  return (
    <View>
      <Image source={props.src}
        style={[styles.Icon]}
      />
    </View>
  );
};

export default IconTabBottom;
