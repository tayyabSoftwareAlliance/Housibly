import { Platform, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import React, { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { WP, colors, family, size } from '../../shared/exporter';
import { Icon } from 'react-native-elements';
import { formatNumber, removeNonDigitCharFromString } from '../../shared/utilities/helper';

export const PriceInputWithCurrency = ({
  onSelect,
  value,
  valueFrom,
  valueTo,
  onFocus,
  onBlur,
  placeholder1,
  placeholder2,
  inputs,
  text,
  title,
  list = {},
  defaultValue,
  dropDown,
  subtitle,
  marginRight,
  marginLeft,
  marginBottom,
  marginTop,
  source,
  onSubmitEditing,
  onChangeText,
  onChangeTextFrom,
  onChangeTextTo,
  editable,
  keyboardType,
  returnKeyType,
  tintColor,
  simpleInputPlaceHolder,
  required
}) => {

  const [open, setOpen] = useState(false);

  return (
    <View
      style={[styles.container, { height: inputs ? 100 : 60 }]}>
      <View style={styles.aiRow}>
        <View style={[styles.headStyle]}>
          {source && (
            <Image
              source={source}
              resizeMode="contain"
              style={{
                height: 30,
                width: 30,
                marginRight: marginRight || WP('3.85'),
                marginLeft: marginLeft,
                marginBottom: marginBottom,
                marginTop: marginTop,
                tintColor: tintColor,
              }}
            />
          )}
          <View style={{flexDirection:'row'}} >
          <Text style={styles.h1}>{title || 'Price'}</Text>
          {required && <Text style={{ color: colors.r1 }} >*</Text>}
          </View>
          {subtitle && <Text style={styles.subStyle}>{subtitle}</Text>}
        </View>
        {dropDown && (
          <SelectDropdown
            defaultValue={defaultValue}
            onSelect={(item) => onSelect(item[0])}
            data={Object.entries(list)}
            dropdownOverlayColor={'transparent'}
            rowStyle={styles.rowStyle}
            onFocus={() => {
              setOpen(true);
              onFocus?.();
            }}
            onBlur={() => {
              setOpen(false);
              onBlur?.();
            }}
            renderCustomizedButtonChild={item => {
              return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.rowTextStyle}>
                    {defaultValue && `(${list[defaultValue]})`}
                  </Text>
                  <Icon
                    name={open ? 'caretup' : 'caretdown'}
                    type={'antdesign'}
                    size={10}
                    color={colors.b3}
                  />
                </View>
              );
            }}
            statusBarTranslucent={true}
            buttonStyle={styles.btnStyle}
            dropdownStyle={styles.dropdownStyle}
            renderCustomizedRowChild={item => {
              return (
                <View style={styles.btnCon}>
                  <Text
                    style={[styles.rowTextStyle, { textDecorationLine: 'none' }]}>
                    {item[1]}
                  </Text>
                </View>
              );
            }}
          // buttonTextAfterSelection={selectedItem => selectedItem?.title}
          // rowTextForSelection={item => item?.title}
          // renderDropdownIcon={() => {
          //   return (
          //     <Icon
          //       name={open ? 'caretup' : 'caretdown'}
          //       type={'antdesign'}
          //       size={10}
          //       color={colors.b3}
          //     />
          //   );
          // }}
          />
        )}
      </View>
      {inputs ? (
        <View style={styles.aiRow1}>
          <TextInput
            placeholder={placeholder1 || '0'}
            placeholderTextColor={'rgba(0, 0, 0, 0.20)'}
            style={styles.inputStyle}
            keyboardType={'numeric'}
            value={valueFrom && `${formatNumber(valueFrom)}`}
            onChangeText={(val) => onChangeTextFrom(removeNonDigitCharFromString(val))}
          />
          <Text style={styles.to}>to</Text>
          <TextInput
            style={styles.inputStyle}
            placeholderTextColor={'rgba(0, 0, 0, 0.20)'}
            placeholder={placeholder2 || '1,500,000'}
            keyboardType={'numeric'}
            value={valueTo && `${formatNumber(valueTo)}`}
            onChangeText={(val) => onChangeTextTo(removeNonDigitCharFromString(val))}
          />
        </View>
      ) : (
        <View style={{ marginRight: marginRight }}>
          <TextInput
            onSubmitEditing={onSubmitEditing}
            value={value && `${formatNumber(value)}`}
            onChangeText={(val) => onChangeText(removeNonDigitCharFromString(val))}
            placeholder={simpleInputPlaceHolder}
            placeholderTextColor={colors.g19}
            style={styles.simpleInputStyle}
            editable={editable}
            keyboardType={'numeric'}
            returnKeyType={returnKeyType}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subStyle: {
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
    color: colors.g19,
  },
  aiRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  h1: {
    color: colors.b1,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
  },
  rowTextStyle: {
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
    color: colors.b1,
    textDecorationLine: 'underline',
  },
  btnCon: {
    backgroundColor: colors.white,
    shadowRadius: 12,
    borderRadius: 12,
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%',
    borderWidth: 1,
    borderColor: colors.g29,
    marginVertical: 0,
  },
  btnStyle: {
    width: WP(25),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  dropdownStyle: {
    marginVertical: -15,
    width: '20%',
    backgroundColor: colors.white,
  },
  rowStyle: {
    borderBottomWidth: 0,
    height: 45,
  },
  inputStyle: {
    // height: 20,
    // width: '30%',
    maxWidth: WP(60),
    paddingVertical: 5,
    // borderLeftWidth: 1,
    // borderLeftColor: colors.p2,
    color: colors.g19,
    padding: 0,
  },
  simpleInputStyle: {
    // height: 50,
    minWidth: WP(10),
    maxWidth: WP(60),
    paddingVertical: 5,
    color: colors.g19,
    padding: 0,
    textAlign: 'right',
  },
  to: {
    paddingHorizontal: 10,
    color: colors.g19,
    fontFamily: family.Gilroy_Medium,
    fontSize: size.xsmall,
  },
  aiRow1: {
    // flexDirection: 'row',
    // height: '100%',
    // width: WP(60),
    alignItems: 'center'
  },
});
