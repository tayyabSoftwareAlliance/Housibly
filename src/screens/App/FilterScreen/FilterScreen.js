import {
  Alert,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import {
  AppButton,
  AppLoader,
  BackHeader,
  CheckBoxInput,
  FilterButton,
  ListModal,
  LivingSpaceInput,
  PriceInput,
} from '../../../components';
import styles from './styles';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import {
  appIcons,
  bath_list,
  beds_list,
  colors,
  currency_list,
  lat_frontage_list,
  lot_area_unit_list,
  lot_unit_list,
  property_type_list,
  size,
  spacing,
  WP,
} from '../../../shared/exporter';
import { Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { checkConnected, filterFormData, formatPreferenceData } from '../../../shared/utilities/helper';
import { update_my_preference } from '../../../redux/actions/app-actions/app-actions';
import { PriceInputWithCurrency } from '../../../components/Inputs/PriceInputWithCurrency';

const INITIAL_DATA = {
  property_type: 'house',
  currency_type: '',
  min_price: '0',
  max_price: '1000000',
  min_lot_frontage: 0,
  min_lot_size: 0,
  min_lot_frontage_unit: lot_unit_list[0],
  // is_lot_irregular: false,
  min_bed_rooms: 0,
  min_bath_rooms: 0,
  min_total_number_of_rooms: 0,
  min_total_parking_spaces: 0,
  min_garage_spaces: 0,
  house_type: [],
  house_style: [],
  max_age: 20,
  condo_type: [],
  condo_style: [],
  exterior: [],
  balcony: [],
  exposure: [],
  security: [],
  pets_allowed: [],
  included_utilities: [],
  basement: [],
  driveway: [],
  water: [],
  sewer: [],
  heat_source: [],
  heat_type: [],
  air_conditioner: [],
  laundry: [],
  fireplace: [],
  central_vacuum: false,
  pool: [],
}

const FilterScreen = ({ navigation, route }) => {

  const { my_preference, sublists, loading } = useSelector(state => state?.appReducer)
  const [data, setData] = useState(
    {
      ...INITIAL_DATA,
      currency_type: Object.entries(sublists.currency_type || {})[0]?.[0],
      ...formatPreferenceData(my_preference)
    })
  const [showAdvance, setShowAdvance] = useState(false)
  const dispatch = useDispatch()

  const setValue = (type, value) => {
    setData(prev => {
      prev[type] = value
      return { ...prev }
    })
  }

  const onSubmit = async () => {
    Keyboard.dismiss()
    const onSuccess = () => {
      navigation.navigate('Home');
      Alert.alert('Success', 'Preference Updated Successfully!');
    };
    const check = await checkConnected();
    if (check) {
      const formdata = filterFormData(data);
      dispatch(update_my_preference(formdata, onSuccess));
    } else {
      Alert.alert('Error', networkText);
    }
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={spacing.my2}>
        <BackHeader subtitle={'Filter'} />
      </View>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: WP('2') }}
        keyboardShouldPersistTaps={'handled'}
      >
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
            <PriceInputWithCurrency
              defaultValue={data.currency_type}
              onSelect={val => setValue('currency_type', val)}
              simpleInputPlaceHolder={'e.g 21.00'}
              title={'Price'}
              list={sublists.currency_type}
              dropDown={true}
              inputs
              valueFrom={data.min_price}
              onChangeTextFrom={text => setValue('min_price', text)}
              valueTo={data.max_price}
              onChangeTextTo={text => setValue('max_price', text)}
            />
            {data.property_type != 'vacant_land' &&
              <>
                <Divider color={colors.g18} />
                <PriceInput
                  title={'Min No. of Bedrooms'}
                  simpleInputPlaceHolder={'0'}
                  value={data.min_bed_rooms}
                  onChangeText={text => setValue('min_bed_rooms', text)}
                  source={appIcons.bed}
                />
                <Divider color={colors.g18} />
                <PriceInput
                  title={'Min No. of Bathrooms'}
                  simpleInputPlaceHolder={'0'}
                  value={data.min_bath_rooms}
                  onChangeText={text => setValue('min_bath_rooms', text)}
                  source={appIcons.bath}
                />
                <Divider color={colors.g18} />
                <PriceInput
                  title={'Min No. of Rooms'}
                  simpleInputPlaceHolder={'0'}
                  value={data.min_total_number_of_rooms}
                  onChangeText={text => setValue('min_total_number_of_rooms', text)}
                />
              </>
            }
            <Divider color={colors.g18} />
            {(data.property_type == 'condo' || data.property_type == 'house') &&
              <>
                <TouchableOpacity style={styles.showAdvanceContainer} onPress={() => setShowAdvance(!showAdvance)} >
                  <Text style={styles.textStyle} >Show advanced options</Text>
                  <Icon
                    name={showAdvance ? 'caretup' : 'caretdown'}
                    type={'antdesign'}
                    size={10}
                    color={colors.p1}
                    style={{ marginLeft: 5 }}
                  />
                </TouchableOpacity>
                {showAdvance &&
                  <>
                    {data.property_type == 'condo' ?
                      <>
                        <Divider color={colors.g18} />
                        <FilterButton
                          title={'Condo Type'}
                          list={sublists.condo_type}
                          selected={data.condo_type}
                          onPressTick={val => setValue('condo_type', val)}
                          source={appIcons.condoType}
                          multiselect
                        />
                        <Divider color={colors.g18} />
                        <FilterButton
                          title={'Condo Style'}
                          list={sublists.condo_style}
                          selected={data.condo_style}
                          onPressTick={val => setValue('condo_style', val)}
                          source={appIcons.condoStyle}
                          multiselect
                        />
                      </> :
                      <>
                        <Divider color={colors.g18} />
                        <FilterButton
                          title={'House Type'}
                          list={sublists.house_type}
                          selected={data.house_type}
                          onPressTick={val => setValue('house_type', val)}
                          source={appIcons.HouseType}
                          multiselect
                        />
                        <Divider color={colors.g18} />
                        <FilterButton
                          title={'House Style'}
                          list={sublists.house_style}
                          selected={data.house_style}
                          onPressTick={val => setValue('house_style', val)}
                          source={appIcons.HouseStyle}
                          multiselect
                        />
                      </>
                    }
                    <Divider color={colors.g18} />
                    <PriceInput
                      title={'Max Age (years)'}
                      simpleInputPlaceHolder={'0'}
                      value={data.max_age}
                      onChangeText={text => setValue('max_age', text)}
                    />
                    {data.property_type != 'condo' &&
                      <>
                        <Divider color={colors.g18} />
                        <PriceInput
                          onSelect={val => setValue('min_lot_frontage_unit', val)}
                          defaultValue={data.min_lot_frontage_unit}
                          simpleInputPlaceHolder={'0'}
                          title={'Min Lot Frontage'}
                          list={lot_unit_list}
                          dropDown={true}
                          value={data.min_lot_frontage}
                          onChangeText={text => setValue('min_lot_frontage', text)}
                        />
                        <Divider color={colors.g18} />
                        <PriceInput
                          defaultValue={data.min_lot_frontage_unit == lot_unit_list[0] ? lot_area_unit_list[0] : lot_area_unit_list[1]}
                          onSelect={val => setValue('min_lot_frontage_unit', val == lot_area_unit_list[0] ? lot_unit_list[0] : lot_unit_list[1])}
                          simpleInputPlaceHolder={'0'}
                          title={'Min Lot Size'}
                          value={data.min_lot_size}
                          onChangeText={text => setValue('min_lot_size', text)}
                          list={lot_area_unit_list}
                          dropDown={true}
                        />
                        {/* <Divider color={colors.g18} />
                        <CheckBoxInput
                          title={'Is Lot Irregular'}
                          checked={data.is_lot_irregular}
                          onPress={() => setValue('is_lot_irregular', !data.is_lot_irregular)}
                        /> */}
                      </>
                    }
                    <Divider color={colors.g18} />
                    <FilterButton
                      title={'Exterior'}
                      list={sublists.exterior}
                      selected={data.exterior}
                      onPressTick={val => setValue('exterior', val)}
                      source={appIcons.exterior}
                      multiselect
                    />
                    {data.property_type == 'condo' &&
                      <>
                        <Divider color={colors.g18} />
                        <FilterButton
                          title={'Balcony'}
                          list={sublists.balcony}
                          selected={data.balcony}
                          onPressTick={val => setValue('balcony', val)}
                          source={appIcons.balcony}
                          multiselect
                        />
                        <Divider color={colors.g18} />
                        <FilterButton
                          title={'Exposure'}
                          list={sublists.exposure}
                          selected={data.exposure}
                          onPressTick={val => setValue('exposure', val)}
                          source={appIcons.exposure}
                          multiselect
                        />
                        <Divider color={colors.g18} />
                        <FilterButton
                          title={'Security'}
                          list={sublists.security}
                          selected={data.security}
                          onPressTick={val => setValue('security', val)}
                          source={appIcons.security}
                          multiselect
                        />
                        <Divider color={colors.g18} />
                        <FilterButton
                          title={'Pets Allowed'}
                          list={sublists.pets_allowed}
                          selected={data.pets_allowed}
                          onPressTick={val => setValue('pets_allowed', val)}
                          source={appIcons.pets}
                          multiselect
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
                    }
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
                      title={'Min Total Parking Spaces'}
                      simpleInputPlaceHolder={'0'}
                      value={data.min_total_parking_spaces}
                      onChangeText={text => setValue('min_total_parking_spaces', text)}
                      source={appIcons.parking}
                    />
                    <Divider color={colors.g18} />
                    <PriceInput
                      title={'Min Garage Spaces'}
                      simpleInputPlaceHolder={'0'}
                      value={data.min_garage_spaces}
                      onChangeText={text => setValue('min_garage_spaces', text)}
                      source={appIcons.garage_space}
                    />
                    {data.property_type == 'house' &&
                      <>
                        <Divider color={colors.g18} />
                        <FilterButton
                          title={'Driveway'}
                          list={sublists.driveway}
                          selected={data.driveway}
                          onPressTick={val => setValue('driveway', val)}
                          source={appIcons.driveway}
                          multiselect
                        />
                        <Divider color={colors.g18} />
                        <FilterButton
                          title={'Water'}
                          list={sublists.water}
                          selected={data.water}
                          onPressTick={val => setValue('water', val)}
                          source={appIcons.water}
                          multiselect
                        />
                      </>
                    }
                    <Divider color={colors.g18} />
                    <FilterButton
                      title={'Sewer'}
                      list={sublists.sewer}
                      selected={data.sewer}
                      onPressTick={val => setValue('sewer', val)}
                      source={appIcons.sware}
                      multiselect
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
                      title={'Laundry'}
                      list={sublists.laundry}
                      selected={data.laundry}
                      onPressTick={val => setValue('laundry', val)}
                      source={appIcons.loundry}
                      multiselect
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
                      multiselect
                    />
                  </>
                }
              </>
            }
          </View>
          <View style={[styles.spacRow, { justifyContent: 'center' }]}>
            <AppButton
              onPress={onSubmit}
              width={'90%'}
              bgColor={colors.p2}
              title={'Done'}
              fontSize={size.tiny}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default FilterScreen