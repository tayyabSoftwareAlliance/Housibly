import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  Alert,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  AppButton,
  AppHeader,
  AppInput,
  BackHeader,
  ProfileImageBox,
  TextBox,
  AppLoader,
  ImagePickerModal,
} from '../../../components';
import {
  appIcons,
  colors,
  editFormFields,
  editProfileFieldsVS,
  platformOrientedCode,
  profile_uri,
  spacing,
} from '../../../shared/exporter';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {updateProfileRequest} from '../../../redux/actions';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import CountryPicker from 'react-native-country-picker-modal';

const EditProfile = ({navigation, route}) => {
  const [country, setcountry] = useState({
    name: 'United States',
    callingCode: ['1'],
  });
  const [cca2, setcca2] = useState('US');

  const setCountryValue = val => {
    setcca2(val.cca2);
    setcountry(val);
  };
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(route?.params?.item);
  const [oldImage, setOldImage] = useState(profile_uri);
  const [userImage, setUserImage] = useState('');

  const dispatch = useDispatch(null);

  useLayoutEffect(() => {
    let userImg = route?.params?.item?.image;
    if (userImg === '') {
      console.log('empty image');
    } else {
      setOldImage(route?.params?.item?.image);
    }
  }, [navigation, route]);

  //Gallery Handlers
  const showGallery = () => {
    setShow(false);
    setTimeout(() => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
      }).then(image => {
        setUserImage(image);
      });
    }, 400);
  };

  //Camra Handlers
  const showCamera = () => {
    setShow(false);
    setTimeout(() => {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
      }).then(image => {
        setUserImage(image);
      });
    }, 400);
  };

  const handleUpdateProfile = values => {
    setIsLoading(true);
    const data = new FormData();
    let phone = '';
    if (values?.phone.charAt(0) == '0') {
      phone = values?.phone?.substring(1);
    } else {
      phone = values.phone;
    }
    data.append('user[email]', values?.email);
    data.append('user[phone_number]', phone);
    data.append('user[description]', values?.bio);
    data.append('user[country_name]', cca2);
    data.append('user[country_code]', country?.callingCode[0]);

    if (userImage === '') {
      console.log("Don't send the old image.");
    } else {
      const imgObj = {
        name: userImage?.filename || 'image',
        uri: userImage?.path,
        type: userImage?.mime,
      };
      console.log('imggg',imgObj)
      data.append('user[avatar]', imgObj);
    }

    const updateProfileSuccess = async res => {
      // alert('Profile is updated successfully.');
      navigation.replace('Profile');
      setIsLoading(false);
    };
    const updateProfileFailure = async err => {
      console.log('Err is ==> ', err);
      Alert.alert('Error', err);
      setIsLoading(false);
    };
    dispatch(
      updateProfileRequest(data, updateProfileSuccess, updateProfileFailure),
    );
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <AppHeader />
      <AppLoader loading={isLoading} />
      <BackHeader title={'Edit Profile'} />
      <View style={styles.contentContainer}>
        <Formik
          initialValues={editFormFields}
          onSubmit={values => {
            handleUpdateProfile(values);
          }}
          validationSchema={editProfileFieldsVS}>
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
              setFieldValue('email', data?.email);
              setFieldValue('bio', data?.description);
              setFieldValue('phone', data?.phone_number);
              setcca2(data?.country_name || 'US');
              setcountry({callingCode: data?.country_code || '1'});
            }, [data]);
            return (
              <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.inputContainer}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={spacing.py8}
                    onPress={() => setShow(true)}>
                    <View style={styles.imgCon}>
                      <Image
                        style={styles.imgStyle}
                        source={{
                          uri:
                            userImage === ''
                              ? oldImage
                              : platformOrientedCode(
                                  userImage?.path,
                                  userImage?.sourceURL,
                                ),
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                  <AppInput
                    onChangeText={handleChange('email')}
                    renderErrorMessage={true}
                    placeholder={data?.email}
                    value={values.email}
                    onBlur={() => setFieldTouched('email')}
                    blurOnSubmit={false}
                    disableFullscreenUI={true}
                    autoCapitalize="none"
                    editable={false}
                    touched={touched.email}
                    errorMessage={errors.email}
                    title={'Email Address'}
                  />

                  <AppInput
                    onChangeText={handleChange('phone')}
                    renderErrorMessage={true}
                    placeholder={data?.phone_number}
                    // placeholder={`+${country?.callingCode[0]}23 456 789`}
                    value={values.phone}
                    onBlur={() => setFieldTouched('phone')}
                    blurOnSubmit={false}
                    disableFullscreenUI={true}
                    autoCapitalize="none"
                    touched={touched.phone}
                    errorMessage={errors.phone}
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
                    }
                  />
                  <Text style={styles.textStyle}>Edit Bio</Text>
                  <TextBox
                    conStyle={spacing.px2}
                    onChangeText={handleChange('bio')}
                    value={values.bio}
                    error={errors.bio}
                    touched={touched.bio}
                    height={190}
                  />
                  <View style={styles.btnCon}>
                    <AppButton
                      onPress={handleSubmit}
                      title={'Save'}
                      bgColor={colors.p2}
                      shadowColor={colors.btn_shadow}
                    />
                  </View>
                </View>
                {show && (
                  <ImagePickerModal
                    show={show}
                    onPressHide={() => setShow(false)}
                    onPressGallery={() => {
                      showGallery();
                    }}
                    onPressCamera={() => {
                      showCamera();
                    }}
                  />
                )}
              </KeyboardAwareScrollView>
            );
          }}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
