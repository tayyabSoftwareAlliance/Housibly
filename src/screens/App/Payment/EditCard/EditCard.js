import React, {useEffect, useState} from 'react';
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
import {edit_card_request} from '../../../../redux/actions';
import {useIsFocused} from '@react-navigation/core';
const EditCard = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const isFocus = useIsFocused(null);
  const dispatch = useDispatch(null);
  const {card_detail} = route?.params;

  //Add Card
  const editCardHanlder = async values => {
    const isConnected = await checkConnected();
    if (isConnected) {
      try {
        // setIsLoading(true);

        var form = new FormData();
        form.append('payment[id]', card_detail?.card?.id);
        form.append('payment[name]', values?.fullname);
        form.append('payment[country]', values?.country);

        const onSuccess = res => {
          setIsLoading(false);
          navigation?.goBack();
          console.log('On edit Card Success');
        };
        const onFailure = res => {
          setIsLoading(false);
          Alert.alert('Error', res);
          console.log('On edit Card Failure', res);
        };

        dispatch(edit_card_request(form, onSuccess, onFailure));
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Error', networkText);
    }
  };
  return (
    <SafeAreaView style={styles.rootContainer}>
      <AppHeader />
      <BackHeader title={'Edit Card'} />
      <View style={styles.contentContainer}>
        <AppHeading title={'Billing Information'} />

        <Formik
          initialValues={addCardFormFields}
          onSubmit={values => {
            editCardHanlder(values);
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
            setFieldValue,
          }) => {
            useEffect(() => {
              if (isFocus) {
                setFieldValue('fullname', card_detail?.card?.name);
                setFieldValue('country', card_detail?.card?.country);
              }
            }, [isFocus]);
            return (
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
                </View>
                <View style={[commonStyles.aiCenter, spacing.my4]}>
                  <View style={styles.btnCon}>
                    <AppButton
                      onPress={handleSubmit}
                      title={'Update'}
                      shadowColor={colors.btn_shadow}
                      bgColor={colors.p2}
                    />
                  </View>
                </View>
              </KeyboardAwareScrollView>
            );
          }}
        </Formik>
      </View>
      <AppLoader loading={isLoading} />
    </SafeAreaView>
  );
};

export default EditCard;
