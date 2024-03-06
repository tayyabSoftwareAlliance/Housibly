import React, { useState } from 'react';
import { Alert, SafeAreaView, Text, View } from 'react-native';
import {
  AppButton,
  AppHeader,
  AppInput,
  AppLoader,
  BackHeader,
} from '../../../components';
import {
  checkConnected,
  colors,
  networkText,
  resetFormFields,
  ResetPasswordVS,
} from '../../../shared/exporter';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassRequest } from '../../../redux/actions';

const ResetPassword = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const { forgotPassRes } = useSelector(state => state?.auth);

  const dispatch = useDispatch(null);

  //On Submit
  const onSubmit = async values => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      const form = new FormData();
      form.append(
        route?.params?.email ? 'user[email]' : 'user[phone_number]',
        route?.params?.email ? route?.params?.email : route?.params?.phone,
      );
      form.append('user[password]', values?.password);
      const resetSuccess = async res => {
        setLoading(false);
        await new Promise(res => setTimeout(res, 1000))
        navigation?.replace('App');
      };
      const resetFailure = async res => {
        setLoading(false);
        Alert.alert('Error', res);
      };
      dispatch(
        resetPassRequest(
          route?.params?.email ? 'email' : 'phone',
          form,
          resetSuccess,
          resetFailure,
        ),
      );
    } else {
      Alert.alert('Error', networkText);
    }
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <AppHeader />
      <BackHeader title={'Create New Password'} />
      <View style={styles.contentContainer}>
        <Formik
          initialValues={resetFormFields}
          onSubmit={values => {
            onSubmit(values);
          }}
          validationSchema={ResetPasswordVS}>
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
            handleReset,
          }) => (
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.inputContainer}>
                <AppInput
                  onChangeText={handleChange('password')}
                  renderErrorMessage={true}
                  placeholder="New Password"
                  value={values.password}
                  onBlur={() => setFieldTouched('password')}
                  blurOnSubmit={false}
                  disableFullscreenUI={true}
                  autoCapitalize="none"
                  touched={touched.password}
                  errorMessage={errors.password}
                  onSubmitEditing={handleSubmit}
                  secureTextEntry
                  title={'Type New Password'}
                />
                <AppInput
                  onChangeText={handleChange('confirmPassword')}
                  renderErrorMessage={true}
                  placeholder="New Confirm Password"
                  value={values.confirmPassword}
                  onBlur={() => setFieldTouched('confirmPassword')}
                  blurOnSubmit={false}
                  disableFullscreenUI={true}
                  autoCapitalize="none"
                  touched={touched.confirmPassword}
                  errorMessage={errors.confirmPassword}
                  onSubmitEditing={handleSubmit}
                  secureTextEntry
                  title={'Re-type New Password'}
                />
                <Text style={styles.textStyle}>
                  Your new password must be different from previous used
                  password.
                </Text>
                <View style={styles.btnCon}>
                  <AppButton
                    title={'Reset Password'}
                    bgColor={colors.p2}
                    shadowColor={colors.btn_shadow}
                    onPress={handleSubmit}
                  />
                </View>
              </View>
            </KeyboardAwareScrollView>
          )}
        </Formik>
      </View>
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default ResetPassword;
