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
import { AddressModal, AppButton, Spacer } from '../../../../../components';
import {
  WP,
  colors,
  appIcons,
  appImages,
  size,
} from '../../../../../shared/exporter';
import {
  addresses,
  currency_list,
  lot_area_unit_list,
  lot_unit_list,
} from '../../../../../shared/utilities/constant';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { get_my_preference } from '../../../../../redux/actions/app-actions/app-actions';

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
  const { my_preference, sublists } = useSelector(state => state?.appReducer)
  const [address, setAddress] = useState('');
  const [showAdvance, setShowAdvance] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const AddressesRow = ({ item, index }) => {
    return (
      <View style={styles.addressItemRow(index)}>
        <Text style={styles.addrsTxtStyle}>{item?.address}</Text>
        <Image source={appIcons.cross} style={styles.crossIconStyle} />
      </View>
    );
  };

  useEffect(() => {
    dispatch(get_my_preference())
  }, [])

  return (
    <>
      <View style={styles.paddingView}>
        <Text style={styles.propertyTxtStyle}>
          Your Current Buyer Preference
        </Text>
        {/* {buyerRef.map((item, index) => {
          return <RenderRow key={index} item={item} index={index} />;
        })} */}
        <RenderRow title={'Property Type'} text={my_preference.property_type} />
        <RenderRow title={'Price'} text={`${my_preference.currency_type || currency_list[0]} ${my_preference.price?.min || 0} to ${my_preference.price?.max || 'Any'}`} odd={true} textStyle={{ textTransform: 'none' }} />
        {my_preference.property_type != 'vacant_land' &&
          <>
            <RenderRow title={'Min No. of Bedrooms'} text={my_preference.bed_rooms?.min || 0} />
            <RenderRow title={'Min No. of Bathrooms'} text={my_preference.bath_rooms?.min || 0} odd={true} />
            <RenderRow title={'Min No. of Rooms'} text={my_preference.total_number_of_rooms?.min || 0} />
          </>
        }
        {my_preference.property_type != 'condo' &&
          <>
            <RenderRow title={'Min Lot Size'} text={`${my_preference.lot_size?.min || 0} ${my_preference.lot_size_unit == lot_area_unit_list[1] ? lot_area_unit_list[1] : lot_area_unit_list[0]}`} odd={true} />
            <RenderRow title={'Min Lot Frontage'} text={`${my_preference.lot_frontage?.min || 0} ${my_preference.lot_frontage_unit || lot_unit_list[0]}`} />
            <RenderRow title={'Is Lot Irregular'} text={my_preference.is_lot_irregular ? 'true' : 'false'} />
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
                <RenderRow title={'Max Age'} text={my_preference.max_age || 'any'} />
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
                <RenderRow title={'Min Total Parking Spaces'} text={my_preference.min_total_parking_spaces || 0} />
                <RenderRow title={'Min Garage Spaces'} text={my_preference.min_garage_spaces || 0} odd={true} />
                {my_preference.property_type == 'house' &&
                  <RenderRow title={'Driveway'} text={my_preference.driveway} list={sublists.driveway} />
                }
                <RenderRow title={'Water'} text={my_preference.water} list={sublists.water} odd={true} />
                <RenderRow title={'Sewer'} text={my_preference.sewer} list={sublists.sewer} />
                <RenderRow title={'Heat Source'} text={my_preference.heat_source} list={sublists.heat_source} odd={true} />
                <RenderRow title={'Heat Type'} text={my_preference.heat_type} list={sublists.heat_type} />
                <RenderRow title={'Air Conditioner'} text={my_preference.air_conditioner} list={sublists.air_conditioner} odd={true} />
                <RenderRow title={'Laundary'} text={my_preference.laundry} list={sublists.laundry} />
                <RenderRow title={'Fireplace'} text={my_preference.fireplace} list={sublists.fireplace} odd={true} />
                <RenderRow title={'Central Vacuum'} text={my_preference.central_vacuum ? 'true' : 'false'} />
                <RenderRow title={'Pool'} text={my_preference.pool} list={sublists.pool} odd={true} />
              </>
            }
          </> :
          <View style={{ height: WP(5) }} />
        }
        <ImageBackground
          source={appImages.map}
          style={styles.mapImgStyle}
          imageStyle={{ borderRadius: 7 }}>
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('MapScreen');
            }}>
            <Image source={appIcons.addressIcon} style={styles.iconStyle} />
          </TouchableOpacity>
          <Text style={styles.addressTxtStyle}>Last Updated: None</Text>
        </ImageBackground>
        <View style={styles.infoRowContainer}>
          <Text style={styles.propertyTxtStyle}>Dream Addresses</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowAddressModal(true)}>
            <Image source={appIcons.infoIcon} style={styles.infoIconStyle} />
          </TouchableOpacity>
        </View>
        <View style={styles.dividerView} />
        <TextInput
          value={address}
          style={styles.inputStyle}
          placeholder="Start typing..."
          placeholderTextColor={colors.g19}
          onChangeText={txt => setAddress(txt)}
        />
        <View style={[styles.dividerView, { marginBottom: WP('4') }]} />
        {addresses.map((item, index) => {
          return <AddressesRow key={index} item={item} index={index} />;
        })}
      </View >
      <Spacer androidVal={WP('2')} iOSVal={WP('2')} />
      <AppButton
        width={'43%'}
        borderColor={colors.p2}
        title="Edit Buyer Preference"
        textStyle={{ fontSize: size.tiny }}
        onPress={() => navigation.navigate('FilterScreen')}
      />
      <AddressModal
        show={showAddressModal}
        onPressHide={() => setShowAddressModal(false)}
      />
    </>
  );
};

export default BuyTab;
