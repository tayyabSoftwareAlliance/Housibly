import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {appIcons, colors, family, size, WP} from '../../shared/exporter';

export const CardOptionModal = ({
  modalRef,
  height,
  onPressDefault,
  onPressRemove,
  onPressEdit,
}) => {
  const OptionButton = ({img, title, bgColor, onPress}) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.aiRow}>
        <View style={[styles.imgCon, {backgroundColor: bgColor}]}>
          <Image source={img} style={styles.imgStyle} />
        </View>
        <Text style={styles.textStyle}>{title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <RBSheet
      ref={modalRef}
      height={height}
      openDuration={250}
      customStyles={{
        container: styles.container,
      }}>
      <OptionButton
        onPress={onPressDefault}
        bgColor={colors.p6}
        img={appIcons.default}
        title={'Set as Default'}
      />
      <OptionButton
        onPress={onPressRemove}
        bgColor={colors.r4}
        img={appIcons.delete}
        title={'Remove Card'}
      />
      <OptionButton
        onPress={onPressEdit}
        bgColor={colors.p7}
        img={appIcons.edit}
        title={'Edit Card'}
      />
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: WP('5'),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imgStyle: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
  },
  aiRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgCon: {
    height: 46,
    width: 46,
    borderRadius: 25,
    alignItems: 'center',
    marginRight: 10,
    justifyContent: 'center',
    marginVertical: 10,
  },
  textStyle: {
    fontFamily: family.Gilroy_Medium,
    fontSize: size.large,
    color: colors.b6,
  },
});
