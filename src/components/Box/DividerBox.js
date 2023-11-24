import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, family, size} from '../../shared/exporter';

export const DividerBox = () => {
  return (
    <View style={styles.line1Container}>
      <View style={styles.line1Style(colors.g4)} />
      <View>
        <Text style={[styles.linetext, {color: colors.g3}]}>or</Text>
      </View>
      <View style={styles.line2Style(colors.g4)} />
    </View>
  );
};

const styles = StyleSheet.create({
  line2Style: bgColor => {
    return {
      flex: 1,
      height: 1,
      backgroundColor: bgColor,
    };
  },
  line1Container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginHorizontal: 20,
  },
  linetext: {
    width: 30,
    textAlign: 'center',
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  line1Style: bgColor => {
    return {
      flex: 1,
      height: 1,
      backgroundColor: bgColor,
    };
  },
});
