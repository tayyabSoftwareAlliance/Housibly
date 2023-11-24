import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, family, size, spacing, WP} from '../../shared/exporter';
import {Icon} from 'react-native-elements';

export const OutlineBox = ({text, onPress, title}) => {
  return (
    <View style={spacing.py2}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <TouchableOpacity onPress={onPress} style={styles.btnCon}>
          <Icon
            type={'antdesign'}
            name={'upload'}
            color={colors.p2}
            size={20}
          />
        </TouchableOpacity>
        <Text style={styles.textStyle}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.g36,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.g37,
    borderStyle: 'dotted',
    height: WP('32'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCon: {
    backgroundColor: colors.p8,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  textStyle: {
    color: colors.g38,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  title: {
    fontFamily: family.Gilroy_Medium,
    fontSize: size.xsmall,
    color: colors.b1,
    marginVertical: 10,
  },
});
