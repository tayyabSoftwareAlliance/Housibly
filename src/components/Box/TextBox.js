import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Textarea from 'react-native-textarea';
import {colors, family, size, WP} from '../../shared/exporter';

export const TextBox = ({
  onChangeText,
  value,
  placeholder,
  touched,
  blurOnSubmit,
  onBlur,
  onSubmitEditing,
  editable,
  keyboardType,
  error,
  height,
  conStyle,
  borderRadius,
}) => {
  return (
    <View style={conStyle}>
      <Textarea
        containerStyle={[
          styles.textareaContainer,
          {
            height: height ? height : WP('68'),
            borderRadius: borderRadius || 10,
          },
        ]}
        style={styles.textarea}
        onChangeText={onChangeText}
        value={value}
        maxLength={500}
        placeholder={placeholder}
        placeholderTextColor={colors.g3}
        underlineColorAndroid={'transparent'}
        onBlur={onBlur}
        onSubmitEditing={onSubmitEditing}
        editable={editable}
        keyboardType={keyboardType}
        blurOnSubmit={blurOnSubmit}
      />
      {error && touched && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  textareaContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.g10,
    borderRadius: 10,
    marginVertical: 10,
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    fontSize: size.xsmall,
    color: colors.b1,
    fontFamily: family.Gilroy_Medium,
  },
  error: {
    color: 'red',
    fontSize: size.tiny,
    paddingLeft: 10,
  },
});
