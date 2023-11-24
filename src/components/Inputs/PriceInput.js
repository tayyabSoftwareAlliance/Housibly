import { Platform, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import React, { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { WP, colors, family, size } from '../../shared/exporter';
import { Icon } from 'react-native-elements';

export const PriceInput = ({
  onSelect,
  value,
  onFocus,
  onBlur,
  placeholder1,
  placeholder2,
  inputs,
  text,
  title,
  list,
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
  editable,
  keyboardType,
  returnKeyType,
  tintColor,
  simpleInputPlaceHolder
}) => {

  const [open, setOpen] = useState(false)

  return (
    <View
      style={[styles.container, { justifyContent: !inputs && 'space-between' }]}>
      <View style={styles.aiRow}>
        <View style={[styles.headStyle]}>
          {source && (
            <Image
              source={source}
              resizeMode='contain'
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
          <Text style={[styles.h1]}>{title || 'Price'}</Text>
          {subtitle && <Text style={styles.subStyle}>{subtitle}</Text>}
        </View>
        {dropDown && (
          <SelectDropdown
            defaultValue={defaultValue}
            onSelect={onSelect}
            data={list}
            dropdownOverlayColor={'transparent'}
            rowStyle={styles.rowStyle}
            onFocus={() => {
              setOpen(true)
              onFocus?.()
            }}
            onBlur={() => {
              setOpen(false)
              onBlur?.()
            }}
            renderCustomizedButtonChild={item => {
              return (
                <View>
                  <Text style={styles.rowTextStyle}>
                    ({defaultValue?.title})
                  </Text>
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
                    {item?.title}
                  </Text>
                </View>
              );
            }}
            // buttonTextAfterSelection={selectedItem => selectedItem?.title}
            // rowTextForSelection={item => item?.title}
            renderDropdownIcon={() => {
              return (
                <Icon
                  name={open ? 'caretup' : 'caretdown'}
                  type={'antdesign'}
                  size={10}
                  color={colors.b3}
                />
              );
            }}
          />
        )}
      </View>
      {inputs ? (
        <View style={styles.aiRow1}>
          <TextInput
            placeholder={placeholder1 || '1,000,000'}
            placeholderTextColor={colors.g19}
            style={styles.inputStyle}
            keyboardType={'numeric'}
          />
          <Text style={styles.to}>to</Text>
          <TextInput
            style={styles.inputStyle}
            placeholderTextColor={colors.g19}
            placeholder={placeholder2 || '1,500,000'}
            keyboardType={'numeric'}
          />
        </View>
      ) : (
        <View style={{ marginRight: marginRight }}>
          <TextInput
            onSubmitEditing={onSubmitEditing}
            onChangeText={onChangeText}
            value={value && `${value}`}
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
    height: 60,
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
    width: '40%',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start'
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
    height: 20,
    width: '40%',
    borderLeftWidth: 1,
    borderLeftColor: colors.p2,
    color: colors.g19,
    padding: 0,
  },
  simpleInputStyle: {
    height: 50,
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
    flexDirection: 'row',
    height: '100%',
    width: '50%',
    alignItems: 'center',
  },
});
