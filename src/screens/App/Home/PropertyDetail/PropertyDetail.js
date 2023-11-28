import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  AppButton,
  AppLoader,
  BackHeader,
  PreviewField,
  PreviewImageBox,
  PreviewImageCover,
  PreviewInfoCard,
  PriceInput,
  SmallHeading,
} from '../../../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  appIcons,
  checkConnected,
  colors,
  HP,
  networkText,
  property_type_list,
  size,
  spacing,
  WP,
} from '../../../../shared/exporter';
import styles from './styles';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { addProperty } from '../../../../shared/service/PropertyService';
import {
  saveCreatePropertyData,
  set_address_request,
} from '../../../../redux/actions';
import { setAddressRequest } from '../../../../redux/saga/app-sega/app-sega';
import RoomsBox from '../../../../components/Box/RoomsBox';
import { createPropertyFormData } from '../../../../shared/utilities/helper';
import { app } from '../../../../shared/api';

const PropertyDetail = ({ navigation, route }) => {

  const { data, from } = route.params
  const { saved_create_property_data, sublists } = useSelector(state => state?.appReducer);
  const [imgSelectedIndex, setImgSelectedIndex] = useState(0);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  const onPost = async () => {
    const check = await checkConnected();
    if (check) {
      try {
        setloading(true);
        const formdata = createPropertyFormData(saved_create_property_data)
        // console.log('formm dataa', formdata)
        const res = await app.createProperty(formdata)
        if (res?.status == 200) {
          navigation.navigate('Home')
          Alert.alert('Success', 'Property Created Successfully!');
        }
      }
      catch (error) {
        let msg = responseValidator(error?.response?.status, error?.response?.data);
        Alert.alert('Error', msg || 'Something went wrong!');
      }
      finally {
        setloading(false)
      }
    } else {
      Alert.alert('Error', networkText);
    }
  };

  const onSave = async () => {
    saved_create_property_data.save_desc = true;
    saved_create_property_data.save_list = true;
    saved_create_property_data.save_data = true;
    dispatch(
      saveCreatePropertyData(saved_create_property_data, () => {
        Alert.alert('Success', 'Information Saved Successfully');
      }),
    );
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={spacing.my2}>
        <BackHeader subtitle={'Preview'} />
      </View>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <PreviewImageCover
            h1={data.title}
            h2={property_type_list[data.property_type]}
            uri={from == 'create' ? data?.images?.[imgSelectedIndex]?.path : data?.images?.[imgSelectedIndex]?.url}
          />
          <View>
            <FlatList
              data={data?.images}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setImgSelectedIndex(index);
                    }}>
                    <PreviewImageBox
                      uri={
                        (from == 'create' ? item?.path : item?.url) ||
                        'https://wallpaperaccess.com/full/1700222.jpg'
                      }
                    />
                  </TouchableOpacity>
                );
              }}
              showsHorizontalScrollIndicator={false}
              horizontal
            />
          </View>
          <View style={spacing.my2}>
            <Text style={styles.header}>Information</Text>
            <View style={styles.spacRow}>
              <PreviewInfoCard
                item={{
                  h1: 'Price',
                  h2: `${data.currency_type} ${data.price || 0}`,
                  icon: appIcons.priceTag,
                }}
              />
              {data.property_type != 'vacant_land' &&
                <PreviewInfoCard
                  item={{
                    h1: 'Year Built',
                    h2: `${data.year_built || 0}`,
                    icon: appIcons.built,
                  }}
                />
              }
            </View>
            <Text numberOfLines={6} style={styles.desc}>
              {data.lot_description}
            </Text>
            <Divider color={colors.g13} />
            <PreviewField
              title={'Street Address'}
              subtitle={data.address || 'N/A'}
            />
            <PreviewField
              title={'Unit'}
              subtitle={data.unit || '0'}
            />
            {data.property_type != 'condo' && (
              <>
                <PreviewField
                  title={`Lot Frontage (${data.lot_unit})`}
                  subtitle={data.lot_frontage || '0'}
                />
                <PreviewField
                  title={`Lot Depth (${data.lot_unit})`}
                  subtitle={data.lot_depth || '0'}
                />
                <PreviewField
                  title={`Lot Size (${data.lot_unit == 'meter' ? 'sqm' : 'sft'})`}
                  subtitle={data.lot_size || '23'}
                />
                <PreviewField
                  title={'Is This Lot Irregular?'}
                  subtitle={data.is_lot_irregular ? 'Yes' : 'No'}
                />
              </>
            )}
            <PreviewField
              title={`Property Taxes (${data.currency_type})`}
              subtitle={data.property_tax || 0}
            />
            <PreviewField
              title={'Tax Year'}
              subtitle={data.tax_year || 'N/A'}
            />
            {data.property_type == 'condo' && (
              <>
                <PreviewField
                  title={'Locker'}
                  subtitle={data.locker ? 'Yes' : 'No'}
                />
                <PreviewField
                  title={'Condo Corporation / HOA'}
                  subtitle={
                    data.condo_corporation_or_hqa || 'N/A'
                  }
                />
                <PreviewField
                  title={'Condo/HOA fees (per month)'}
                  subtitle={data.condo_fees || 0}
                />
              </>
            )}
            {(data.property_type == 'house' || data.property_type == 'condo') &&
              <>
                <Divider style={{ marginVertical: HP(2) }} color={colors.g13} />
                <PreviewField
                  title={'Bed Rooms'}
                  subtitle={data.bed_rooms || 'N/A'}
                  source={appIcons.bed}
                />
                <PreviewField
                  title={'Bath Rooms'}
                  subtitle={data.bath_rooms || 'N/A'}
                  source={appIcons.bath}
                />
                <PreviewField
                  title={'Total Number of Rooms'}
                  subtitle={data.total_number_of_rooms || 'N/A'}
                  source={appIcons.living_space}
                />
                <PreviewField
                  title={'Total Parking Spaces'}
                  subtitle={data.total_parking_spaces || 'N/A'}
                  source={appIcons.parking}
                />
                <PreviewField
                  title={'Garage Spaces'}
                  subtitle={data.garage_spaces || 'N/A'}
                  source={appIcons.garage_space}
                />

                <Divider style={{ marginVertical: HP(2) }} color={colors.g13} />

                {data.property_type == 'house' ?
                  <>
                    <PreviewField
                      title={'House Type'}
                      list={sublists.house_type}
                      subtitle={data.house_type || 'N/A'}
                      source={appIcons.HouseType}
                    />
                    <PreviewField
                      title={'House Style'}
                      list={sublists.house_style}
                      subtitle={data.house_style || 'N/A'}
                      source={appIcons.HouseStyle}
                    />
                  </> :
                  <>
                    <PreviewField
                      title={'Condo Type'}
                      list={sublists.condo_type}
                      subtitle={data.condo_type || 'N/A'}
                      source={appIcons.condoType}
                    />
                    <PreviewField
                      title={'Condo Style'}
                      list={sublists.condo_style}
                      subtitle={data.condo_style || 'N/A'}
                      source={appIcons.condoStyle}
                    />
                  </>
                }
                <PreviewField
                  title={'Exterior'}
                  list={sublists.exterior}
                  subtitle={data.exterior || 'N/A'}
                  source={appIcons.exterior}
                  multiple
                />
                <PreviewField
                  title={'Basement'}
                  list={sublists.basement}
                  subtitle={data.basement || 'N/A'}
                  source={appIcons.bassement}
                  multiple
                />
                {data.property_type == 'condo' &&
                  <>
                    <PreviewField
                      title={'Balcony'}
                      list={sublists.balcony}
                      subtitle={data.balcony || 'N/A'}
                      source={appIcons.balcony}
                    />
                    <PreviewField
                      title={'Exposure'}
                      list={sublists.exposure}
                      subtitle={data.exposure || 'N/A'}
                      source={appIcons.exposure}
                    />
                    <PreviewField
                      title={'Security'}
                      list={sublists.security}
                      subtitle={data.security || 'N/A'}
                      source={appIcons.security}
                    />
                    <PreviewField
                      title={'Pets Allowed'}
                      list={sublists.pets_allowed}
                      subtitle={data.pets_allowed || 'N/A'}
                      source={appIcons.pets}
                    />
                    <PreviewField
                      title={'Utilities Included'}
                      list={sublists.included_utilities}
                      subtitle={data.included_utilities || 'N/A'}
                      source={appIcons.utilities}
                      multiple
                    />
                  </>
                }
                {data.property_type == 'house' &&
                  <PreviewField
                    title={'Driveway'}
                    list={sublists.driveway}
                    subtitle={data.driveway || 'N/A'}
                    source={appIcons.driveway}
                  />
                }
                <PreviewField
                  title={'Water'}
                  list={sublists.water}
                  subtitle={data.water || 'N/A'}
                  source={appIcons.water}
                />
                <PreviewField
                  title={'Sewer'}
                  list={sublists.sewer}
                  subtitle={data.sewer || 'N/A'}
                  source={appIcons.sware}
                />
                <PreviewField
                  title={'Heat Source'}
                  list={sublists.heat_source}
                  subtitle={data.heat_source}
                  source={appIcons.source}
                  multiple
                />
                <PreviewField
                  title={'Heat Type'}
                  list={sublists.heat_type}
                  subtitle={data.heat_type}
                  source={appIcons.heat}
                  multiple
                />
                <PreviewField
                  title={'Laundary'}
                  list={sublists.sewer}
                  subtitle={data.laundry}
                  source={appIcons.loundry}
                />
                <PreviewField
                  title={'Fireplace'}
                  list={sublists.fireplace}
                  subtitle={data.fireplace}
                  source={appIcons.fire}
                  multiple
                />
                <PreviewField
                  title={'Central Vacuum'}
                  subtitle={data.central_vacuum ? 'Yes' : 'No'}
                  source={appIcons.vacume}
                />
                <PreviewField
                  title={'Pool'}
                  list={sublists.pool}
                  subtitle={data.pool || 'N/A'}
                  source={appIcons.pool}
                />
              </>
            }
            <View style={styles.descBox}>
              <SmallHeading title={'Property Description'} />
              <SmallHeading
                textColor={colors.g22}
                title={data.desc || 'N/A'}
              />
              {data?.property_type != 'condo' && (
                <>
                  <SmallHeading title={'Lot Description'} />
                  <SmallHeading
                    textColor={colors.g22}
                    title={data.lot_description || 'N/A'}
                  />
                </>
              )}
              {data?.property_type != 'vacant_land' && (
                <>
                  <SmallHeading title={'Appliances and other Items'} />
                  <SmallHeading
                    textColor={colors.g22}
                    title={data?.appliances_and_other_items || 'N/A'}
                  />
                </>
              )}
            </View>
            {data.property_type != 'vacant_land' &&
              <RoomsBox data={data.rooms} />
            }
          </View>
          {from == 'create' &&
            <View style={[styles.spacRow, { marginVertical: HP(2) }]}>
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
                onPress={onPost}
                width={'45%'}
                bgColor={colors.p2}
                title={'Post'}
                fontSize={size.tiny}
              />
            </View>
          }
        </View>
      </KeyboardAwareScrollView>
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default PropertyDetail;
