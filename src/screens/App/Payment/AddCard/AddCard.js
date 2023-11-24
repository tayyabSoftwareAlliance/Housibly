import React, {useState} from 'react';
import {Alert, SafeAreaView, Text, View} from 'react-native';
import styles from './styles';
import {
  addCardFormFields,
  addCardVS,
  checkConnected,
  colors,
  commonStyles,
  family,
  networkText,
  spacing,
} from '../../../../shared/exporter';
import {
  AppButton,
  AppHeader,
  AppHeading,
  AppInput,
  AppLoader,
  BackHeader,
  PaymentInput,
} from '../../../../components';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
// import {createToken} from '@stripe/stripe-react-native';
import {add_card_request} from '../../../../redux/actions';
const AddCard = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch(null);
  //Add Card
  // const addCardHanlder = async values => {
  //   const isConnected = await checkConnected();
  //   if (isConnected) {
  //     try {
  //       setIsLoading(true);
  //       const data = await createToken({
  //         name: values?.fullname,
  //         type: 'Card',
  //         setupFutureUsage: 'OffSession',
  //       });
  //       if (data?.token?.id) {
  //         var form = new FormData();
  //         form.append('payment[name]', values?.fullname);
  //         form.append('payment[token]', data?.token?.id);
  //         form.append('payment[country]', values?.country);

  //         const onSuccess = res => {
  //           setIsLoading(false);
  //           navigation?.goBack();
  //           console.log('On Add Card Success', res);
  //         };
  //         const onFailure = res => {
  //           setIsLoading(false);
  //           Alert.alert('Error', res);
  //           console.log('On Add Card Failure', res);
  //         };

  //         dispatch(add_card_request(form, onSuccess, onFailure));
  //       } else {
  //         setIsLoading(false);

  //         Alert.alert('Failed', 'Unable to proceed payment!');
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     Alert.alert('Error', networkText);
  //   }
  // };
  return (
    <SafeAreaView style={styles.rootContainer}>
      <AppHeader />
      <BackHeader title={'Add Card'} />
      <View style={styles.contentContainer}>
        <AppHeading title={'Billing Information'} />
        <Formik
          initialValues={addCardFormFields}
          onSubmit={values => {
            // addCardHanlder(values);
          }}
          validationSchema={addCardVS}>
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
              style={commonStyles.flex1}
              contentContainerStyle={commonStyles.keyboardView}
              showsVerticalScrollIndicator={false}>
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
                  onChangeText={handleChange('country')}
                  renderErrorMessage={true}
                  placeholder="Country"
                  value={values.country}
                  onBlur={() => setFieldTouched('country')}
                  blurOnSubmit={false}
                  disableFullscreenUI={true}
                  autoCapitalize="none"
                  touched={touched.country}
                  errorMessage={errors.country}
                  title={'Country'}
                  keyboardType={'default'}
                />
                <PaymentInput title={'Card Information'} />
              </View>
              <View style={[commonStyles.aiCenter, spacing.my4]}>
                <View style={styles.btnCon}>
                  <AppButton
                    onPress={handleSubmit}
                    title={'Save Card'}
                    shadowColor={colors.btn_shadow}
                    bgColor={colors.p2}
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

export default AddCard;
