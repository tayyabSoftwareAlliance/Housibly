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

const PropertyDetail = ({ navigation, route }) => {
  const { add_property_detail } = useSelector(state => state?.appReducer);
  const [data, setData] = useState(route.params)
  const [previewImg, setPreviewImg] = useState(data?.images?.[0]?.path);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  const onPost = async () => {
    const check = await checkConnected();
    if (check) {
      try {
        setloading(true);
        var formdata = new FormData();
        const filterArr = add_property_detail?.option_data?.map(item => {
          return {
            title: item?.title,
            value: item?.value,
          };
        });

        add_property_detail?.images?.forEach(item => {
          formdata.append('property[images][]', {
            uri: item?.path,
            type: item?.mime || 'image/jpeg',
            name: item?.filename || 'image',
          });
        }),
          formdata.append('property[title]', add_property_detail?.title || '');
        formdata.append('property[price]', add_property_detail?.price || '');
        formdata.append(
          'property[currency_type]',
          add_property_detail?.currency_type || '',
        );
        formdata.append(
          'property[year_built]',
          add_property_detail?.year_built || '',
        );
        formdata.append(
          'property[address]',
          add_property_detail?.address || '',
        );
        formdata.append('property[unit]', add_property_detail?.unit || '');
        formdata.append(
          'property[lot_frontage]',
          add_property_detail?.lot_frontage || '',
        );
        formdata.append(
          'property[lot_frontage_unit]',
          add_property_detail?.lot_frontage_unit || 'feet',
        );
        formdata.append(
          'property[lot_depth]',
          add_property_detail?.lot_depth || '',
        );
        formdata.append(
          'property[lot_depth_unit]',
          add_property_detail?.lot_depth_unit || 'feet',
        );
        formdata.append(
          'property[lot_size]',
          add_property_detail?.lot_size || '',
        );
        formdata.append(
          'property[lot_size_unit]',
          add_property_detail?.lot_size_unit || '',
        );
        formdata.append(
          'property[is_lot_irregular]',
          add_property_detail?.is_lot_irregular || 'No',
        );
        formdata.append(
          'property[lot_description]',
          add_property_detail?.property_desc || '',
        );
        formdata.append(
          'property[property_tax]',
          add_property_detail?.property_tax || '',
        );
        formdata.append(
          'property[tax_year]',
          add_property_detail?.text_year || '',
        );
        formdata.append('property[locker]', add_property_detail?.locker || '');
        formdata.append(
          'property[condo_corporation_or_hqa]',
          add_property_detail?.condo_corporation_or_hqa || '',
        );
        formdata.append(
          'property[other_options]',
          JSON.stringify(filterArr) || JSON.stringify([]),
        );
        formdata.append(
          'property[property_type]',
          add_property_detail?.property_type == 'Vacant Land'
            ? 'vacant_land'
            : add_property_detail?.property_type || 'house',
        );
        const res = await addProperty(formdata, setloading);
        if (res) {
          console.log(res);
          const onSuccess = res => {
            setloading(false);
            dispatch(set_address_request('', () => { }));
            navigation?.navigate('Home');
          };
          dispatch(saveCreatePropertyData(null, onSuccess));
        }
      } catch (error) {
        setloading(false);

        console.log('Error', error);
      }
    } else {
      Alert.alert('Error', networkText);
    }
  };

  const onSave = async () => {
    add_property_detail.save_desc = true;
    add_property_detail.save_list = true;
    add_property_detail.save_data = true;
    dispatch(
      saveCreatePropertyData(add_property_detail, () => {
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
            h1={data?.title}
            h2={data?.property_type?.title}
            uri={previewImg}
          />
          <View>
            <FlatList
              data={data?.images}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setPreviewImg(item?.path);
                    }}>
                    <PreviewImageBox
                      onPress={() => { }}
                      uri={
                        item?.path ||
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
                  h2: `${data.currency_type?.title} ${data.price || 0}`,
                  icon: appIcons.priceTag,
                }}
              />
              {data.property_type?.title != 'Vacant Land' &&
                <PreviewInfoCard
                  item={{
                    h1: 'Year Built',
                    h2: `${data?.year_built || 0}`,
                    icon: appIcons.built,
                  }}
                />
              }
            </View>
            <Text numberOfLines={6} style={styles.desc}>
              {data.lot_desc}
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
            {data.property_type?.type != 'Condo' && (
              <>
                <PreviewField
                  title={`Lot Frontage (${data.lot_unit?.title})`}
                  subtitle={data.lot_frontage || '0'}
                />
                <PreviewField
                  title={`Lot Depth (${data.lot_unit?.title})`}
                  subtitle={data.lot_depth || '0'}
                />
                <PreviewField
                  title={`Lot Size (${data.lot_unit?.title == 'meter' ? 'sqm' : 'sft'})`}
                  subtitle={data.lot_size || '23'}
                />
                <PreviewField
                  title={'Is This Lot Irregular?'}
                  subtitle={data.is_lot_irregular ? 'Yes' : 'No'}
                />
              </>
            )}
            <PreviewField
              title={`Property Taxes (${data.currency_type?.title})`}
              subtitle={data.property_tax || 0}
            />
            <PreviewField
              title={'Tax Year'}
              subtitle={data.tax_year || 'N/A'}
            />
            {data.property_type?.title == 'Condo' && (
              <>
                <PreviewField
                  title={'Locker'}
                  subtitle={data.locker ? 'Yes' : 'No'}
                />
                <PreviewField
                  title={'Condo Corporation / HOA'}
                  subtitle={
                    data.condo_corporation || 'N/A'
                  }
                />
                <PreviewField
                  title={'Condo/HOA fees (per month)'}
                  subtitle={data.condo_fees || 0}
                />
              </>
            )}
            {(data.property_type?.title == 'House' || data.property_type?.title == 'Condo') &&
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
                  subtitle={data.num_of_rooms || 'N/A'}
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

                {data.property_type?.title == 'House' ?
                  <>
                    <PreviewField
                      title={'House Type'}
                      subtitle={data.house_type?.title || 'N/A'}
                      source={appIcons.HouseType}
                    />
                    <PreviewField
                      title={'House Style'}
                      subtitle={data.house_style?.title || 'N/A'}
                      source={appIcons.HouseStyle}
                    />
                  </> :
                  <>
                    <PreviewField
                      title={'Condo Type'}
                      subtitle={data.condo_type?.title || 'N/A'}
                      source={appIcons.condoType}
                    />
                    <PreviewField
                      title={'Condo Style'}
                      subtitle={data.condo_style?.title || 'N/A'}
                      source={appIcons.condoStyle}
                    />
                  </>
                }
                <PreviewField
                  title={'Exterior'}
                  subtitle={data.exterior || 'N/A'}
                  source={appIcons.exterior}
                  multiple
                />
                <PreviewField
                  title={'Basement'}
                  subtitle={data.basement || 'N/A'}
                  source={appIcons.bassement}
                  multiple
                />
                {data.property_type?.title == 'Condo' &&
                  <>
                    <PreviewField
                      title={'Balcony'}
                      subtitle={data.balcony?.title || 'N/A'}
                      source={appIcons.balcony}
                    />
                    <PreviewField
                      title={'Exposure'}
                      subtitle={data.exposure?.title || 'N/A'}
                      source={appIcons.exposure}
                    />
                    <PreviewField
                      title={'Security'}
                      subtitle={data.security?.title || 'N/A'}
                      source={appIcons.security}
                    />
                    <PreviewField
                      title={'Pets Allowed'}
                      subtitle={data.pets_allowed?.title || 'N/A'}
                      source={appIcons.pets}
                    />
                    <PreviewField
                      title={'Utilities Included'}
                      subtitle={data.included_utilities || 'N/A'}
                      source={appIcons.included_utilities}
                      multiple
                    />
                  </>
                }
                <PreviewField
                  title={'Garage'}
                  subtitle={data.garage?.title || 'N/A'}
                  source={appIcons.garage}
                />
                {data.property_type?.title == 'House' &&
                  <PreviewField
                    title={'Driveway'}
                    subtitle={data.driveway?.title || 'N/A'}
                    source={appIcons.driveway}
                  />
                }
                <PreviewField
                  title={'Water'}
                  subtitle={data.water?.title || 'N/A'}
                  source={appIcons.water}
                />
                <PreviewField
                  title={'Sewer'}
                  subtitle={data.sewer?.title || 'N/A'}
                  source={appIcons.sware}
                />
                <PreviewField
                  title={'Heat Source'}
                  subtitle={data.heat_source}
                  source={appIcons.source}
                  multiple
                />
                <PreviewField
                  title={'Heat Type'}
                  subtitle={data.heat_type}
                  source={appIcons.heat}
                  multiple
                />
                <PreviewField
                  title={'Laundary'}
                  subtitle={data.laundary ? 'Yes' : 'No'}
                  source={appIcons.sware}
                />
                <PreviewField
                  title={'Fireplace'}
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
                  subtitle={data.pool?.title || 'N/A'}
                  source={appIcons.pool}
                />
              </>
            }
            <View style={styles.descBox}>
              <SmallHeading title={'Property Description'} />
              <SmallHeading
                textColor={colors.g22}
                title={data?.desc || 'N/A'}
              />
              {data?.property_type?.title != 'Condo' && (
                <>
                  <SmallHeading title={'Lot Description'} />
                  <SmallHeading
                    textColor={colors.g22}
                    title={data?.lot_desc || 'N/A'}
                  />
                </>
              )}
              {data?.property_type?.title != 'Vacant Land' && (
                <>
                  <SmallHeading title={'Appliances and other Items'} />
                  <SmallHeading
                    textColor={colors.g22}
                    title={data?.other_desc || 'N/A'}
                  />
                </>
              )}
            </View>
            {data.property_type?.title != 'Vacant Land' &&
              <RoomsBox data={data.rooms} />
            }
          </View>
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
        </View>
      </KeyboardAwareScrollView>
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default PropertyDetail;
