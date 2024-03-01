import React, { useState } from 'react';
import { Text, View, Image, SafeAreaView, TouchableOpacity, Alert, KeyboardAvoidingView, Keyboard } from 'react-native';
import {
  TextBox,
  AppButton,
  AppHeader,
  BackHeader,
  ImagePickerModal,
  AppLoader,
} from '../../../../components';
import ImagePicker from 'react-native-image-crop-picker';
import {
  appIcons,
  colors,
  responseValidator,
  size,
} from '../../../../shared/exporter';
import styles from './styles';
import { app } from '../../../../shared/api';
import { TouchableWithoutFeedback } from 'react-native';

const SupportQuery = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [queryImage, setQueryImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);

  //Gallery Handlers
  const showGallery = () => {
    setShowModal(false);
    setTimeout(() => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
      }).then(image => {
        setQueryImage(image);
      });
    }, 400);
  };

  //Camra Handlers
  const showCamera = () => {
    setShowModal(false);
    setTimeout(() => {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
      }).then(image => {
        setQueryImage(image);
      });
    }, 400);
  };

  const submitQuery = async () => {
    if (!query) {
      Alert.alert('Error', 'Please enter description')
      return
    }
    try {
      setLoader(true)
      const formData = new FormData()
      formData.append('support[description]', query)
      if (queryImage) {
        const imgObj = {
          name: queryImage.filename || 'image',
          uri: queryImage.path,
          type: queryImage.mime,
        };
        formData.append('support[image]', imgObj)
      }
      const res = await app.createSupportTicket(formData);
      if (res?.status == 200) {
        setQuery('')
        setQueryImage(null)
        setLoader(false)
        setTimeout(() => navigation.navigate('SupportChat', { conversation_id: res?.data?.ticket?.id }), 1000)
      }
    } catch (error) {
      console.log('submitQuery error ', error);
      let msg = responseValidator(error?.response?.status, error?.response?.data);
      Alert.alert('Error', msg || 'Something went wrong!');
    } finally {
      setLoader(false)
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
      <SafeAreaView style={styles.rootContainer}>
        <AppHeader subtitle={'Support'} />
        <BackHeader title={'Support'} />
        <View style={styles.contentContainer}>
          <Text style={styles.h1Style}>Your Message</Text>
          <TextBox
            value={query}
            onChangeText={txt => setQuery(txt)}
            placeholder={'Write something here ...'}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setShowModal(true);
            }}>
            <Image
              source={queryImage ? { uri: queryImage.path } : appIcons.cameraIcon}
              style={styles.imgStyle(queryImage)}
            />
          </TouchableOpacity>
          <Text style={styles.descTxtStyle}>Attach Image or Proof</Text>
        </View>
        <View style={styles.bottomView}>
          <AppButton
            title="Send Message"
            fontSize={size.tiny}
            shadowColor={colors.white}
            borderColor={colors.white}
            onPress={() => submitQuery()}
          />
        </View>
        {showModal && (
          <ImagePickerModal
            show={showModal}
            onPressHide={() => setShowModal(false)}
            onPressGallery={() => {
              showGallery();
            }}
            onPressCamera={() => {
              showCamera();
            }}
          />
        )}
        <AppLoader loading={loader} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SupportQuery;
