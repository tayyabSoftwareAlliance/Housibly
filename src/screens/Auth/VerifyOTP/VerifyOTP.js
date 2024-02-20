import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, SafeAreaView, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppButton, AppHeader, AppLoader, BackHeader } from '../../../components';
import {
  checkConnected,
  codeFormFields,
  CodeVS,
  colors,
  family,
  networkText,
  spacing,
} from '../../../shared/exporter';
import styles from './styles';
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import CountDown from 'react-native-countdown-component';
import { Formik } from 'formik';
import { resendOTPRequest, verifyOTPRequest } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const VerifyOTP = ({ navigation, route }) => {
  const [value, setValue] = useState('');
  const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [resendCode, setResendCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(null);
  //Reference Declraration
  const ref = useRef();

  const onSubmit = async values => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      const form = new FormData();
      form.append(
        route?.params?.email ? 'user[email]' : 'user[phone_number]',
        route?.params?.email ? route?.params?.email : route?.params?.phone,
      );
      form.append('otp', values?.code);

      const otpSuccess = async res => {
        setLoading(false);
        await new Promise(res => setTimeout(res, 1000))
        if (route?.params?.registeration) {
          if (route?.params?.profileType === 'support_closer') {
            navigation?.replace('AddSupportInfo', { profile_complete: true });
          } else {
            navigation?.replace('AddPersonalInfo', { profile_complete: true });
          }
        } else {
          navigation?.replace(
            'ResetPassword',
            route?.params?.email
              ? {
                email: route?.params?.email,
              }
              : {
                phone: route?.params?.phone,
              },
          );
        }
      };

      const otpFailure = async res => {
        setLoading(false);
        Alert.alert('Error', res);
      };

      dispatch(verifyOTPRequest(form, otpSuccess, otpFailure));
    } else {
      Alert.alert('Error', networkText);
    }
  };

  //Resend OTP
  const resendOtp = async () => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      const resendForm = new FormData();
      resendForm.append(
        route?.params?.email ? 'user[email]' : 'user[phone_number]',
        route?.params?.email ? route?.params?.email : route?.params?.phone,
      );
      dispatch(
        resendOTPRequest(
          resendForm,
          res => {
            console.log('OTP RESEND', res);
            setLoading(false);
            Alert.alert('Success', 'OTP send successfully');
          },
          res => {
            setLoading(false);
            Alert.alert('Error', res);
          },
        ),
      );
    } else {
      Alert.alert('Error', networkText);
    }
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle={'dark-content'}
      />
      <AppHeader />
      <BackHeader title={'Verify Verification Code'} />
      <View style={styles.contentContainer}>
        <Formik
          initialValues={codeFormFields}
          onSubmit={values => {
            onSubmit(values);
          }}
          validationSchema={CodeVS}>
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
                <CodeField
                  ref={ref}
                  {...codeFieldProps}
                  value={value}
                  onChangeText={val => {
                    handleChange('code')(val);
                    setValue(val);
                  }}
                  cellCount={6}
                  onBlur={() => setFieldTouched('code')}
                  blurOnSubmit={false}
                  disableFullscreenUI={true}
                  autoCapitalize="none"
                  onSubmitEditing={handleSubmit}
                  keyboardType="number-pad"
                  renderCell={({ index, symbol, isFocused }) => (
                    <View
                      key={index}
                      style={[
                        styles.cell,
                        {
                          borderColor: isFocused ? colors.p2 : colors.g7,
                        },
                      ]}
                      onLayout={getCellOnLayoutHandler(index)}>
                      <Text style={styles.txtStyle}>
                        {symbol || (isFocused && <Cursor />)}
                      </Text>
                    </View>
                  )}
                />
                {errors.code && touched.code && (
                  <Text style={styles.errorStyle}>{errors.code}</Text>
                )}
                <Text style={styles.paraTextStyle}>
                  {`Please enter your verification code sent to your ${route?.params?.email ? 'email account' : 'phone number'
                    }`}
                </Text>
              </View>
              <View style={styles.btnCon}>
                <AppButton
                  title={'Verify Code'}
                  bgColor={colors.p2}
                  shadowColor={colors.btn_shadow}
                  onPress={handleSubmit}
                />

                <TouchableOpacity
                  style={spacing.mt5}
                  disabled={resendCode}
                  onPress={() => {
                    setResendCode(true);
                    resendOtp();
                  }}
                  activeOpacity={0.7}>
                  {resendCode ? (
                    <View style={styles.aiRow}>
                      <Text style={[styles.resendText]}>
                        Resend code {resendCode && 'in'}
                      </Text>
                      <CountDown
                        size={12}
                        until={60}
                        digitStyle={styles.digitStyle}
                        digitTxtStyle={[
                          styles.timerText,
                          {
                            color: colors.p2,
                            fontFamily: family.Gilroy_SemiBold,
                          },
                        ]}
                        timeToShow={['S']}
                        onFinish={() => {
                          setResendCode(false);
                        }}
                        timeLabels={{ m: null, s: null }}
                      />
                      <Text
                        style={[
                          styles.timerText,
                          {
                            color: colors.p2,
                            fontFamily: family.Gilroy_SemiBold,
                          },
                        ]}>
                        sec
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.footText}>
                      Didn’t received a code?{' '}
                      <Text
                        style={[
                          styles.footText,
                          {
                            color: colors.p2,
                            fontFamily: family.Gilroy_SemiBold,
                          },
                        ]}>
                        Resend
                      </Text>
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </KeyboardAwareScrollView>
          )}
        </Formik>
        <AppLoader loading={loading} />
      </View>
    </SafeAreaView>
  );
};

export default VerifyOTP;
