import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar,
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
  AddPersonalInfoField,
  AddPersonalInfoVS,
  appIcons,
  checkConnected,
  colors,
  networkText,
} from '../../../shared/exporter';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {addInfoRequest} from '../../../redux/actions';

const AddPersonalInfo = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const {userInfo} = useSelector(state => state?.auth);
  const dispatch = useDispatch(null);
  const onSubmit = async values => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      const imgObj = {
        uri: values?.image?.path,
        type: values?.image?.mime,
        name: values?.image?.fileName || 'image',
      };

      console.log('imgg obj', imgObj);

      const form = new FormData();
      form.append('user[description]', values?.desc);
      form.append('user[avatar]', imgObj);
      const addInfoSuccess = async res => {
        setLoading(false);
        setTimeout(() => {
          navigation?.replace('App');
        }, 500);
      };
      const addInfoFailure = async res => {
        setLoading(false);
        Alert.alert('Error', res);
      };
      dispatch(addInfoRequest(form, addInfoSuccess, addInfoFailure));
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
        initialValues={AddPersonalInfoField}
        onSubmit={values => {
          onSubmit(values);
        }}
        validationSchema={AddPersonalInfoVS}>
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
              <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
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
                  <Text style={styles.h1Style}>Tell something about you</Text>
                  <TextBox
                    onChangeText={handleChange('desc')}
                    value={values.desc}
                    error={errors.desc}
                    touched={touched.desc}
                    placeholder={'Add here'}
                  />
                </View>
                <View>
                  <AppButton title={'Done'} onPress={handleSubmit} />
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

export default AddPersonalInfo;
