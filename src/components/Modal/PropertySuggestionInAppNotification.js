import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import {
  colors,
  WP,
  family,
  size,
  appIcons,
  HP,
  capitalizeFirstLetter,
} from '../../shared/exporter';
import { navigateFromNotifi } from '../../shared/utilities/notifications';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

let showNotification = () => { }, hideNotification = () => { }

const PropertySuggestionInAppNotification = () => {

  const [show, setShow] = useState(false)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    showNotification = (notification) => {
      if (show) return
      setNotification(notification)
      setShow(true)
    }
    hideNotification = () => {
      setShow(false)
      setNotification(null)
    }
  }, [])

  return show && (
    // <Modal onBackdropPress={onPressHide} isVisible={show}>
    <Pressable style={styles.container} >
      <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.modalContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.crossIconView}
          onPress={hideNotification}>
          <Image
            resizeMode="contain"
            source={appIcons.crossIcon}
            style={styles.crossIconStyle}
          />
        </TouchableOpacity>
        <Image
          // resizeMode="contain"
          source={{ uri: notification?.type == 'buy_property' ? notification?.data?.property_image : notification?.data?.property_owner_image }}
          style={styles.imgStyle}
        />
        <Text style={styles.nameTxtStyle}>{notification?.title || 'N/A'}</Text>
        <Text style={styles.skillTxtStyle}>{capitalizeFirstLetter(notification?.body) || 'N/A'}</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={() => {
            hideNotification()
            navigateFromNotifi(notification)
          }}
        >
          <Text style={styles.btnTxtStyle}>View Detail</Text>
        </TouchableOpacity>
      </Animated.View>
    </Pressable>
    // </Modal>
  )
};

export default PropertySuggestionInAppNotification
export { showNotification, hideNotification }

const styles = StyleSheet.create({
  container: {
    width: WP(100),
    height: HP(100),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
  },
  modalContainer: {
    width: WP(80),
    alignItems: 'center',
    borderRadius: 8,
    paddingTop: WP('3.5'),
    backgroundColor: 'white',
    marginHorizontal: WP('5'),
    paddingHorizontal: WP('3.5'),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 1
  },
  crossIconView: {
    width: WP('5'),
    height: WP('5'),
    alignSelf: 'flex-end',
  },
  crossIconStyle: {
    width: WP('2'),
    height: WP('4'),
    alignSelf: 'flex-end',
  },
  imgStyle: {
    width: WP('25'),
    height: WP('25'),
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: colors.g14
  },
  nameTxtStyle: {
    color: colors.b1,
    fontSize: size.h6,
    alignSelf: 'center',
    paddingTop: WP('4'),
    fontFamily: family.Gilroy_SemiBold,
    textTransform: 'capitalize'
  },
  rowContainer: {
    paddingTop: WP('5'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skillTxtStyle: {
    color: colors.b1,
    paddingTop: WP('5'),
    alignSelf: 'center',
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Regular,
  },
  buttonStyle: {
    borderRadius: 15,
    width: WP('28.7'),
    height: WP('7.8'),
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: WP('3.3'),
    marginBottom: WP('6'),
    justifyContent: 'center',
    backgroundColor: colors.p2,
  },
  btnTxtStyle: {
    color: colors.white,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_SemiBold,
  },
});
