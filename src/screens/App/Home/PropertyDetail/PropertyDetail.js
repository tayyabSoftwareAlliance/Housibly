import {
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
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
  propertyFormData
} from '../../../../shared/exporter';
import styles from './styles';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveCreatePropertyData,
} from '../../../../redux/actions';
import RoomsBox from '../../../../components/Box/RoomsBox';
import {
  create_my_property,
  removeCreatePropertyData,
  update_my_property,
} from '../../../../redux/actions/app-actions/app-actions';
import { ChatPopupModal } from '../../../../components/Modal/ChatPopupModal';

const PropertyDetail = ({ navigation, route }) => {
  const { propertyData, from, type } = route.params;
  const { saved_create_property_data, sublists, loading } = useSelector(
    state => state?.appReducer,
  );
  const [imgSelectedIndex, setImgSelectedIndex] = useState(0);
  const [contactSellerModal, setContactSellerModal] = useState(false);
  const dispatch = useDispatch();

  const onPost = async () => {
    const onSuccess = () => {
      if (from != 'edit') dispatch(removeCreatePropertyData(null));
      navigation.navigate('Home');
      if (from == 'edit')
        Alert.alert('Success', 'Property Updated Successfully!');
      else Alert.alert('Success', 'Property Created Successfully!');
    };
    const check = await checkConnected();
    if (check) {
      const formdata = propertyFormData(propertyData);
      if (from == 'edit') {
        dispatch(
          update_my_property({ data: formdata, id: propertyData?.id }, onSuccess),
        );
      } else {
        console.log('from', from)
        dispatch(create_my_property(formdata, onSuccess));
      }
    } else {
      Alert.alert('Error', networkText);
    }
  };

  const onSave = async () => {
    dispatch(saveCreatePropertyData(propertyData));
  };

  console.log('propertyData', JSON.stringify(propertyData?.user, null, 2))

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.app_color}
        barStyle={'dark-content'}
      />
      <View style={spacing.my2}>
        <BackHeader subtitle={'Preview'} />
      </View>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <PreviewImageCover
            h1={propertyData.title}
            h2={property_type_list[propertyData.property_type]}
            uri={
              propertyData?.images?.[imgSelectedIndex]?.id
                ? propertyData?.images?.[imgSelectedIndex]?.url
                : propertyData?.images?.[imgSelectedIndex]?.path
            }
          />
          <View>
            <FlatList
              data={propertyData?.images}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setImgSelectedIndex(index);
                    }}>
                    <PreviewImageBox
                      uri={
                        (item?.id ? item?.url : item?.path) ||
                        'https://wallpaperaccess.com/full/1700222.jpg'
                      }
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View style={spacing.my2}>
            <Text style={styles.header}>Information</Text>
            <View style={styles.spacRow}>
              <PreviewInfoCard
                item={{
                  h1: 'Price',
                  h2: `${propertyData.currency_type} ${propertyData.price || 0
                    }`,
                  icon: appIcons.priceTag,
                }}
              />
              {propertyData.property_type != 'vacant_land' && (
                <PreviewInfoCard
                  item={{
                    h1: 'Year Built',
                    h2: `${propertyData.year_built || 0}`,
                    icon: appIcons.built,
                  }}
                />
              )}
            </View>
            {propertyData?.property_type != 'condo' &&
              <Text numberOfLines={6} style={styles.desc}>
                {propertyData.lot_description}
              </Text>
            }
            <Divider style={{ marginVertical: HP(2) }} color={colors.g13} />
            <PreviewField
              title={'Street Address'}
              subtitle={propertyData.address || 'N/A'}
            />
            <PreviewField title={'Unit'} subtitle={propertyData.unit || '0'} />
            {propertyData.property_type != 'condo' && (
              <>
                <PreviewField
                  title={`Lot Frontage (${propertyData.lot_frontage_unit})`}
                  subtitle={propertyData.lot_frontage || '0'}
                />
                <PreviewField
                  title={`Lot Depth (${propertyData.lot_frontage_unit})`}
                  subtitle={propertyData.lot_depth || '0'}
                />
                <PreviewField
                  title={`Lot Size (${propertyData.lot_frontage_unit == 'meter' ? 'sqm' : 'sft'
                    })`}
                  subtitle={propertyData.lot_size || '23'}
                />
                <PreviewField
                  title={'Is This Lot Irregular?'}
                  subtitle={propertyData.is_lot_irregular ? 'Yes' : 'No'}
                />
              </>
            )}
            <PreviewField
              title={`Property Taxes (${propertyData.currency_type})`}
              subtitle={propertyData.property_tax || 0}
            />
            <PreviewField
              title={'Tax Year'}
              subtitle={propertyData.tax_year || 'N/A'}
            />
            {propertyData.property_type == 'condo' && (
              <>
                <PreviewField
                  title={'Locker'}
                  subtitle={propertyData.locker ? 'Yes' : 'No'}
                />
                <PreviewField
                  title={'Condo Corporation / HOA'}
                  subtitle={propertyData.condo_corporation_or_hqa || 'N/A'}
                />
                <PreviewField
                  title={'Condo/HOA fees (per month)'}
                  subtitle={propertyData.condo_fees || 0}
                />
              </>
            )}
            {(propertyData.property_type == 'house' ||
              propertyData.property_type == 'condo') && (
                <>
                  <Divider style={{ marginVertical: HP(2) }} color={colors.g13} />
                  <PreviewField
                    title={'Bed Rooms'}
                    subtitle={propertyData.bed_rooms || 'N/A'}
                    source={appIcons.bed}
                  />
                  <PreviewField
                    title={'Bath Rooms'}
                    subtitle={propertyData.bath_rooms || 'N/A'}
                    source={appIcons.bath}
                  />
                  <PreviewField
                    title={'Total Number of Rooms'}
                    subtitle={propertyData.total_number_of_rooms || 'N/A'}
                    source={appIcons.living_space}
                  />
                  <PreviewField
                    title={'Total Parking Spaces'}
                    subtitle={propertyData.total_parking_spaces || 'N/A'}
                    source={appIcons.parking}
                  />
                  <PreviewField
                    title={'Garage Spaces'}
                    subtitle={propertyData.garage_spaces || 'N/A'}
                    source={appIcons.garage_space}
                  />

                  <Divider style={{ marginVertical: HP(2) }} color={colors.g13} />

                  {propertyData.property_type == 'house' ? (
                    <>
                      <PreviewField
                        title={'House Type'}
                        list={sublists.house_type}
                        subtitle={propertyData.house_type || 'N/A'}
                        source={appIcons.HouseType}
                      />
                      <PreviewField
                        title={'House Style'}
                        list={sublists.house_style}
                        subtitle={propertyData.house_style || 'N/A'}
                        source={appIcons.HouseStyle}
                      />
                    </>
                  ) : (
                    <>
                      <PreviewField
                        title={'Condo Type'}
                        list={sublists.condo_type}
                        subtitle={propertyData.condo_type || 'N/A'}
                        source={appIcons.condoType}
                      />
                      <PreviewField
                        title={'Condo Style'}
                        list={sublists.condo_style}
                        subtitle={propertyData.condo_style || 'N/A'}
                        source={appIcons.condoStyle}
                      />
                    </>
                  )}
                  <PreviewField
                    title={'Exterior'}
                    list={sublists.exterior}
                    subtitle={propertyData.exterior || 'N/A'}
                    source={appIcons.exterior}
                    multiple
                  />
                  <PreviewField
                    title={'Basement'}
                    list={sublists.basement}
                    subtitle={propertyData.basement || 'N/A'}
                    source={appIcons.bassement}
                    multiple
                  />
                  {propertyData.property_type == 'condo' && (
                    <>
                      <PreviewField
                        title={'Balcony'}
                        list={sublists.balcony}
                        subtitle={propertyData.balcony || 'N/A'}
                        source={appIcons.balcony}
                      />
                      <PreviewField
                        title={'Exposure'}
                        list={sublists.exposure}
                        subtitle={propertyData.exposure || 'N/A'}
                        source={appIcons.exposure}
                      />
                      <PreviewField
                        title={'Security'}
                        list={sublists.security}
                        subtitle={propertyData.security || 'N/A'}
                        source={appIcons.security}
                      />
                      <PreviewField
                        title={'Pets Allowed'}
                        list={sublists.pets_allowed}
                        subtitle={propertyData.pets_allowed || 'N/A'}
                        source={appIcons.pets}
                      />
                      <PreviewField
                        title={'Utilities Included'}
                        list={sublists.included_utilities}
                        subtitle={propertyData.included_utilities || 'N/A'}
                        source={appIcons.utilities}
                        multiple
                      />
                    </>
                  )}
                  {propertyData.property_type == 'house' && (
                    <PreviewField
                      title={'Driveway'}
                      list={sublists.driveway}
                      subtitle={propertyData.driveway || 'N/A'}
                      source={appIcons.driveway}
                    />
                  )}
                  <PreviewField
                    title={'Water'}
                    list={sublists.water}
                    subtitle={propertyData.water || 'N/A'}
                    source={appIcons.water}
                  />
                  <PreviewField
                    title={'Sewer'}
                    list={sublists.sewer}
                    subtitle={propertyData.sewer || 'N/A'}
                    source={appIcons.sware}
                  />
                  <PreviewField
                    title={'Heat Source'}
                    list={sublists.heat_source}
                    subtitle={propertyData.heat_source}
                    source={appIcons.source}
                    multiple
                  />
                  <PreviewField
                    title={'Heat Type'}
                    list={sublists.heat_type}
                    subtitle={propertyData.heat_type}
                    source={appIcons.heat}
                    multiple
                  />
                  <PreviewField
                    title={'Laundary'}
                    list={sublists.sewer}
                    subtitle={propertyData.laundry}
                    source={appIcons.loundry}
                  />
                  <PreviewField
                    title={'Fireplace'}
                    list={sublists.fireplace}
                    subtitle={propertyData.fireplace}
                    source={appIcons.fire}
                    multiple
                  />
                  <PreviewField
                    title={'Central Vacuum'}
                    subtitle={propertyData.central_vacuum ? 'Yes' : 'No'}
                    source={appIcons.vacume}
                  />
                  <PreviewField
                    title={'Pool'}
                    list={sublists.pool}
                    subtitle={propertyData.pool || 'N/A'}
                    source={appIcons.pool}
                  />
                </>
              )}
            <View style={styles.descBox}>
              <SmallHeading title={'Property Description'} />
              <SmallHeading
                textColor={colors.g22}
                title={propertyData.property_description || 'N/A'}
              />
              {propertyData?.property_type != 'vacant_land' && (
                <>
                  <SmallHeading title={'Appliances and other Items'} />
                  <SmallHeading
                    textColor={colors.g22}
                    title={propertyData?.appliances_and_other_items || 'N/A'}
                  />
                </>
              )}
            </View>
            {propertyData.property_type != 'vacant_land' && (
              <RoomsBox data={propertyData.rooms} />
            )}
          </View>
          {(from == 'create' || from == 'edit') && (
            <View
              style={[
                styles.spacRow,
                { marginVertical: HP(2) },
                from == 'edit' && { justifyContent: 'flex-end' },
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
                onPress={onPost}
                width={'45%'}
                bgColor={colors.p2}
                title={from == 'edit' ? 'Update' : 'Post'}
                fontSize={size.tiny}
              />
            </View>
          )}
          {type == 'not_my_property' &&
            <View style={styles.bottomView}>
              <AppButton
                width="38.5%"
                height={WP('10.3')}
                title="View on Map"
                shadowColor={colors.white}
                textStyle={styles.btnTxtStyle}
                borderColor={colors.g21}
                bgColor={colors.g21}
                onPress={() => navigation?.navigate('MapScreen', { propertyData, from: 'property_detail' })}
              />
              <View style={{ width: WP('3') }} />
              <AppButton
                onPress={() => setContactSellerModal(true)}
                width="38.5%"
                height={WP('10.3')}
                borderColor={colors.p2}
                title="Contact Seller"
                textStyle={styles.btnTxtStyle}
              />
            </View>
          }
        </View>
      </KeyboardAwareScrollView>
      <ChatPopupModal
        image={propertyData.user?.avatar}
        title={propertyData.user?.full_name}
        subtitle={'Are you sure you want to contact this seller?'}
        buttontitle={'Contact'}
        show={contactSellerModal}
        onPressHide={() => setContactSellerModal(false)}
        buttonLoader={false}
        onButtonPress={() => {
          setContactSellerModal(false)
          setTimeout(() => navigation.navigate('PersonChat', { recipient_id: propertyData.user?.id, avatar: propertyData.user?.avatar, full_name: propertyData.user?.full_name, from: 'not_chats' }), 500)
        }}
        buttonStyle={{ backgroundColor: colors.p1 }}
      />
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default PropertyDetail;
