import React, {useState} from 'react';
import {Text, View, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import {
  TextBox,
  AppButton,
  AppHeader,
  BackHeader,
  ImagePickerModal,
} from '../../../../components';
import ImagePicker from 'react-native-image-crop-picker';
import {
  appIcons,
  colors,
  platformOrientedCode,
  size,
} from '../../../../shared/exporter';
import styles from './styles';

const SupportQuery = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [queryImage, setQueryImage] = useState('');
  const [showModal, setShowModal] = useState(false);

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

  const submitQuery = () => {};

  return (
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
            source={
              queryImage === ''
                ? appIcons.cameraIcon
                : {
                    uri: platformOrientedCode(
                      queryImage?.path,
                      queryImage?.sourceURL,
                    ),
                  }
            }
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
    </SafeAreaView>
  );
};

export default SupportQuery;
