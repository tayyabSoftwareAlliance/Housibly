import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {colors, platformOrientedCode, profile_uri} from '../../shared/exporter';

export const ProfileImageBox = ({imageUrl, onlyImg = false}) => {
  console.log('Image URL is ==> ', imageUrl);
  return (
    <View style={styles.imgCon}>
      <Image
        style={styles.imgStyle}
        source={{
          uri:
            imageUrl === ''
              ? profile_uri
              : onlyImg
              ? imageUrl
              : platformOrientedCode(imageUrl?.path, imageUrl?.sourceURL),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgCon: {
    height: 122,
    width: 122,
    borderRadius: 15,
    backgroundColor: colors.g8,
    borderWidth: 1,
    alignSelf: 'center',
    borderStyle: 'dashed',
    borderColor: colors.g9,
  },
  imgStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
