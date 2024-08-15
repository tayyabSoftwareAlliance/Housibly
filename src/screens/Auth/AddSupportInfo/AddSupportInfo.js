import React, { useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  StatusBar,
  Keyboard,
} from 'react-native';
import {
  AppButton,
  AppHeader,
  AppInput,
  AppLoader,
  BackHeader,
  ImagePickerModal,
  TextBox,
} from '../../../components';
import {
  AddSupportInfoField,
  AddSupportInfoVS,
  appIcons,
  checkConnected,
  colors,
  HP,
  networkText,
  spacing,
  WP,
} from '../../../shared/exporter';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { addInfoRequest, setSupportClosureRequest } from '../../../redux/actions';
import { Icon } from 'react-native-elements/dist/icons/Icon';

const AddSupportInfo = ({ navigation, route }) => {

  const { params } = route
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useSelector(state => state?.auth);
  const [professionList, setprofessionList] = useState([
    {
      title: '',
    },
  ]);
  const dispatch = useDispatch(null);

  //On Submit
  const onSubmit = async values => {
    Keyboard.dismiss()
    const check = await checkConnected();
    if (check) {
      const filteredProfessionList = professionList.filter(item => item?.title)
      if (filteredProfessionList[0]?.title) {
        const body = {
          description: values?.desc,
          avatar: values?.image,
          profession: filteredProfessionList,
          hourly_rate: values?.hourly_rate,
        };
        const addInfoSuccess = async () => {
          setTimeout(() => {
            navigation?.navigate('UploadDocuments');
          }, 500);
        };
        dispatch(setSupportClosureRequest({ ...body }, addInfoSuccess));
      } else {
        Alert.alert('Error', 'At least one profession required!');
      }
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
      <BackHeader title={'Your Information'} />
      <Formik
        initialValues={AddSupportInfoField}
        onSubmit={values => {
          onSubmit(values);
        }}
        validationSchema={AddSupportInfoVS}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
          setFieldValue,
        }) => {
          //Gallery Handlers
          const showGallery = () => {
            setShow(false);
            setTimeout(() => {
              ImagePicker.openPicker({
                width: 300,
                height: 400,
              }).then(image => {
                setFieldValue('image', image);
                setShow(false);
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
                setFieldValue('image', image);
                setShow(false);
              });
            }, 400);
          };
          return (
            <View style={styles.contentContainer}>
              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
                extraScrollHeight={HP(20)}
              >
                <View style={styles.inputContainer}>
                  <View style={styles.imgCon}>
                    <TouchableOpacity
                      onPress={() => {
                        setShow(true);
                      }}>
                      <ImageBackground
                        style={[styles.imgStyle]}
                        imageStyle={{
                          borderRadius: 15,
                        }}
                        source={{
                          uri: values.image?.path,
                        }}>
                        <Image
                          style={styles.iconStyle}
                          source={appIcons.gallery_1}
                        />
                      </ImageBackground>
                    </TouchableOpacity>
                    {errors.image && touched.image && (
                      <Text style={styles.error}>{errors.image}</Text>
                    )}
                  </View>
                  <View style={[spacing.mt4]}>
                    <Text
                      style={[
                        styles.h1Style,
                        {
                          paddingHorizontal: WP('3'),
                          marginVertical: 10,
                        },
                      ]}>
                      Profession
                    </Text>
                    <FlatList
                      data={professionList}
                      keyExtractor={(_, index) => index}
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
                          professionList[professionList.length - 1]?.title ?
                            <Text
                              onPress={() => {
                                setprofessionList([
                                  ...professionList,
                                  {
                                    title: '',
                                  },
                                ]);
                              }}
                              style={[styles.rightText, spacing.mb4]}>
                              Add More
                            </Text> : null
                        );
                      }}
                    />
                  </View>
                  <View>
                    <AppInput
                      onChangeText={handleChange('hourly_rate')}
                      renderErrorMessage={true}
                      placeholder="Hourly Rate"
                      value={values.hourly_rate}
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
                    <View style={styles.mh}>
                      <Text style={styles.h1Style}>
                        Tell something about you
                      </Text>
                      <TextBox
                        borderRadius={24}
                        height={WP('50')}
                        onChangeText={handleChange('desc')}
                        value={values.desc}
                        error={errors.desc}
                        touched={touched.desc}
                        placeholder={'Add here'}
                      />
                    </View>
                    <View>
                      <AppButton title={'Next'} onPress={handleSubmit} />
                    </View>
                  </View>
                </View>
              </KeyboardAwareScrollView>

              {show && (
                <ImagePickerModal
                  show={show}
                  onPressCamera={() => {
                    showCamera();
                  }}
                  onPressGallery={() => {
                    showGallery();
                  }}
                  onPressHide={() => {
                    setShow(false);
                  }}
                />
              )}
            </View>
          );
        }}
      </Formik>
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default AddSupportInfo;
