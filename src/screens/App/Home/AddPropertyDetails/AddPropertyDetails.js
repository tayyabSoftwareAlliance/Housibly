import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  AppButton,
  BackHeader,
  CheckBoxInput,
  FilterButton,
  FilterInput,
  GalleryCard,
  HomeInput,
  ImagePickerModal,
  ListModal,
  LivingSpaceInput,
  PriceInput,
  TextBox,
} from '../../../../components';
import styles from './styles';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import {
  colors,
  currency_list,
  image_options,
  lot_unit_list,
  lot_area_unit_list,
  property_type_list,
  size,
  spacing,
  WP,
} from '../../../../shared/exporter';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Textarea from 'react-native-textarea';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveCreatePropertyData,
  set_address_request,
} from '../../../../redux/actions';
import { useIsFocused } from '@react-navigation/native'

const INITIAL_DATA = {
  property_type: property_type_list[0],
  title: '',
  currency_type: currency_list[0],
  images: [],
  price: 0,
  year_built: 0,
  address: '',
  unit: 0,
  lot_frontage: 0,
  lot_depth: 0,
  lot_size: 0,
  lot_unit: lot_unit_list[0],
  is_lot_irregular: false,
  lot_desc: '',
  tax_year: 0,
  property_tax: 0,
  locker: false,
  condo_corporation: '',
  house_type: {},
  house_style: {},
  condo_type: {},
  condo_style: {},
  min_lot_frontage: 0,
  parking_spot_req: false,
  garage_spot_req: false,
  max_age: 0,
  exterior: [],
  balcony: {},
  exposure: {},
  security: {},
  pets_allowed: {},
  included_utilities: [],
  bed_rooms: 0,
  bath_rooms: 0,
  num_of_rooms: 0,
  basement: [],
  total_parking_spaces: 0,
  garage: false,
  garage_spaces: 0,
  driveway: {},
  water: {},
  sewer: {},
  heat_source: [],
  heat_type: [],
  air_conditioner: [],
  laundary: false,
  fireplace: [],
  central_vacuum: false,
  pool: {},
  condo_fees: 0,
  desc: '',
  other_desc: '',
  rooms:[]
}

const AddPropertyDetails = ({ navigation }) => {

  const dispatch = useDispatch(null);
  const { add_property_detail } = useSelector(
    state => state?.appReducer,
  );

  const [data, setData] = useState(JSON.parse(JSON.stringify(add_property_detail)) || INITIAL_DATA)
  const isFocused = useIsFocused()

  useEffect(() => {
    if (!isFocused && add_property_detail)
      setData(JSON.parse(JSON.stringify(add_property_detail)))
  }, [add_property_detail])

  const onNext = async () => {
    if (!data.title) {
      Alert.alert('Error', 'Title is Required');
    } else if (!(data.price > 0)) {
      Alert.alert('Error', 'Price is Required');
    } else if (data.property_type?.title != 'Condo' && !data.lot_frontage) {
      Alert.alert('Error', 'Lot frontage is Required');
    } else if (data.property_type?.title != 'Condo' && !data.lot_depth) {
      Alert.alert('Error', 'Lot Depth is Required');
    } else if (data.images.length == 0) {
      Alert.alert('Error', 'At least one image Required');
    } else {
      if (data.property_type?.title == 'Vacant Land') {
        navigation?.navigate('AddPropertyDesc', data);
      } else {
        navigation?.navigate('AddMorePropertyDetails', data);
      }
    }
  };

  const onSave = async () => {
    const onSuccess = res => {
      Alert.alert('Success', 'Information Saved Successfully');
    };
    dispatch(saveCreatePropertyData(data, onSuccess));
  };

  const setValue = (type, value) => {
    setData(prev => {
      prev[type] = value
      return { ...prev }
    })
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={spacing.my2}>
        <BackHeader subtitle={'Add Details'} />
      </View>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: WP('2') }}>
        <View style={styles.contentContainer}>
          <View style={styles.inputCon}>
            <Divider color={colors.g18} />
            <FilterButton
              title={'Property Type'}
              list={property_type_list}
              selected={data.property_type}
              onPressTick={val => setValue('property_type', val)}
            />
            <Divider color={colors.g18} />
            <GalleryCard
              title={'Add Photo'}
              subtitle={'Max 30 images'}
              imageArray={data.images}
              onSelect={arr => setValue('images', arr)}
              onRemove={index => removeImage(index)}
            />
            <Divider color={colors.g18} />
            <FilterInput
              placeholder={'Title'}
              onChangeText={text => {
                setValue('title', text);
              }}
              value={data.title}
              keyboardType={'default'}
            />
            <Divider color={colors.g18} />
            <PriceInput
              defaultValue={data.currency_type}
              onSelect={val => setValue('currency_type', val)}
              simpleInputPlaceHolder={'e.g 21.00'}
              title={'Price'}
              list={currency_list}
              dropDown={true}
              value={data.price}
              onChangeText={text => setValue('price', text)}
            />
            {data.property_type?.title != 'Vacant Land' && (
              <>
                <Divider color={colors.g18} />
                <PriceInput
                  title={'Year Built'}
                  subtitle={' (e.g 1994)'}
                  simpleInputPlaceHolder={'e.g 1994'}
                  onChangeText={text => setValue('year_built', text)}
                  value={data.year_built}
                />
              </>
            )}
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate('AddAddress');
              }}>
              <Divider color={colors.g18} />
              <FilterInput
                onPressIn={() => {
                  navigation?.navigate('AddAddress');
                }}
                editable={false}
                keyboardType={'default'}
                placeholder={'Street Address'}
                value={data.address}
              />
            </TouchableOpacity>
            {data.property_type?.title != 'Vacant Land' && (
              <>
                <Divider color={colors.g18} />
                <HomeInput
                  onChangeText={text => setValue('unit', text)}
                  value={data.unit}
                  h1={'Unit'}
                  h2={'(if applicable)'}
                />
              </>
            )}
            {data.property_type?.title != 'Condo' && (
              <>
                <Divider color={colors.g18} />
                <PriceInput
                  onSelect={val => setValue('lot_unit', val)}
                  defaultValue={data.lot_unit}
                  simpleInputPlaceHolder={'0'}
                  title={'Lot Frontage'}
                  list={lot_unit_list}
                  dropDown={true}
                  value={data.lot_frontage}
                  onChangeText={text => {
                    setValue('lot_frontage', text);
                    setValue('lot_size', text * data.lot_depth);
                  }}
                />

                <Divider color={colors.g18} />

                <PriceInput
                  defaultValue={data.lot_unit}
                  onSelect={val => setValue('lot_unit', val)}
                  simpleInputPlaceHolder={'0'}
                  title={'Lot Depth'}
                  list={lot_unit_list}
                  dropDown={true}
                  value={data.lot_depth}
                  onChangeText={text => {
                    setValue('lot_depth', text);
                    setValue('lot_size', text * data.lot_frontage);
                  }}
                  returnKeyType={'done'}
                />
                <Divider color={colors.g18} />
                <PriceInput
                  defaultValue={data.lot_unit?.id == lot_unit_list[0]?.id ? lot_area_unit_list[0] : lot_area_unit_list[1]}
                  onSelect={val => setValue('lot_unit', val?.id == lot_area_unit_list[0]?.id ? lot_unit_list[0] : lot_unit_list[1])}
                  simpleInputPlaceHolder={'0'}
                  title={'Lot Size'}
                  value={data.lot_size}
                  list={lot_area_unit_list}
                  dropDown={true}
                  editable={false}
                />
                <Divider color={colors.g18} />
                <CheckBoxInput
                  title={'Is Your Lot Irregular?'}
                  checked={data.is_lot_irregular}
                  onPress={() => setValue('is_lot_irregular', !data.is_lot_irregular)}
                />
                <Divider color={colors.g18} />
                <PriceInput
                  onChangeText={text => setValue('tax_year', text)}
                  value={data.tax_year}
                  simpleInputPlaceHolder={'2006'}
                  title={'Tax Year '}
                  subtitle={'(e.g 2006)'}
                />
                <Divider color={colors.g18} />
                <PriceInput
                  onChangeText={text => setValue('property_tax', text)}
                  value={data.property_tax}
                  simpleInputPlaceHolder={'00.00'}
                  title={'Property Taxes '}
                  subtitle={data.currency_type?.title}
                />
              </>
            )}
            {data.property_type?.title == 'Condo' && (
              <>
                <Divider color={colors.g18} />
                <CheckBoxInput
                  title={'Locker?'}
                  checked={data.locker}
                  onPress={() => setValue('locker', !data.locker)}
                />
                <Divider color={colors.g18} />
                <FilterInput
                  onChangeText={text => setValue('condo_corporation', text)}
                  keyboardType={'default'}
                  value={data.condo_corporation}
                  placeholder={'Condo Corporation / HOA'}
                />
              </>
            )}
            {data.property_type?.title != 'Condo' &&
              <>
                <Divider color={colors.g18} />
                <Textarea
                  containerStyle={[styles.textareaContainer]}
                  style={styles.textarea}
                  placeholder={'Describe Your Lot'}
                  placeholderTextColor={colors.g19}
                  underlineColorAndroid={'transparent'}
                  value={data.lot_desc}
                  onChangeText={text => setValue('lot_desc', text)}
                />
              </>
            }
            <Divider color={colors.g18} />
          </View>
          <View style={styles.spacRow}>
            <AppButton
              width={'45%'}
              bgColor={colors.g21}
              title={'Save'}
              fontSize={size.tiny}
              borderColor={colors.g21}
              onPress={onSave}
              shadowColor={colors.white}
            />
            <AppButton
              onPress={onNext}
              width={'45%'}
              bgColor={colors.p2}
              title={'Next'}
              fontSize={size.tiny}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AddPropertyDetails;