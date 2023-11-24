import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {AddressModal, AppButton, Spacer} from '../../../../../components';
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
} from '../../../../../shared/utilities/constant';
import styles from './styles';

const BuyTab = ({navigation}) => {
  const [address, setAddress] = useState('');
  const [showAdvance, setShowAdvance] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const RenderRow = ({item, index}) => {
    return (
      <View style={styles.itemRow(index)}>
        <Text style={styles.titleTxtStyle}>{item?.title}</Text>
        <Text style={styles.valTxtStyle}>{item?.property}</Text>
      </View>
    );
  };

  const AddressesRow = ({item, index}) => {
    return (
      <View style={styles.addressItemRow(index)}>
        <Text style={styles.addrsTxtStyle}>{item?.address}</Text>
        <Image source={appIcons.cross} style={styles.crossIconStyle} />
      </View>
    );
  };

  return (
    <>
      <View style={styles.paddingView}>
        <Text style={styles.propertyTxtStyle}>
          Your Current Buyer Preference
        </Text>
        {buyerRef.map((item, index) => {
          return <RenderRow key={index} item={item} index={index} />;
        })}
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
          imageStyle={{borderRadius: 7}}>
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
        <View style={[styles.dividerView, {marginBottom: WP('4')}]} />
        {addresses.map((item, index) => {
          return <AddressesRow key={index} item={item} index={index} />;
        })}
      </View>
      <Spacer androidVal={WP('2')} iOSVal={WP('2')} />
      <AppButton
        width={'43%'}
        borderColor={colors.p2}
        title="Edit Buyer Preference"
        textStyle={{fontSize: size.tiny}}
        onPress={() => alert('coming soon')}
      />
      <AddressModal
        show={showAddressModal}
        onPressHide={() => setShowAddressModal(false)}
      />
    </>
  );
};

export default BuyTab;
