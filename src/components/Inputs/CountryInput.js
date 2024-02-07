import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { family, size, colors, WP, HP } from '../../shared/exporter';
import CountryPicker from 'react-native-country-picker-modal';

const CountryInput = ({
  country,
  onSelect,
}) => {
  const [visible, setVisible] = useState(false)
  return (
    <Pressable style={styles.container} onPress={() => setVisible(true)}>
      <Text style={styles.textStyle}>Country</Text>
      <View style={styles.innerContainer} >
        <Text style={styles.inputStyle} >{country.name}</Text>
        <CountryPicker
          onSelect={(val) => {
            const { name, cca2 } = val
            onSelect({ name, cca2 })
          }}
          translation="eng"
          withFlag={true}
          withEmoji={true}
          countryCode={country.cca2}
          withFilter={true}
          withAlphaFilter={true}
          visible={visible}
          onClose={() => setVisible(false)}
        />
      </View>
    </Pressable>
  );
};

export { CountryInput };

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WP('3'),
    marginBottom: HP(3)
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: colors.g5,
    borderBottomWidth: 0,
    paddingHorizontal: WP('3'),
    paddingVertical: WP('2'),
  },
  inputStyle: {
    fontFamily: family.Gilroy_Medium,
    fontSize: size.tiny,
    borderBottomWidth: 0,
    color: colors.b1,
  },
  textStyle: {
    marginBottom: 10,
    color: colors.b1,
    fontFamily: family.Gilroy_SemiBold,
  },
});
