import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, family, size} from '../../shared/exporter';

export const AppHeading = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  h1: {
    fontFamily: family.Gilroy_Bold,
    fontSize: size.xsmall,
    color: colors.b1,
  },
});
