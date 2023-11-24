import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export const PreviewImageBox = ({onPress, uri}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: uri,
        }}
        style={styles.imgCon}
        imageStyle={styles.imgStyle}></ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  imgCon: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  imgStyle: {
    borderRadius: 10,
  },
});
