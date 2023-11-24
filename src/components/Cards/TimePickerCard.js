import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DatePicker from 'react-native-date-picker';
import {colors} from '../../shared/exporter';

export const TimePickerCard = ({onDateChange, minTime, dateValue, title}) => {
  return (
    <View style={styles.container}>
      <DatePicker
        fadeToColor={colors.white}
        textColor={colors.b1}
        mode={'time'}
        date={dateValue}
        style={{alignSelf: 'center'}}
        androidVariant={'nativeAndroid'}
        onDateChange={onDateChange}
        minimumDate={minTime}
        locale="en"
        is24hourSource={'locale'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginVertical: 5,
  },
});
