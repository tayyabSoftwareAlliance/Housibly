import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import {
  AppButton,
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

const INITIAL_DATA = {
  property_type: property_type_list[0],
  title: '',
  currency_type: currency_list[0],
  images: [],
  price: 0,
  year_built: 0,
  address: '',
  latitude: 0,
  longitude: 0,
  unit: 0,
  lot_frontage: 0,
  lot_depth: 0,
  lot_size: 0,
  lot_frontage_unit: lot_unit_list[0],
  is_lot_irregular: false,
  lot_description: '',
  tax_year: 0,
  property_tax: 0,
  locker: false,
  condo_corporation_or_hqa: '',
  house_type: '',
  house_style: '',
  condo_type: '',
  condo_style: '',
  min_lot_frontage: 0,
  parking_spot_req: false,
  garage_spot_req: false,
  max_age: 0,
  exterior: [],
  balcony: '',
  exposure: '',
  security: '',
  pets_allowed: '',
  included_utilities: [],
  bed_rooms: 0,
  bath_rooms: 0,
  total_number_of_rooms: 0,
  basement: [],
  total_parking_spaces: 0,
  garage_spaces: 0,
  driveway: '',
  water: '',
  sewer: '',
  heat_source: [],
  heat_type: [],
  air_conditioner: [],
  laundry: '',
  fireplace: [],
  central_vacuum: false,
  pool: '',
  condo_fees: 0,
  property_description: '',
  appliances_and_other_items: '',
  rooms: []
}
const FilterScreen = ({ navigation, route }) => {

  const [data, setData] = useState({})
  const [showAdvance, setShowAdvance] = useState(false)
  const { sublists } = useSelector(state => state?.appReducer)

  const setValue = (type, value) => {
    setData(prev => {
      prev[type] = value
      return { ...prev }
    })
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={spacing.my2}>
        <BackHeader subtitle={'Filter'} />
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
            <PriceInput
              defaultValue={data.currency_type}
              onSelect={val => setValue('currency_type', val)}
              simpleInputPlaceHolder={'e.g 21.00'}
              title={'Price'}
              list={currency_list}
              dropDown={true}
              inputs
              valueFrom={data.price_from}
              onChangeTextFrom={text => setValue('price_from', text)}
              valueTo={data.price_to}
              onChangeTextTo={text => setValue('price_to', text)}
            />
            {data.property_type != 'vacant_land' &&
              <>
                <Divider color={colors.g18} />
                <PriceInput
                  title={'No. of Bedrooms'}
                  simpleInputPlaceHolder={'0'}
                  value={data.bed_rooms}
                  onChangeText={text => setValue('bed_rooms', text)}
                  source={appIcons.bed}
                />
                <Divider color={colors.g18} />
                <PriceInput
                  title={'No. of Bathrooms'}
                  simpleInputPlaceHolder={'0'}
                  value={data.bath_rooms}
                  onChangeText={text => setValue('bath_rooms', text)}
                  source={appIcons.bath}
                />
              </>
            }
            {data.property_type != 'condo' &&
              <>
                <Divider color={colors.g18} />
                <PriceInput
                  defaultValue={data.lot_frontage_unit}
                  onSelect={val => setValue('lot_frontage_unit', val)}
                  simpleInputPlaceHolder={'0'}
                  title={'Lot Size'}
                  value={data.lot_size}
                  list={lot_area_unit_list}
                  dropDown={true}
                />
              </>
            }
            <Divider color={colors.g18} />
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
                {(data.property_type == 'condo' || data.property_type == 'house') &&
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
                        />
                        <Divider color={colors.g18} />
                        <FilterButton
                          title={'Condo Style'}
                          list={sublists.condo_style}
                          selected={data.condo_style}
                          onPressTick={val => setValue('condo_style', val)}
                          source={appIcons.condoStyle}
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
                        />
                        <Divider color={colors.g18} />
                        <FilterButton
                          title={'House Style'}
                          list={sublists.house_style}
                          selected={data.house_style}
                          onPressTick={val => setValue('house_style', val)}
                          source={appIcons.HouseStyle}
                        />
                      </>
                    }
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
                    <Divider color={colors.g18} />
                    <PriceInput
                      title={'Max Age'}
                      simpleInputPlaceHolder={'0'}
                      value={data.max_age}
                      onChangeText={text => setValue('max_age', text)}
                    />
                  </>
                }
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
                  subtitle={data.currency_type}
                />
                {(data.property_type == 'condo' || data.property_type == 'house') &&
                  <>
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
                    {data.property_type == 'house' &&
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
                    }
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
                  </>
                }
              </>
            }
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default FilterScreen