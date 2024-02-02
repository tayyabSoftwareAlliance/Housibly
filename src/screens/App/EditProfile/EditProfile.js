import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Alert,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
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
  GalleryCard,
} from '../../../components';
import {
  WP,
  appIcons,
  colors,
  editFormFields,
  editProfileFieldsVS,
  platformOrientedCode,
  profile_uri,
  spacing,
} from '../../../shared/exporter';
import styles from './styles';
import { useDispatch } from 'react-redux';
import { updateProfileRequest } from '../../../redux/actions';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import CountryPicker from 'react-native-country-picker-modal';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { supportCloserEditProfileFieldsVS } from '../../../shared/utilities/validations';
import { isValidPhoneNumber } from 'libphonenumber-js';

const EditProfile = ({ navigation, route }) => {

  const from = route.params?.from
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
  const [professionList, setprofessionList] = useState([
    {
      title: '',
    },
  ]);
  const [imageArray, setImageArray] = useState([]);
  const dispatch = useDispatch(null);

  useLayoutEffect(() => {
    let userImg = route?.params?.item?.avatar;
    if (userImg === '') {
      console.log('empty image');
    } else {
      setOldImage(route?.params?.item?.avatar);
    }
  }, [navigation, route]);

  //Gallery Handlers
  const showGallery = () => {
    setShow(false);
    setTimeout(() => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        mediaType: 'photo',
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
        mediaType: 'photo',
      }).then(image => {
        setUserImage(image);
      });
    }, 400);
  };

  const removeImage = (index) => {
    setImageArray(() => {
      if (imageArray[index]?.id)
        return imageArray.map((item, i) => {
          if (i == index)
            item.deleted = true
          return { ...item }
        })
      return imageArray.filter((_, i) => i != index)
    })
  }

  const handleUpdateProfile = values => {
    if (from == 'SUPPORT_CLOSER_HOME' && !professionList.filter(item => item.title).length > 0) {
      Alert.alert('Error', 'At least one profession required!');
      return
    }
    setIsLoading(true);
    const data = new FormData();
    let phone = '';
    if (values?.phone.charAt(0) == '0') {
      phone = values?.phone?.substring(1);
    } else {
      phone = values.phone;
    }
    data.append('user[full_name]', values?.full_name);
    // data.append('user[email]', values?.email);
    data.append('user[phone_number]', phone);
    professionList.map((item, index) => {
      if (item.id) {
        data.append(`user[professions_attributes][${index}][id]`, item.id)
        if (item.title)
          data.append(`user[professions_attributes][${index}][title]`, item.title)
        else
          data.append(`user[professions_attributes][${index}][_destroy]`, true)
      } else if (item.title)
        data.append(`user[professions_attributes][${index}][title]`, item.title)
    })
    data.append('user[hourly_rate]', values?.hourly_rate);
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
      console.log('imggg', imgObj)
      data.append('user[avatar]', imgObj);
    }
    imageArray.map(item => {
      if (item.id) {
        if (!item.deleted)
          data.append('user[images][]', item.id)
      } else {
        const imgObj = {
          name: item.filename || 'image',
          uri: item.path,
          type: item.mime,
        }
        data.append('user[images][]', imgObj)
      }
    })
    const updateProfileSuccess = async res => {
      // Alert.alert('Success', 'Profile Updated Successfully!');
      navigation.goBack();
      setIsLoading(false);
    };
    const updateProfileFailure = async err => {
      console.log('Err is ==> ', err);
      Alert.alert('Error', err);
      setIsLoading(false);
    };
    console.log('data', data)
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
          validate={(values) => {
            const errors = {}
            if (!isValidPhoneNumber(values.phone, cca2))
              errors.phone = 'Invalid phone number'
            return errors
          }}
          validationSchema={from == 'SUPPORT_CLOSER_HOME' ? supportCloserEditProfileFieldsVS : editProfileFieldsVS}>
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
              setFieldValue('full_name', data?.full_name);
              setFieldValue('email', data?.email);
              setFieldValue('bio', data?.description);
              setFieldValue('phone', data?.phone_number);
              setcca2(data?.country_name || 'US');
              setcountry({ callingCode: data?.country_code || '1' });
              data?.professions?.length > 0 && setprofessionList(data.professions);
              setFieldValue('hourly_rate', data?.hourly_rate);
              setImageArray(data?.images || [])
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
                    onChangeText={handleChange('full_name')}
                    renderErrorMessage={true}
                    placeholder={data?.full_name}
                    value={values.full_name}
                    onBlur={() => setFieldTouched('full_name')}
                    blurOnSubmit={false}
                    disableFullscreenUI={true}
                    autoCapitalize="none"
                    touched={touched.full_name}
                    errorMessage={errors.full_name}
                    title={'Full Name'}
                  />

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

                  {from == 'SUPPORT_CLOSER_HOME' &&
                    <>
                      <Text
                        style={[
                          styles.h1Style,
                          {
                            paddingHorizontal: WP('3'),
                          },
                        ]}>
                        Profession
                      </Text>
                      <FlatList
                        data={professionList}
                        renderItem={({ item, index }) => {
                          return (
                            <AppInput
                              placeholder="Enter Profession"
                              value={item.title}
                              onChangeText={text => {
                                professionList[index].title = text;
                                setprofessionList([...professionList])
                              }}
                            />
                          );
                        }}
                        ListFooterComponent={() => {
                          return (
                            <>
                              <Text
                                onPress={() => {
                                  setprofessionList([
                                    ...professionList,
                                    {
                                      title: '',
                                    },
                                  ]);
                                }}
                                style={styles.rightText}>
                                Add More
                              </Text>
                            </>
                          );
                        }}
                      />
                    </>
                  }

                  {from == 'SUPPORT_CLOSER_HOME' &&
                    <AppInput
                      onChangeText={handleChange('hourly_rate')}
                      renderErrorMessage={true}
                      placeholder="Hourly Rate"
                      value={`${values.hourly_rate}`}
                      onBlur={() => setFieldTouched('hourly_rate')}
                      blurOnSubmit={false}
                      disableFullscreenUI={true}
                      autoCapitalize="none"
                      touched={touched.hourly_rate}
                      errorMessage={errors.hourly_rate}
                      title={'Hourly Rate'}
                      keyboardType={'numeric'}
                      leftIcon={
                        <Icon
                          type={'fontisto'}
                          name={'dollar'}
                          size={12}
                          color={colors.gr1}
                        />
                      }
                    />
                  }
                  <Text style={styles.textStyle}>Tell something about you</Text>
                  <TextBox
                    conStyle={spacing.px2}
                    onChangeText={handleChange('bio')}
                    value={values.bio}
                    placeholder={'Add here'}
                    error={errors.bio}
                    touched={touched.bio}
                    height={190}
                  />
                  {from == 'SUPPORT_CLOSER_HOME' &&
                    <GalleryCard
                      imageArray={imageArray}
                      title={'Upload Photos'}
                      titleContainerStyle={{ paddingHorizontal: WP('3') }}
                      onSelect={arr => setImageArray(arr)}
                      onRemove={removeImage}
                    // subtitle={'Max 30 images'}
                    />
                  }
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
