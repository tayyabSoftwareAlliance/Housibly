import React, { useState } from 'react';
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
  buyerRef,
  buyerRefAdvance,
  lot_area_unit_list,
  lot_unit_list,
} from '../../../../../shared/utilities/constant';
import styles from './styles';
import { useSelector } from 'react-redux';

const BuyTab = ({ navigation }) => {

  const { my_preference } = useSelector(state => state?.appReducer)
  const [address, setAddress] = useState('');
  const [showAdvance, setShowAdvance] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const RenderRow = ({ title, text, odd, textStyle }) => {
    return (
      <View style={[styles.itemRow, { backgroundColor: odd ? colors.white : colors.g5 }]}>
        <Text style={styles.titleTxtStyle}>{title}</Text>
        <Text style={[styles.valTxtStyle, textStyle]}>{text}</Text>
      </View>
    );
  };

  const AddressesRow = ({ item, index }) => {
    return (
      <View style={styles.addressItemRow(index)}>
        <Text style={styles.addrsTxtStyle}>{item?.address}</Text>
        <Image source={appIcons.cross} style={styles.crossIconStyle} />
      </View>
    );
  };
  console.log('my prefernce ', my_preference)
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
        <RenderRow title={'Price'} text={`${my_preference.currency_type} ${my_preference.price?.min || 0} to ${my_preference.price?.max || 0}`} odd={true} textStyle={{ textTransform: 'none' }} />
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
          </>
        }
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
          buyerRefAdvance.map((item, index) => {
            return <RenderRow key={index} item={item} index={index} />;
          })}

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
      </View>
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
