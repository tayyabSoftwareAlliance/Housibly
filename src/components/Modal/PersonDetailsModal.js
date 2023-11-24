import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {
  colors,
  WP,
  family,
  size,
  appIcons,
  appImages,
} from '../../shared/exporter';

export const PersonDetailsModal = ({show, onPressHide}) => {
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
        <Image
          resizeMode="contain"
          source={appImages.personImg}
          style={styles.imgStyle}
        />
        <Text style={styles.nameTxtStyle}>Harden Eusaff</Text>
        <Text style={styles.companyTxtStyle}>Company 123</Text>
        <View style={styles.rowContainer}>
          <Image
            resizeMode="contain"
            source={appIcons.starIcon}
            style={styles.starIconStyle}
          />
          <Text style={styles.ratingTxtStyle}>5</Text>
        </View>
        <Text style={styles.skillTxtStyle}>Home Technician</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={() => onPressHide()}>
          <Text style={styles.btnTxtStyle}>View Profile</Text>
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
  imgStyle: {
    width: WP('25'),
    height: WP('25'),
    alignSelf: 'center',
  },
  nameTxtStyle: {
    color: colors.b1,
    fontSize: size.h6,
    alignSelf: 'center',
    paddingTop: WP('4'),
    fontFamily: family.Gilroy_SemiBold,
  },
  companyTxtStyle: {
    color: colors.b1,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: size.tiny,
    paddingTop: WP('1.5'),
    fontFamily: family.Gilroy_SemiBold,
  },
  rowContainer: {
    paddingTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starIconStyle: {
    width: WP('3'),
    height: WP('3'),
  },
  ratingTxtStyle: {
    top: 1.2,
    paddingLeft: 5,
    color: colors.g17,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
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
