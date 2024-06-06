import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { colors, size } from '../../shared/exporter';

export const FilterInput = ({
  placeholder,
  onChangeText,
  value,
  onPressIn,
  editable,
  keyboardType,
  required
}) => {
  return (
    <View style={{ justifyContent: 'center' }} >
      {!value && <Text style={styles.placeholder}>
        {placeholder || '1,000,000'}
        {required && <Text style={{ color: colors.r1 }} >*</Text>}
      </Text>
      }
      <TextInput
        style={styles.inputStyle}
        onChangeText={onChangeText}
        keyboardType={keyboardType || 'decimal-pad'}
        value={value}
        onPressIn={onPressIn}
        editable={editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    height: 50,
    width: '100%',
    borderLeftColor: colors.p2,
    color: colors.b1,
    padding: 0,
  },
  placeholder: {
    position: 'absolute',
    color: colors.g19
  }
});
