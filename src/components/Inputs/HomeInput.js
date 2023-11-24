import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {colors, family, size} from '../../shared/exporter';
import {Icon} from 'react-native-elements';

export const HomeInput = ({
  onFocus,
  onBlur,
  h1,
  h2,
  placeholder,
  h2FontSize,
  onChangeText,
  value,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.aiRow}>
        <Text style={[styles.h1]}> {h1 || 'Unit'} </Text>
        <Text
          style={[
            styles.h2,
            {
              fontSize: h2FontSize || size.xsmall,
            },
          ]}>
          {' '}
          {h2 || ' (ft, excluding basement)'}
        </Text>
      </View>
      <View style={styles.aiRow1}>
        <TextInput
          style={styles.inputStyle}
          placeholderTextColor={colors.g19}
          placeholder={placeholder || '0'}
          keyboardType={'decimal-pad'}
          onChangeText={onChangeText}
          value={value}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    width: '100%',
  },
  aiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },

  h1: {
    color: colors.b1,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
  },
  h2: {
    color: colors.g19,
    fontSize: size.xxxtiny,
    fontFamily: family.Gilroy_Medium,
  },
  inputStyle: {
    height: 25,
    color: colors.g19,
    padding: 0,
    textAlign: 'right',
  },

  aiRow1: {
    flexDirection: 'row',
    height: '100%',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
