import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import {colors} from '../../shared/exporter';

export const DayBox = ({
  day,
  bgColor,
  borderWidth,
  borderColor,
  onPress,
  tick,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.btnCon,
        {
          backgroundColor: bgColor,
          borderWidth: borderWidth,
          borderColor: borderColor,
        },
      ]}>
      {tick && (
        <View style={styles.iconCon}>
          <Icon
            name={'check'}
            type={'feather'}
            color={colors.white}
            size={10}
          />
        </View>
      )}
      <Text style={{color:colors.g40,textTransform:'capitalize'}} >{day?.slice(0,3)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnCon: {
    height: 42,
    width: 85,
    borderWidth: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    marginBottom: 10,
  },
  iconCon: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: colors.p2,
    height: 16,
    width: 16,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
