import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, family, size} from '../../shared/exporter';

export const AddressCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imgBox}>
        <Image
          style={styles.imgStyle}
          source={{uri: 'https://wallpaperaccess.com/full/1700222.jpg'}}
        />
      </View>
      <View>
        <Text style={styles.h1}>Cheyenne Dias</Text>
        <Text style={styles.h2}>
          Budget:
          <Text style={{color: colors.gr1}}> $50,000 to $100,000</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  imgBox: {
    height: 68,
    width: 68,
    borderRadius: 15,
    marginRight: 10,
  },
  imgStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
  },
  h1: {
    fontFamily: family.Gilroy_SemiBold,
    fontSize: size.large,
    color: colors.b1,
    marginVertical: 5,
  },
  h2: {
    fontFamily: family.Gilroy_Medium,
    fontSize: size.tiny,
    color: colors.g23,
  },
});
