import React, {useState} from 'react';
import {Alert, Image, SafeAreaView, Text, View} from 'react-native';
import {
  AppButton,
  AppHeader,
  AppInput,
  AppLoader,
  BackHeader,
} from '../../../components';
import {
  appIcons,
  checkConnected,
  colors,
  networkText,
  PhoneAuthFields,
  PhoneAuthFieldsVS,
} from '../../../shared/exporter';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {forgotPassRequest} from '../../../redux/actions';
import CountryPicker from 'react-native-country-picker-modal';

const VerifyPhone = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [country, setcountry] = useState({
    name: 'United States',
    callingCode: ['1'],
  });
  const [cca2, setcca2] = useState('US');

  const dispatch = useDispatch(null);

  const setCountryValue = val => {
    setcca2(val.cca2);
    setcountry(val);
  };

  //On Submit
  const onSubmit = async values => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      const form = new FormData();
      form.append('user[phone_number]', values.contact);

      dispatch(
        forgotPassRequest(
          'phone',
          form,
          res => {
            console.log('phone forgot otp', res);
            setLoading(false);
            navigation?.navigate('VerifyOTP', {phone: values?.contact});
          },
          res => {
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
      <BackHeader title={'Enter Phone Number'} />
      <View style={styles.contentContainer}>
        <Formik
          initialValues={PhoneAuthFields}
          onSubmit={values => {
            onSubmit(values);
          }}
          validationSchema={PhoneAuthFieldsVS}>
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
                  onChangeText={handleChange('contact')}
                  renderErrorMessage={true}
                  placeholder={`+${country?.callingCode[0]}23 456 789`}
                  value={values.contact}
                  onBlur={() => setFieldTouched('contact')}
                  blurOnSubmit={false}
                  disableFullscreenUI={true}
                  autoCapitalize="none"
                  touched={touched.contact}
                  errorMessage={errors.contact}
                  title={'Phone Number'}
                  keyboardType={'phone-pad'}
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

                    // <Image source={appIcons.america} style={styles.iconStyle} />
                  }
                />
                <Text style={styles.textStyle}>
                  Enter your phone number and we’ll send an verification code to
                  your phone number to reset your password.
                </Text>
                <View style={styles.btnCon}>
                  <AppButton
                    onPress={handleSubmit}
                    title={'Verify Account'}
                    bgColor={colors.p2}
                    shadowColor={colors.btn_shadow}
                  />
                  <Text
                    onPress={() => {
                      navigation?.navigate('ForgotPassword');
                    }}
                    style={styles.footText}>
                    Use email address instead
                  </Text>
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

export default VerifyPhone;
