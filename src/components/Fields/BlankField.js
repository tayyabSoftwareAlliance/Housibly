import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, family, size, WP} from '../../shared/exporter';

export const BlankField = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: WP('10'),
  },
  textStyle: {
    fontFamily: family.Gilroy_SemiBold,
    fontSize: size.large,
    color: colors.b1,
  },
});
