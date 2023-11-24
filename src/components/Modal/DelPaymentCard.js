import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {
  appIcons,
  checkBrand,
  colors,
  family,
  size,
  spacing,
  WP,
} from '../../shared/exporter';
import {AppButton} from '..';

export const DelPaymentCard = ({
  onPressHide,
  show,
  cvc,
  expiry_date,
  onPress,
  brand,
}) => {
  return (
    <Modal onBackdropPress={onPressHide} isVisible={show}>
      <View style={[styles.container, {backgroundColor: colors.white}]}>
        <Text style={[styles.h1]}>Remove Card</Text>
        <Text style={[styles.h2]}>Are you sure you want to remove card?</Text>
        <Image style={styles.brandStyle} source={brand} />

        <View style={[styles.leftCon]}>
          <Text style={[styles.h3]}>{`ENDING IN`}</Text>
          <Text style={[styles.h4]}>{expiry_date || '2050'}</Text>
        </View>
        <View style={[spacing.mt8, spacing.mx2]}>
          <AppButton onPress={onPress} title={'Confirm'} fontSize={size.tiny} />
          <AppButton
            title={'Cancel'}
            fontSize={size.tiny}
            bgColor={colors.g21}
            borderColor={colors.g21}
            shadowColor={colors.g21}
            marginVertical={10}
            onPress={onPressHide}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: WP('100'),
    borderRadius: 20,
    padding: 20,
    paddingVertical: WP('6'),
  },
  h1: {
    textAlign: 'center',
    fontSize: size.xxlarge,
    fontFamily: family.Gilroy_Bold,
    color: colors.b2,
  },
  h2: {
    fontSize: size.xsmall,
    marginVertical: 20,
    fontFamily: family.Gilroy_Regular,
    textAlign: 'center',
    alignSelf: 'center',
    color: colors.g31,
    width: '70%',
    lineHeight: 21,
  },
  leftCon: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  brandStyle: {
    height: 17,
    width: 56,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  h3: {
    fontFamily: family.Gilroy_Medium,
    fontSize: size.tiny,
    color: colors.g33,
  },
  h4: {
    fontFamily: family.Gilroy_Medium,
    fontSize: size.xsmall,
    color: colors.b1,
  },
});
