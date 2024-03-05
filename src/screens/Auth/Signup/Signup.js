import React, { useState } from 'react';
import { Alert, Keyboard, SafeAreaView, StatusBar, Text, View } from 'react-native';
import styles from './styles';
import {
  checkConnected,
  colors,
  commonStyles,
  family,
  networkText,
  signupFormFields,
  SignupVS,
  spacing,
} from '../../../shared/exporter';
import {
  AppButton,
  AppHeader,
  AppInput,
  AppLoader,
  AuthFooter,
  BackHeader,
} from '../../../components';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { signUpRequest } from '../../../redux/actions';
import CountryPicker from 'react-native-country-picker-modal';
import { isValidPhoneNumber } from 'libphonenumber-js';
import messaging from '@react-native-firebase/messaging';

const Signup = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [country, setcountry] = useState({
    name: 'United States',
    callingCode: ['1'],
  });
  const [cca2, setcca2] = useState('US');
  const dispatch = useDispatch(null);

  //Handle Signup
  const handleSignUp = async values => {
    Keyboard.dismiss()
    const check = await checkConnected();
    if (check) {
      let phone = '';
      if (values?.contact.charAt(0) == '0') {
        phone = values?.contact?.substring(1);
      } else {
        phone = values.contact;
      }
      try {
        setIsLoading(true);
        const token = await messaging().getToken();
        console.log('tokennnnnn', token)
        let item = route?.params?.item;
        let profileType = route?.params?.regPurpose;
        const data = new FormData();
        data.append('user[full_name]', values?.fullname);
        data.append('user[email]', values?.email);
        data.append('user[password]', values?.password);
        data.append('user[phone_number]', phone);
        data.append('user[country_name]', cca2);
        data.append('user[country_code]', country?.callingCode[0]);
        data.append('user[licensed_realtor]', item?.licensed || 'No');
        data.append('user[contacted_by_real_estate]', item?.contacted || 'No');
        data.append(
          'user[user_type]',
          item?.userType ? item?.userType.toLowerCase() : 'neither',
        );
        data.append('user[profile_type]', profileType);
        data.append('user[mobile_devices_attributes][][mobile_device_token]', token);
        console.log('data', data)
        const signUpSuccess = async res => {
          setIsLoading(false);
          setTimeout(() => {
            navigation?.replace('VerifyOTP', {
              registeration: true,
              email: values?.email,
              profileType
            });
          }, 1000)
        };
        const signUpFailure = async res => {
          Alert.alert('Error', res);
          setIsLoading(false);
        };
        dispatch(signUpRequest(data, signUpSuccess, signUpFailure));
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Error', networkText);
    }
  };
  //Contry Value
  const setCountryValue = val => {
    setcca2(val.cca2);
    setcountry(val);
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle={'dark-content'}
      />
      <AppHeader />
      <BackHeader title={'Create Account'} />
      <View style={styles.contentContainer}>
        <Formik
          initialValues={signupFormFields}
          onSubmit={values => {
            handleSignUp(values);
          }}
          validate={(values) => {
            const errors = {}
            if (!isValidPhoneNumber(values.contact, cca2))
              errors.contact = 'Invalid phone number'
            return errors
          }}
          validationSchema={SignupVS}>
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
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'space-between',
              }}
              keyboardShouldPersistTaps={'handled'}>
              <View style={styles.inputCon}>
                <AppInput
                  onChangeText={handleChange('fullname')}
                  renderErrorMessage={true}
                  placeholder="Full Name"
                  value={values.fullname}
                  onBlur={() => setFieldTouched('fullname')}
                  blurOnSubmit={false}
                  disableFullscreenUI={true}
                  autoCapitalize="none"
                  touched={touched.fullname}
                  errorMessage={errors.fullname}
                  title={'Full Name'}
                />
                <AppInput
                  onChangeText={handleChange('email')}
                  renderErrorMessage={true}
                  placeholder="Email address"
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
                <AppInput
                  onChangeText={handleChange('contact')}
                  renderErrorMessage={true}
                  placeholder="Add number here"
                  value={values.contact}
                  onBlur={() => setFieldTouched('contact')}
                  blurOnSubmit={false}
                  disableFullscreenUI={true}
                  autoCapitalize="none"
                  touched={touched.contact}
                  errorMessage={errors.contact}
                  title={'Phone Number'}
                  keyboardType={'phone-pad'}
                  maxLength={14}
                  rightIcon={
                    <CountryPicker
                      onSelect={setCountryValue}
                      translation="eng"
                      withFlag={true}
                      withEmoji={true}
                      countryCode={cca2}
                      withFilter={true}
                      withAlphaFilter={true}
                    />
                  }
                />
                <AppInput
                  onChangeText={handleChange('password')}
                  renderErrorMessage={true}
                  placeholder="Type here"
                  value={values.password}
                  onBlur={() => setFieldTouched('password')}
                  blurOnSubmit={false}
                  disableFullscreenUI={true}
                  autoCapitalize="none"
                  touched={touched.password}
                  errorMessage={errors.password}
                  onSubmitEditing={handleSubmit}
                  secureTextEntry
                  title={'Create Password'}
                />
              </View>
              <View style={[commonStyles.aiCenter, spacing.mt10]}>
                <Text style={styles.footerText}>
                  By creating account, you agree to our{' '}
                  <Text
                    onPress={() => {
                      navigation.navigate('Terms');
                    }}
                    style={[
                      styles.footerText,
                      {
                        color: colors.p1,
                        fontFamily: family.Gilroy_SemiBold,
                        textDecorationLine: 'underline',
                      },
                    ]}>
                    Terms & Conditions
                  </Text>{' '}
                  &{' '}
                  <Text
                    onPress={() => {
                      navigation.navigate('PrivacyPolicy');
                    }}
                    style={[
                      styles.footerText,
                      {
                        color: colors.p1,
                        fontFamily: family.Gilroy_SemiBold,
                        textDecorationLine: 'underline',
                      },
                    ]}>
                    Privacy Policy
                  </Text>
                </Text>
                <View style={styles.btnCon}>
                  <AppButton
                    onPress={handleSubmit}
                    title={'Create Account'}
                    shadowColor={colors.btn_shadow}
                    bgColor={colors.p2}
                  />
                  <AuthFooter
                    title={'Have an account already?'}
                    subtitle={'Login'}
                    onPress={() => {
                      navigation?.navigate('Login');
                    }}
                  />
                </View>
              </View>
            </KeyboardAwareScrollView>
          )}
        </Formik>
      </View>
      <AppLoader loading={isLoading} />
    </SafeAreaView>
  );
};

export default Signup;
