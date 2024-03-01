import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Pressable, Linking } from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux'
import { set_in_app_notification_to_show } from '../../redux/actions/app-actions/app-actions';
import { TouchableWithoutFeedback } from 'react-native';

const PropertySuggestionInAppNotification = () => {

  const { showed_in_app_notification } = useSelector(state => state?.appReducer)
  const dispatch = useDispatch()
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

  return showed_in_app_notification && (
    <TouchableWithoutFeedback onPress={() => dispatch(set_in_app_notification_to_show(null))} >
      <View style={styles.container}>
        <AnimatedPressable entering={FadeIn} exiting={FadeOut} style={styles.modalContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.crossIconView}
            onPress={() => dispatch(set_in_app_notification_to_show(null))}>
            <Image
              resizeMode="contain"
              source={appIcons.crossIcon}
              style={styles.crossIconStyle}
            />
          </TouchableOpacity>
          <Image
            // resizeMode="contain"
            source={{ uri: showed_in_app_notification?.image }}
            style={styles.imgStyle}
          />
          <Text style={styles.nameTxtStyle}>{showed_in_app_notification?.title || 'N/A'}</Text>
          <Text style={styles.skillTxtStyle}>{capitalizeFirstLetter(showed_in_app_notification?.body) || 'N/A'}</Text>
          <View style={styles.buttonsContainerStyle}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.buttonStyle}
              onPress={() => {
                dispatch(set_in_app_notification_to_show(null))
                Linking.openURL(`housibly://PropertyDetail/${showed_in_app_notification?.data?.property_id}/property_detail`)
              }}
            >
              <Text style={styles.btnTxtStyle}>{showed_in_app_notification?.type == 'sell_property' ? 'View Property' : 'View Detail'}</Text>
            </TouchableOpacity>
            {showed_in_app_notification?.type == 'sell_property' &&
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.buttonStyle, { marginLeft: WP(3) }]}
                onPress={() => {
                  dispatch(set_in_app_notification_to_show(null))
                  navigateFromNotifi(showed_in_app_notification)
                }}
              >
                <Text style={styles.btnTxtStyle}>Contact Person</Text>
              </TouchableOpacity>
            }
          </View>
        </AnimatedPressable>
      </View>
    </TouchableWithoutFeedback>
  )
};

export default PropertySuggestionInAppNotification

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
    backgroundColor: 'white',
    marginHorizontal: WP('5'),
    paddingHorizontal: WP('3.5'),
    paddingTop: WP('7'),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 1
  },
  crossIconView: {
    position:'absolute',
    top:0,
    right:0,
    padding:WP(3),
  },
  crossIconStyle: {
    width: WP('2'),
    height: WP('4'),
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
  buttonsContainerStyle: {
    marginTop: WP('3.3'),
    marginBottom: WP('6'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle: {
    borderRadius: 15,
    width: WP('28.7'),
    height: WP('7.8'),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.p2,
  },
  btnTxtStyle: {
    color: colors.white,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_SemiBold,
  },
});
