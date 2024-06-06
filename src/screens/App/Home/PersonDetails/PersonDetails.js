import React, { useState, useLayoutEffect } from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/core';
import { AppButton, BackHeader, Spacer } from '../../../../components';
import {
  appIcons,
  appImages,
  appLogos,
  colors,
  family,
  size,
  WP,
} from '../../../../shared/exporter';
import {
  condoDetails,
  homeDetails,
  landDetails,
} from '../../../../shared/utilities/constant';
import { useSelector } from 'react-redux';
import styles from './styles';
import { formatNumber } from '../../../../shared/utilities/helper';

const RenderRow = ({ title, value, matched, even }) => {
  return (
    <View style={styles.itemRow(even)}>
      <Text style={styles.titleTxtStyle}>{title}</Text>
      <View style={styles.contentRow}>
        <Text numberOfLines={3} style={styles.valTxtStyle}>{value}</Text>
        <Image
          source={matched ? appIcons.checkIcon : appIcons.crossedIcon}
          style={styles.iconStyle}
        />
      </View>
    </View>
  );
};

const PersonDetails = ({ navigation, route }) => {
  const isFocus = useIsFocused();
  const [_, setData] = useState([]);
  const { sublists } = useSelector(state => state?.appReducer);
  const property_type = route.params?.property_type
  const data = route.params?.item

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
  }, [isFocus]);

  useLayoutEffect(() => {
    let type = route?.params?.property_type;
    if (type === 'House') {
      setData(homeDetails);
    } else if (type === 'Condo') {
      setData(condoDetails);
    } else {
      setData(landDetails);
    }
  }, []);

  const RenderDetails = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.detailsContainer}
        onPress={() => console.log('You touched me')}>
        <View style={styles.innerRow}>
          <Image source={{ uri: data?.user?.avatar }} style={styles.imgStyle} />
          <View>
            <Text numberOfLines={2} style={styles.nameTxtStyle}>
              {data?.user?.full_name || 'N/A'}
            </Text>
            <View style={styles.iconRow}>
              <Icon
                name={'heart'}
                type={'antdesign'}
                size={16}
                color={colors.r2}
                style={{ marginRight: 5 }}
              />
              <Text style={styles.matchTxtStyle}>{Number(data?.match_percentage).toFixed(0)}% match</Text>
            </View>
          </View>
        </View>
        <Image source={appLogos.roundLogo} style={styles.matchImgStyle} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar backgroundColor={colors.g5} />
      <BackHeader
        title="Buyer’s Preference"
        txtCenter
        txtSize={size.xsmall}
        txtFamily={family.Gilroy_SemiBold}
      />
      <RenderDetails />
      <View style={styles.container}>
        <Text style={styles.headTxtStyle}>Preference</Text>
        {property_type == 'house' ?
          <>
            <RenderRow
              title={'Budget'}
              value={<Text><Text style={styles.priceTxt} >{`${sublists.currency_type?.[data.currency_type]} ${(formatNumber(data?.price?.value?.min) || 0)}`}</Text> to <Text style={styles.priceTxt} >{data?.price?.value?.max ? formatNumber(data?.price?.value?.max) : 'any'}</Text></Text>}
              matched={data?.price?.matched}
            />
            <RenderRow title={'Min No. of Rooms'} value={data?.total_number_of_rooms?.value?.min || 0} matched={data?.total_number_of_rooms?.matched} />
            <RenderRow title={'Min Bedrooms'} value={data?.bed_rooms?.value?.min || 0} matched={data?.bed_rooms?.matched} />
            <RenderRow title={'Min Bathrooms'} value={data?.bath_rooms?.value?.min || 0} matched={data?.bath_rooms?.matched} />
            <RenderRow title={'Property Types'} value={data?.house_type?.value?.map(item => sublists?.house_type[item]).join(', ') || "Doesn't Matter"} matched={data?.house_type?.matched} />
            <RenderRow title={'Property Styles'} value={data?.house_style?.value?.map(item => sublists?.house_style[item]).join(', ') || "Doesn't Matter"} matched={data?.house_style?.matched} />
            <RenderRow title={'Min Lot Frontage'} value={(formatNumber(data?.lot_frontage?.value?.min) || 0) + ' ' + data?.lot_frontage_unit} matched={data?.lot_frontage?.matched} />
            <RenderRow title={'Min Lot Size'} value={(formatNumber(data?.lot_size?.value?.min) || 0) + ' ' + data?.lot_size_unit} matched={data?.lot_size?.matched} />
            <RenderRow title={'Min Total Parking Spaces'} value={data?.total_parking_spaces?.value?.min || 0} matched={data?.total_parking_spaces?.matched} />
            <RenderRow title={'Min Garage Spaces'} value={data?.garage_spaces?.value?.min || 0} matched={data?.garage_spaces?.matched} />
            <RenderRow title={'Max Age (years)'} value={data?.max_age?.value || 'Any'} matched={data?.max_age?.matched} />
          </> :
          property_type == 'condo' ?
            <>
              <RenderRow
                title={'Budget'}
                value={<Text><Text style={styles.priceTxt} >{`${sublists.currency_type?.[data.currency_type]} ${(formatNumber(data?.price?.value?.min) || 0)}`}</Text> to <Text style={styles.priceTxt} >{data?.price?.value?.max ? formatNumber(data?.price?.value?.max) : 'any'}</Text></Text>}
                matched={data?.price?.matched}
              />
              <RenderRow title={'Min No. of Rooms'} value={data?.total_number_of_rooms?.value?.min || 0} matched={data?.total_number_of_rooms?.matched} />
              <RenderRow title={'Min Bedrooms'} value={data?.bed_rooms?.value?.min || 0} matched={data?.bed_rooms?.matched} />
              <RenderRow title={'Min Bathrooms'} value={data?.bath_rooms?.value?.min || 0} matched={data?.bath_rooms?.matched} />
              <RenderRow title={'Property Types'} value={data?.condo_type?.value?.map(item => sublists?.condo_type[item]).join(', ') || "Doesn't Matter"} matched={data?.condo_type?.matched} />
              <RenderRow title={'Property Styles'} value={data?.condo_style?.value?.map(item => sublists?.condo_style[item]).join(', ') || "Doesn't Matter"} matched={data?.condo_style?.matched} />
              <RenderRow title={'Min Total Parking Spaces'} value={data?.total_parking_spaces?.value?.min || 0} matched={data?.total_parking_spaces?.matched} />
              <RenderRow title={'Min Garage Spaces'} value={data?.garage_spaces?.value?.min || 0} matched={data?.garage_spaces?.matched} />
              <RenderRow title={'Balcony'} value={data?.balcony?.value?.map(item => sublists.balcony[item]).join(', ') || "Doesn't Matter"} matched={data?.balcony?.matched} />
              <RenderRow title={'Security'} value={data?.security?.value?.map(item => sublists.security[item]).join(', ') || "Doesn't Matter"} matched={data?.security?.matched} />
              <RenderRow title={'Laundry'} value={data?.laundry?.value?.map(item => sublists.laundry[item]).join(', ') || "Doesn't Matter"} matched={data?.laundry?.matched} />
              <RenderRow title={'Max Age (years)'} value={data?.max_age?.value || 'Any'} matched={data?.max_age?.matched} />
            </> :
            <>
              <RenderRow
                title={'Budget'}
                value={<Text><Text style={styles.priceTxt} >{`${sublists.currency_type?.[data.currency_type]} ${(formatNumber(data?.price?.value?.min) || 0)}`}</Text> to <Text style={styles.priceTxt} >{data?.price?.value?.max ? formatNumber(data?.price?.value?.max) : 'any'}</Text></Text>}
                matched={data?.price?.matched}
              />
              <RenderRow title={'Min Lot Frontage'} value={(formatNumber(data?.lot_frontage?.value?.min) || 0) + ' ' + data?.lot_frontage_unit} matched={data?.lot_frontage?.matched} />
              <RenderRow title={'Min Lot Size'} value={(formatNumber(data?.lot_size?.value?.min) || 0) + ' ' + data?.lot_size_unit} matched={data?.lot_size?.matched} />
            </>
        }
      </View>
      <View style={styles.bottomView}>
        <AppButton
          width="38.5%"
          height={WP('10.3')}
          title="Send Message"
          borderColor={colors.p2}
          textStyle={styles.btnTxtStyle}
          onPress={() => navigation.navigate('PersonChat', { recipient_id: data?.user?.id, avatar: data?.user?.avatar, full_name: data?.user?.full_name, from: 'not_chats' })}
        />
      </View>
    </SafeAreaView>
  );
};

export default PersonDetails;
