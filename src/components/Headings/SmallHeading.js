import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, family, size} from '../../shared/exporter';

export const SmallHeading = ({title, textColor}) => {
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.h1,
          {
            color: textColor || colors.b1,
          },
        ]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  h1: {
    fontSize: size.xsmall,
    color: colors.b1,
    fontFamily: family.Gilroy_Medium,
  },
});
