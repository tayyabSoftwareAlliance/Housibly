import React, { useEffect, useMemo, useState } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { AddressModal, AppButton, AppLoader, Spacer } from '../../../../../components';
import {
  WP,
  colors,
  appIcons,
  appImages,
  size,
} from '../../../../../shared/exporter';
import {
  addresses,
  lot_area_unit_list,
  lot_unit_list,
  property_type_list,
} from '../../../../../shared/utilities/constant';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { delete_dream_address, get_dream_addresses, get_my_preference } from '../../../../../redux/actions/app-actions/app-actions';
import { formatNumber } from '../../../../../shared/utilities/helper';
import { Pressable } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const RenderRow = ({ title, text, list, odd, textStyle }) => {

  const renderText = useMemo(() => {
    if (list)
      return text?.length > 0 ? text?.map?.(item => list[item]).join(', ') : "Does't matter"
    else
      return text
  }, [text, list])

  return (
    <View style={[styles.itemRow, { backgroundColor: odd ? colors.white : colors.g5 }]}>
      <Text style={styles.titleTxtStyle}>{title}</Text>
      <Text style={[styles.valTxtStyle, textStyle]}>{renderText}</Text>
    </View>
  );
};

const BuyTab = ({ navigation }) => {

  const dispatch = useDispatch()
  const { my_preference, dream_addresses, sublists } = useSelector(state => state?.appReducer)
  const [address, setAddress] = useState('');
  const [showAdvance, setShowAdvance] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const isFocused = useIsFocused()

  const AddressesRow = ({ item, index }) => {
    const deleteAddress = () => {
      setLoader(true)
      dispatch(delete_dream_address({ id: item?.id }, () => setLoader(false), () => setLoader(false)))
    }
    return (
      <View style={styles.addressItemRow(index)}>
        <Text style={styles.addrsTxtStyle}>{item?.address}</Text>
        <TouchableOpacity style={{ padding: WP(3), paddingHorizontal: WP(2) }} onPress={deleteAddress} >
          <Image source={appIcons.cross} style={styles.crossIconStyle} />
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    dispatch(get_my_preference())
    dispatch(get_dream_addresses())
  }, [])

  useEffect(() => {
    showAdvance && setShowAdvance(false)
  }, [isFocused])

  return (
    <>
      <View style={styles.paddingView}>
        <Text style={styles.propertyTxtStyle}>
          Your Current Buyer Preference
        </Text>
        {/* {buyerRef.map((item, index) => {
          return <RenderRow key={index} item={item} index={index} />;
        })} */}
        <RenderRow title={'Property Type'} text={property_type_list[my_preference.property_type]} />
        <RenderRow title={'Price'} text={`${sublists.currency_type?.[my_preference.currency_type] || '$USD'} ${formatNumber(my_preference.price?.min) || 0} to ${my_preference.price?.max ? formatNumber(my_preference.price.max) : 'Any'}`} odd={true} textStyle={{ textTransform: 'none' }} />
        {my_preference.property_type != 'vacant_land' &&
          <>
            <RenderRow title={'Min No. of Bedrooms'} text={my_preference.bed_rooms?.min || 0} />
            <RenderRow title={'Min No. of Bathrooms'} text={my_preference.bath_rooms?.min || 0} odd={true} />
            <RenderRow title={'Min No. of Kitchens'} text={my_preference.total_number_of_rooms?.min || 0} />
          </>
        }
        {my_preference.property_type == 'vacant_land' &&
          <>
            <RenderRow title={'Min Lot Frontage'} text={`${my_preference.lot_frontage?.min || 0} ${my_preference.lot_frontage_unit || lot_unit_list[0]}`} />
            <RenderRow title={'Min Lot Size'} text={`${my_preference.lot_size?.min || 0} ${my_preference.lot_size_unit == lot_area_unit_list[1] ? lot_area_unit_list[1] : lot_area_unit_list[0]}`} odd={true} />
            {/* <RenderRow title={'Is Lot Irregular'} text={my_preference.is_lot_irregular ? 'true' : 'false'} /> */}
          </>
        }
        {(my_preference.property_type == 'condo' || my_preference.property_type == 'house') ?
          <>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.iconRow}
              onPress={() => setShowAdvance(!showAdvance)}>
              <Text style={styles.advanceTxtStyle}>Show Advance Options</Text>
              <Icon
                type={'antdesign'}
                name={showAdvance ? 'caretup' : 'caretdown'}
                size={10}
                color={colors.p1}
              />
            </TouchableOpacity>
            {showAdvance &&
              <>
                {my_preference.property_type == 'condo' ?
                  <>
                    <RenderRow title={'Condo Type'} text={my_preference.condo_type} list={sublists.condo_type} />
                    <RenderRow title={'Condo Style'} text={my_preference.condo_style} list={sublists.condo_style} odd={true} />
                  </> :
                  <>
                    <RenderRow title={'House Type'} text={my_preference.house_type} list={sublists.house_type} />
                    <RenderRow title={'House Style'} text={my_preference.house_style} list={sublists.house_style} odd={true} />
                  </>
                }
                <RenderRow title={'Max Age (years)'} text={my_preference.max_age || 'any'} />
                {my_preference.property_type != 'condo' &&
                  <>
                    <RenderRow title={'Min Lot Frontage'} text={`${my_preference.lot_frontage?.min || 0} ${my_preference.lot_frontage_unit || lot_unit_list[0]}`} />
                    <RenderRow title={'Min Lot Size'} text={`${my_preference.lot_size?.min || 0} ${my_preference.lot_size_unit == lot_area_unit_list[1] ? lot_area_unit_list[1] : lot_area_unit_list[0]}`} odd={true} />
                    {/* <RenderRow title={'Is Lot Irregular'} text={my_preference.is_lot_irregular ? 'true' : 'false'} /> */}
                  </>
                }
                <RenderRow title={'Exterior'} text={my_preference.exterior} list={sublists.exterior} odd={true} />
                {my_preference.property_type == 'condo' &&
                  <>
                    <RenderRow title={'Balcony'} text={my_preference.balcony} list={sublists.balcony} />
                    <RenderRow title={'Exposure'} text={my_preference.exposure} list={sublists.exposure} odd={true} />
                    <RenderRow title={'Security'} text={my_preference.security} list={sublists.security} />
                    <RenderRow title={'Pets Allowed'} text={my_preference.pets_allowed} list={sublists.pets_allowed} odd={true} />
                    <RenderRow title={'Utilities Included'} text={my_preference.included_utilities} list={sublists.included_utilities} />
                  </>
                }
                <RenderRow title={'Basement'} text={my_preference.basement} list={sublists.basement} odd={true} />
                <RenderRow title={'Min Total Parking Spaces'} text={my_preference.total_parking_spaces?.min || 0} />
                <RenderRow title={'Min Garage Spaces'} text={my_preference.garage_spaces?.min || 0} odd={true} />
                {my_preference.property_type == 'house' &&
                  <>
                    <RenderRow title={'Driveway'} text={my_preference.driveway} list={sublists.driveway} />
                    <RenderRow title={'Water'} text={my_preference.water} list={sublists.water} odd={true} />
                  </>
                }
                <RenderRow title={'Sewer'} text={my_preference.sewer} list={sublists.sewer} />
                <RenderRow title={'Heat Source'} text={my_preference.heat_source} list={sublists.heat_source} odd={true} />
                <RenderRow title={'Heat Type'} text={my_preference.heat_type} list={sublists.heat_type} />
                <RenderRow title={'Air Conditioner'} text={my_preference.air_conditioner} list={sublists.air_conditioner} odd={true} />
                <RenderRow title={'Laundry'} text={my_preference.laundry} list={sublists.laundry} />
                <RenderRow title={'Fireplace'} text={my_preference.fireplace} list={sublists.fireplace} odd={true} />
                <RenderRow title={'Central Vacuum'} text={my_preference.central_vacuum ? 'Yes' : 'No'} />
                <RenderRow title={'Pool'} text={my_preference.pool} list={sublists.pool} odd={true} />
              </>
            }
          </> :
          <View style={{ height: WP(5) }} />
        }
        <Pressable onPress={() => navigation?.navigate('MapScreen')} >
          <ImageBackground
            source={appImages.map}
            style={styles.mapImgStyle}
            imageStyle={{ borderRadius: 7 }}
          >
            <Image source={appIcons.addressIcon} style={styles.iconStyle} />
            <Text style={styles.addressTxtStyle}>Press Here to Open Map</Text>
          </ImageBackground>
        </Pressable>
        <TouchableOpacity style={styles.savedLocationContainer} onPress={() => navigation.navigate('SavedLocations')} >
          <Text style={styles.savedLocationText}>Saved Locations</Text>
        </TouchableOpacity>
        <View style={styles.infoRowContainer}>
          <Text style={styles.propertyTxtStyle}>Dream Addresses</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowAddressModal(true)}
            style={{padding:4}}>
            <Image source={appIcons.infoIcon} style={styles.infoIconStyle} />
          </TouchableOpacity>
        </View>
        <View style={styles.dividerView} />
        {/* <TextInput
          value={address}
          style={styles.inputStyle}
          placeholder="Start typing..."
          placeholderTextColor={colors.g19}
          onChangeText={txt => setAddress(txt)}
        /> */}
        <Text style={styles.startTypingTxt} onPress={() => navigation?.navigate('AddAddress', { from: 'dream_address' })} >Start typing...</Text>
        <View style={[styles.dividerView, { marginBottom: WP('4') }]} />
        {dream_addresses.map((item, index) => {
          return <AddressesRow key={index} item={item} index={index} />;
        })}
      </View >
      <Spacer androidVal={WP('12')} iOSVal={WP('12')} />
      <AddressModal
        show={showAddressModal}
        onPressHide={() => setShowAddressModal(false)}
      />
      <AppLoader loading={loader} />
    </>
  );
};

export default BuyTab;
