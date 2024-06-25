import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { colors } from '../../shared/exporter';

export const PreviewImageBox = ({onPress, uri}) => {
  return (
      <ImageBackground
        source={{
          uri: uri,
        }}
        style={styles.imgCon}
        imageStyle={styles.imgStyle}>
        </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imgCon: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  imgStyle: {
    borderRadius: 10,
    backgroundColor: colors.g13,
  },
});
