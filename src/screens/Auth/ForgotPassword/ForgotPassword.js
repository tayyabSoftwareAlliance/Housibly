import React, {useState} from 'react';
import {Text, View, SafeAreaView, Alert, Keyboard} from 'react-native';
import {
  AppButton,
  AppInput,
  AppHeader,
  BackHeader,
  AppLoader,
} from '../../../components';
import {
  checkConnected,
  colors,
  forgotFormFields,
  ForgotPasswordVS,
  networkText,
} from '../../../shared/exporter';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {forgotPassRequest} from '../../../redux/actions';

const ForgotPassword = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(null);

  //On Submit
  const onSubmit = async (values, resetForm) => {
    Keyboard.dismiss()
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      const form = new FormData();
      form.append('user[email]', values.email);

      dispatch(
        forgotPassRequest(
          'email',
          form,
          res => {
            console.log('Forgot otp', res);
            setLoading(false);
            resetForm();
            navigation?.navigate('VerifyOTP', {email: values?.email});
          },
          res => {
            console.log(res);
            Alert.alert('Error', res);
            setLoading(false);
          },
        ),
      );
    } else {
      Alert.alert('Error', networkText);
    }
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <AppHeader />
      <BackHeader title={'Enter Email Address'} />
      <Formik
        initialValues={forgotFormFields}
        onSubmit={(values, {resetForm}) => {
          onSubmit(values, resetForm);
        }}
        validationSchema={ForgotPasswordVS}>
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
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps={'handled'}
            >
            <View style={styles.inputContainer}>
              <AppInput
                onChangeText={handleChange('email')}
                renderErrorMessage={true}
                placeholder="Email"
                value={values.email}
                onBlur={() => setFieldTouched('email')}
                blurOnSubmit={false}
                disableFullscreenUI={true}
                autoCapitalize="none"
                touched={touched.email}
                errorMessage={errors.email}
                title={'Email Address'}
                keyboardType={'email-address'}
              />
              <Text style={styles.textStyle}>
                Enter your email address and we’ll send an verification code to
                reset your password.
              </Text>
              <View style={styles.btnCon}>
                <AppButton
                  title={'Verify Account'}
                  bgColor={colors.p2}
                  shadowColor={colors.btn_shadow}
                  onPress={handleSubmit}
                />
                <Text
                  onPress={() => {
                    navigation?.navigate('VerifyPhone');
                  }}
                  style={styles.footText}>
                  Use phone number instead
                </Text>
              </View>
            </View>
          </KeyboardAwareScrollView>
        )}
      </Formik>
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default ForgotPassword;
