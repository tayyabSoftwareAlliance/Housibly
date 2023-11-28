import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useMemo } from 'react';
import { Icon } from 'react-native-elements';
import { colors, family, HP, size, WP } from '../../shared/exporter';

export const PreviewField = ({ title, list, subtitle, source, multiple }) => {

  const showSubtitle = useMemo(() => {
    if (multiple) {
      if (subtitle?.length > 0 && typeof subtitle != 'string') {
        return (list ?
          (subtitle.map(item => list[item]).filter(item => item).join(', ') || 'N/A') :
          subtitle.join(', '))
      } else {
        return 'N/A'
      }
    } else {
      return list ? (list[subtitle] || 'N/A') : subtitle
    }
  }, [subtitle, multiple])

  return (
    <View style={styles.continer}>
      <View style={styles.leftCon}>
        {source && <Image source={source} style={[styles.imagStyle]} />}
        <Text style={[styles.title]}>{title}</Text>
      </View>
      <Text style={styles.subtitle}>
        {showSubtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  continer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  title: {
    fontSize: size.xsmall,
    color: colors.b1,
    fontFamily: family.Gilroy_Medium,
  },
  leftCon: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '50%',
  },
  imagStyle: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginRight: 10,
  },
  subtitle: {
    fontSize: size.xsmall,
    color: colors.g19,
    fontFamily: family.Gilroy_Medium,
    textTransform: 'capitalize',
    width: '50%',
    textAlign: 'right',
  },
});
