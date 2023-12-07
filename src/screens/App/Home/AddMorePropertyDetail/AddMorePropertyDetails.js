import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  AppButton,
  BackHeader,
  CheckBoxInput,
  DetailButton,
  FilterButton,
  PriceInput,
} from '../../../../components';
import styles from './styles';
import {
  appIcons,
  colors,
  condo_items,
  home_items,
  inputItems,
  size,
  spacing,
  WP,
} from '../../../../shared/exporter';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Divider} from 'react-native-elements/dist/divider/Divider';
import {saveCreatePropertyData} from '../../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

const AddMorePropertyDetails = ({navigation, route}) => {
  const {propertyData, from} = route.params;
  const dispatch = useDispatch(null);
  const {saved_create_property_data, sublists} = useSelector(
    state => state?.appReducer,
  );
  const [data, setData] = useState(JSON.parse(JSON.stringify(propertyData)));
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused && saved_create_property_data && from != 'edit')
      setData(JSON.parse(JSON.stringify(saved_create_property_data)));
  }, [saved_create_property_data]);

  const onNext = () => {
    if (data.property_type == 'house' && !data.house_type) {
      Alert.alert('Error', 'House Type is Required');
    } else if (data.property_type == 'house' && !data.house_style) {
      Alert.alert('Error', 'House Style is Required');
    } else if (data.property_type == 'condo' && !data.condo_type) {
      Alert.alert('Error', 'Condo Type is Required');
    } else if (data.property_type == 'condo' && !data.condo_style) {
      Alert.alert('Error', 'Condo Style is Required');
    } else if (!(data.bed_rooms > 0)) {
      Alert.alert('Error', 'Bed Rooms Number is Required');
    } else if (!(data.bath_rooms > 0)) {
      Alert.alert('Error', 'Bath Rooms Number is Required');
    } else if (!(data.total_number_of_rooms > 0)) {
      Alert.alert('Error', 'Number of Rooms is Required');
    } else if (!(data.air_conditioner?.length > 0)) {
      Alert.alert('Error', 'Please Select Air Conditioner Type');
    } else {
      navigation?.navigate('AddPropertyDesc', {propertyData: data, from});
    }
  };

  const onSave = () => {
    dispatch(saveCreatePropertyData(data));
  };

  const setValue = (type, value) => {
    setData(prev => {
      prev[type] = value;
      return {...prev};
    });
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={spacing.my2}>
        <BackHeader subtitle={'Add More Details'} />
      </View>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: WP('2')}}>
        <View style={styles.contentContainer}>
          {data.property_type == 'condo' ? (
            <>
              <Divider color={colors.g18} />
              <FilterButton
                title={'Condo Type'}
                list={sublists.condo_type}
                selected={data.condo_type}
                onPressTick={val => setValue('condo_type', val)}
                source={appIcons.condoType}
              />
              <Divider color={colors.g18} />
              <FilterButton
                title={'Condo Style'}
                list={sublists.condo_style}
                selected={data.condo_style}
                onPressTick={val => setValue('condo_style', val)}
                source={appIcons.condoStyle}
              />
            </>
          ) : (
            <>
              <Divider color={colors.g18} />
              <FilterButton
                title={'House Type'}
                list={sublists.house_type}
                selected={data.house_type}
                onPressTick={val => setValue('house_type', val)}
                source={appIcons.HouseType}
              />
              <Divider color={colors.g18} />
              <FilterButton
                title={'House Style'}
                list={sublists.house_style}
                selected={data.house_style}
                onPressTick={val => setValue('house_style', val)}
                source={appIcons.HouseStyle}
              />
              <Divider color={colors.g18} />
              <PriceInput
                title={'Min Lot Frontage'}
                simpleInputPlaceHolder={'0'}
                value={data.min_lot_frontage}
                onChangeText={text => setValue('min_lot_frontage', text)}
              />
            </>
          )}

          <Divider color={colors.g18} />
          <CheckBoxInput
            title={'Parking Spot Required'}
            checked={data.parking_spot_req}
            onPress={() => setValue('parking_spot_req', !data.parking_spot_req)}
          />
          <Divider color={colors.g18} />
          <CheckBoxInput
            title={'Garage Spot Required'}
            checked={data.garage_spot_req}
            onPress={() => setValue('garage_spot_req', !data.garage_spot_req)}
          />
          {data.property_type == 'house' && (
            <>
              <Divider color={colors.g18} />
              <PriceInput
                title={'Max Age'}
                simpleInputPlaceHolder={'0'}
                value={data.max_age}
                onChangeText={text => setValue('max_age', text)}
              />
            </>
          )}
          <Divider color={colors.g18} />
          <FilterButton
            title={'Exterior'}
            list={sublists.exterior}
            selected={data.exterior}
            onPressTick={val => setValue('exterior', val)}
            source={appIcons.exterior}
            multiselect
          />
          {data.property_type == 'condo' && (
            <>
              <Divider color={colors.g18} />
              <FilterButton
                title={'Balcony'}
                list={sublists.balcony}
                selected={data.balcony}
                onPressTick={val => setValue('balcony', val)}
                source={appIcons.balcony}
              />
              <Divider color={colors.g18} />
              <FilterButton
                title={'Exposure'}
                list={sublists.exposure}
                selected={data.exposure}
                onPressTick={val => setValue('exposure', val)}
                source={appIcons.exposure}
              />
              <Divider color={colors.g18} />
              <FilterButton
                title={'Security'}
                list={sublists.security}
                selected={data.security}
                onPressTick={val => setValue('security', val)}
                source={appIcons.security}
              />
              <Divider color={colors.g18} />
              <FilterButton
                title={'Pets Allowed'}
                list={sublists.pets_allowed}
                selected={data.pets_allowed}
                onPressTick={val => setValue('pets_allowed', val)}
                source={appIcons.pets}
              />
              <Divider color={colors.g18} />
              <FilterButton
                title={'Utilities Included'}
                list={sublists.included_utilities}
                selected={data.included_utilities}
                onPressTick={val => setValue('included_utilities', val)}
                source={appIcons.utilities}
                multiselect
              />
            </>
          )}
          <Divider color={colors.g18} />
          <PriceInput
            title={'Bed Rooms'}
            simpleInputPlaceHolder={'0'}
            value={data.bed_rooms}
            onChangeText={text => setValue('bed_rooms', text)}
            source={appIcons.bed}
          />
          <Divider color={colors.g18} />
          <PriceInput
            title={'Bath Rooms'}
            simpleInputPlaceHolder={'0'}
            value={data.bath_rooms}
            onChangeText={text => setValue('bath_rooms', text)}
            source={appIcons.bath}
          />
          <Divider color={colors.g18} />
          <PriceInput
            title={'Total Number of Rooms'}
            simpleInputPlaceHolder={'0'}
            value={data.total_number_of_rooms}
            onChangeText={text => setValue('total_number_of_rooms', text)}
            source={appIcons.living_space}
          />
          <Divider color={colors.g18} />
          <FilterButton
            title={'Basement'}
            list={sublists.basement}
            selected={data.basement}
            onPressTick={val => setValue('basement', val)}
            source={appIcons.bassement}
            multiselect
          />
          <Divider color={colors.g18} />
          <PriceInput
            title={'Total Parking Spaces'}
            simpleInputPlaceHolder={'0'}
            value={data.total_parking_spaces}
            onChangeText={text => setValue('total_parking_spaces', text)}
            source={appIcons.parking}
          />
          <Divider color={colors.g18} />
          <PriceInput
            title={'Garage Spaces'}
            simpleInputPlaceHolder={'0'}
            value={data.garage_spaces}
            onChangeText={text => setValue('garage_spaces', text)}
            source={appIcons.garage_space}
          />
          {data.property_type == 'house' && (
            <>
              <Divider color={colors.g18} />
              <FilterButton
                title={'Driveway'}
                list={sublists.driveway}
                selected={data.driveway}
                onPressTick={val => setValue('driveway', val)}
                source={appIcons.driveway}
              />
            </>
          )}
          <Divider color={colors.g18} />
          <FilterButton
            title={'Water'}
            list={sublists.water}
            selected={data.water}
            onPressTick={val => setValue('water', val)}
            source={appIcons.water}
          />
          <Divider color={colors.g18} />
          <FilterButton
            title={'Sewer'}
            list={sublists.sewer}
            selected={data.sewer}
            onPressTick={val => setValue('sewer', val)}
            source={appIcons.sware}
          />
          <Divider color={colors.g18} />
          <FilterButton
            title={'Heat Source'}
            list={sublists.heat_source}
            selected={data.heat_source}
            onPressTick={val => setValue('heat_source', val)}
            source={appIcons.source}
            multiselect
          />
          <Divider color={colors.g18} />
          <FilterButton
            title={'Heat Type'}
            list={sublists.heat_type}
            selected={data.heat_type}
            onPressTick={val => setValue('heat_type', val)}
            source={appIcons.heat}
            multiselect
          />
          <Divider color={colors.g18} />
          <FilterButton
            title={'Air Conditioner'}
            list={sublists.air_conditioner}
            selected={data.air_conditioner}
            onPressTick={val => setValue('air_conditioner', val)}
            source={appIcons.airCon}
            multiselect
          />
          <Divider color={colors.g18} />
          <FilterButton
            title={'Laundary'}
            list={sublists.laundry}
            selected={data.laundry}
            onPressTick={val => setValue('laundry', val)}
            source={appIcons.loundry}
          />
          <Divider color={colors.g18} />
          <FilterButton
            title={'Fireplace'}
            list={sublists.fireplace}
            selected={data.fireplace}
            onPressTick={val => setValue('fireplace', val)}
            source={appIcons.fire}
            multiselect
          />
          <Divider color={colors.g18} />
          <CheckBoxInput
            title={'Central Vacuum'}
            checked={data.central_vacuum}
            onPress={() => setValue('central_vacuum', !data.central_vacuum)}
            source={appIcons.vacume}
          />
          <Divider color={colors.g18} />
          <FilterButton
            title={'Pool'}
            list={sublists.pool}
            selected={data.pool}
            onPressTick={val => setValue('pool', val)}
            source={appIcons.pool}
          />
          {data.property_type == 'condo' && (
            <>
              <Divider color={colors.g18} />
              <PriceInput
                title={`Condo/HOA fees (${data.currency_type}/per month)`}
                simpleInputPlaceHolder={'0'}
                value={data.condo_fees}
                onChangeText={text => setValue('condo_fees', text)}
              />
            </>
          )}
          <Divider color={colors.g18} />
          {/*Buttons */}
          <View
            style={[
              styles.spacRow,
              from == 'edit' && {justifyContent: 'flex-end'},
            ]}>
            {from != 'edit' && (
              <AppButton
                width={'45%'}
                bgColor={colors.g21}
                title={'Save'}
                fontSize={size.tiny}
                borderColor={colors.g21}
                onPress={onSave}
                shadowColor={colors.white}
              />
            )}
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

export default AddMorePropertyDetails;
