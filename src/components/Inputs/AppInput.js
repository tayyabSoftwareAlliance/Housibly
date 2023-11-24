import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Input, IconProps, Icon} from 'react-native-elements';
import {useStore} from 'react-redux';
import {family, size, colors, WP} from '../../shared/exporter';

const AppInput = ({
  placeholder,
  leftIcon,
  rightIcon,
  secureTextEntry,
  renderErrorMessage,
  errorMessage,
  onChangeText,
  disableFullscreenUI,
  autoCapitalize,
  touched,
  blurOnSubmit,
  onBlur,
  value,
  onSubmitEditing,
  editable,
  title,
  keyboardType,
  maxLength,
}) => {
  const [showPass, setShowPass] = React.useState(secureTextEntry);

  return (
    <View style={styles.container}>
      {title && <Text style={styles.textStyle}>{title}</Text>}
      <Input
        placeholder={placeholder}
        secureTextEntry={showPass}
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        leftIcon={leftIcon}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        disableFullscreenUI={disableFullscreenUI}
        autoCapitalize={autoCapitalize}
        blurOnSubmit={blurOnSubmit}
        editable={editable}
        keyboardType={keyboardType}
        rightIcon={
          secureTextEntry ? (
            <Icon
              onPress={() => {
                setShowPass(!showPass);
              }}
              name={showPass ? 'eye-with-line' : 'eye'}
              type={'entypo'}
              size={22}
              color={colors.g6}
              tvParallaxProperties={undefined}
            />
          ) : (
            rightIcon
          )
        }
        errorMessage={touched && errorMessage}
        renderErrorMessage={renderErrorMessage}
        autoCompleteType={undefined}
        onSubmitEditing={onSubmitEditing}
        maxLength={maxLength}
      />
    </View>
  );
};

export {AppInput};

const styles = StyleSheet.create({
  container: {},
  inputStyle: {
    fontFamily: family.Gilroy_Medium,
    fontSize: size.tiny,
    borderBottomWidth: 0,
    color: colors.b1,
  },
  inputContainerStyle: {
    borderRadius: 24,
    backgroundColor: colors.g5,
    borderBottomWidth: 0,
    paddingHorizontal: WP('3'),
  },
  textStyle: {
    paddingHorizontal: WP('3'),
    marginBottom: 10,
    color: colors.b1,
    fontFamily: family.Gilroy_Medium,
  },
});
