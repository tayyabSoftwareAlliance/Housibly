import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {colors, WP, family, size, appIcons} from '../../shared/exporter';

export const AddressModal = ({show, onPressHide}) => {
  return (
    <Modal onBackdropPress={onPressHide} isVisible={show}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.crossIconView}
          onPress={() => onPressHide()}>
          <Image
            resizeMode="contain"
            source={appIcons.crossIcon}
            style={styles.crossIconStyle}
          />
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <Image
            resizeMode="contain"
            source={appIcons.mapIcon}
            style={styles.iconStyle}
          />
        </View>
        <Text style={styles.nameTxtStyle}>Dream Address</Text>
        <Text style={styles.descTxtStyle}>
          Specific address you want to buy, if it comes to the market, type it
          here. Amet minim mollit non deserunt ullamco
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={() => onPressHide()}>
          <Text style={styles.btnTxtStyle}>OK</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: 8,
    paddingTop: WP('3.5'),
    backgroundColor: 'white',
    marginHorizontal: WP('5'),
    paddingHorizontal: WP('3.5'),
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
  iconContainer: {
    width: WP('25'),
    height: WP('25'),
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.g11,
  },
  iconStyle: {
    width: WP('15.5'),
    height: WP('16.5'),
  },
  nameTxtStyle: {
    color: colors.b1,
    fontSize: size.h6,
    alignSelf: 'center',
    paddingTop: WP('4'),
    fontFamily: family.Gilroy_SemiBold,
  },
  descTxtStyle: {
    color: colors.b1,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: size.tiny,
    paddingTop: WP('4.8'),
    paddingHorizontal: WP('2'),
    fontFamily: family.Gilroy_Regular,
  },
  buttonStyle: {
    borderRadius: 15,
    width: WP('28.7'),
    height: WP('7.8'),
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: WP('7.4'),
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
