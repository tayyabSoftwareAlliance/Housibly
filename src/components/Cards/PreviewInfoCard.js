import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { WP, colors, family, size } from '../../shared/exporter';

export const PreviewInfoCard = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgCon}>
        <Image resizeMode='contain' source={item?.icon} style={styles.iconStyle} />
      </View>
      <View>
        <Text style={styles.h1}>{item?.h1}</Text>
        <Text style={styles.h2}>{item?.h2}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WP(48),
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgCon: {
    width: WP(15),
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: WP(3),
    backgroundColor: colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 6,
    shadowOpacity: 0.6,
    marginRight:WP(1)
  },
  iconStyle: {
    width: WP(10),
    height: WP(10),
  },
  h1: {
    color: colors.b1,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
    marginBottom: 2,
  },
  h2: {
    width: WP(30),
    color: colors.b1,
    fontSize: size.large,
    fontFamily: family.Gilroy_SemiBold,
  },
});
