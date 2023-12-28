import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, family, size} from '../../shared/exporter';

export const ProfileField = ({title, subtitle,containerStyle}) => {
  return (
    <View style={[styles.container,containerStyle]}>
      <View style={styles.leftCon}>
        <Text style={styles.h1}>{title}</Text>
      </View>
      <View style={styles.rightCon}>
        <Text style={styles.h2}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftCon: {
    width: '50%',
  },
  rightCon: {
    width: '50%',
  },
  h1: {
    color: colors.b1,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
  },
  h2: {
    color: colors.g19,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
  },
});
