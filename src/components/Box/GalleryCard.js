import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {
  appIcons,
  colors,
  commonStyles,
  family,
  handleCameraPermission,
  image_options,
  size,
  WP,
} from '../../shared/exporter';
import ImagePicker from 'react-native-image-crop-picker';
import { ImagePickerModal } from '../Modal/ImagePickerModal';
import Video from 'react-native-video';
import { Icon } from 'react-native-elements';
import VideoOpenedModal from '../Modal/VideoOpenedModal';

export const GalleryCard = ({
  from,
  title,
  subtitle,
  imageArray,
  onSelect,
  titleContainerStyle,
  onRemove
}) => {

  const [show, setShow] = useState(false)
  const [videoModal, setVideoModal] = useState(false)
  const [openedVideoURI, setOpenedVideoURI] = useState('')

  const openGallery = () => {
    setShow(false);
    setTimeout(() => {
      ImagePicker.openPicker(from == 'AddPropertyDetails' ? { ...image_options, mediaType: 'any' } : image_options).then(image => {
        var array3 = imageArray.concat(image);
        // this line filters out the same size images that are more than one
        // const distinctItems = [
        //   ...new Map(array3.map(item => [item['size'], item])).values(),
        // ];
        onSelect(array3.slice(0, 30));
        setShow(false);
      });
    }, 400);
  };

  //Camra Handlers
  const openCamera = async () => {
    setShow(false);
    setTimeout(() => {
      ImagePicker.openCamera(from == 'AddPropertyDetails' ? { ...image_options, mediaType: 'any' } : image_options).then(image => {
        var array3 = imageArray.concat(image);
        // this line filters out the same size images that are more than one
        // const distinctItems = [
        //   ...new Map(array3.map(item => [item['size'], item])).values(),
        // ];
        onSelect(array3.slice(0, 30));
        setShow(false);
      }).catch(error => console.log('error ', error))
    }, 400);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.titleCon, titleContainerStyle]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={commonStyles.aiRow}>
        <TouchableOpacity onPress={() => setShow(true)}>
          <ImageBackground style={styles.imgCon}>
            <Image style={styles.imgStyle} source={appIcons.gallery_1} />
          </ImageBackground>
        </TouchableOpacity>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={imageArray}
          horizontal
          renderItem={({ item, index }) => (
            item?.deleted ? null :
              <ImageBackground
                imageStyle={{ borderRadius: 13,backgroundColor: colors.g13}}
                style={styles.imgCon}
                source={{ uri: item?.id ? item?.url : item?.path }}>
                <TouchableOpacity
                  style={styles.iconCon}
                  onPress={() => onRemove(index)}>
                  <Image style={styles.iconStyle} source={appIcons.cross} />
                </TouchableOpacity>
                {/* video upper layer */}
                {(item?.id ? item?.url?.includes('mp4') : item.mime?.includes('video')) &&
                  <Pressable style={styles.videoLoadingUpperLayer} onPress={() => { setOpenedVideoURI(item?.id ? item?.url : item?.path); setVideoModal(true) }}  >
                    <Icon
                      type="ant-design"
                      name={'play'}
                      color={colors.white}
                      size={20}
                    />
                  </Pressable>
                }
              </ImageBackground>
          )}
        />
      </View>
      {show && (
        <ImagePickerModal
          from={from}
          show={show}
          onPressCamera={() => {
            openCamera();
          }}
          onPressGallery={() => {
            openGallery();
          }}
          onPressHide={() => {
            setShow(false);
          }}
        />
      )}
      {videoModal && openedVideoURI &&
        <VideoOpenedModal
          isVisible={videoModal}
          setModal={setVideoModal}
          uri={openedVideoURI}
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  titleCon: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  title: {
    fontFamily: family.Gilroy_SemiBold,
    fontSize: size.xsmall,
    color: colors.b1,
  },
  subtitle: {
    fontSize: size.xxtiny,
    color: colors.b1,
    fontFamily: family.Gilroy_Medium,
  },
  imgCon: {
    height: 111,
    width: 111,
    borderWidth: 1,
    margin: 5,
    borderRadius: 13,
    borderColor: colors.g29,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoLoadingUpperLayer: {
    position: 'absolute',
    height: 113,
    width: 113,
    borderRadius: 13,
    zIndex: 1,
    // backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgStyle: {
    height: 23,
    width: 23,
    resizeMode: 'contain',
  },
  iconStyle: {
    height: 8,
    width: 8,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  iconCon: {
    backgroundColor: colors.r1,
    height: 15,
    width: 15,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    position: 'absolute',
    top: -4,
    right: -3,
    zIndex: 2
  },
});
