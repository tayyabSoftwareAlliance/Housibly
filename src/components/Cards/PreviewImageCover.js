import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
  capitalizeFirstLetter,
  colors,
  family,
  size,
  WP,
} from '../../shared/exporter';
import { Icon } from 'react-native-elements';

export const PreviewImageCover = ({ uri, h1, h2, isBookmarked, onBookmarkPress, showBookmarkIcon }) => {
  return (
    <ImageBackground
      style={styles.imgCon}
      imageStyle={styles.imageStyle}
      source={{
        uri: uri,
      }}>
      <Text style={styles.imgh1}>{capitalizeFirstLetter(h1) || ''} </Text>
      <Text style={styles.imgh2}>{capitalizeFirstLetter(h2) || ''}</Text>
      {h1 && showBookmarkIcon &&
        <TouchableOpacity onPress={onBookmarkPress} style={styles.bookMarkIcon} disabled={isBookmarked}>
          <Icon
            type={'MaterialIcons'}
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            color={colors.white}
            size={30}
          />
        </TouchableOpacity>
      }
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imgCon: {
    height: WP('80'),
    width: '100%',
    borderRadius: 15,
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
  imageStyle: {
    borderRadius: 15,
    height: '100%',
    width: '100%',
    backgroundColor: colors.g13,
  },
  imgh1: {
    color: colors.white,
    fontSize: size.h6,
    fontFamily: family.Gilroy_Bold,
    paddingLeft: WP('3'),
    paddingVertical: 5,
  },
  imgh2: {
    color: colors.white,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
    paddingLeft: WP('3'),
    paddingBottom: 10,
  },
  bookMarkIcon: {
    position: 'absolute',
    top: 10,
    right: 10
  }
});
