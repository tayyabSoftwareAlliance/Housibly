import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { Menu, MenuItem } from 'react-native-material-menu';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  AppButton,
  AppHeader,
  PersonDetailsModal,
  Spacer,
} from '../../../components';
import {
  WP,
  colors,
  scrWidth,
  appIcons,
  appImages,
  scrHeight,
  PADDING_BOTTOM_FOR_TAB_BAR_SCREENS,
  HP,
  family,
  size,
} from '../../../shared/exporter';
import styles from './styles';
// Tabs
import BuyTab from './Tabs/BuyTab/BuyTab';
import MatchesTab from './Tabs/MatchesTab/MatchesTab';
import SellTab from './Tabs/SellTab/SellTab';
import { useDispatch, useSelector } from 'react-redux';
import { get_my_properties } from '../../../redux/actions';
import { get_matched_properties, get_top_support_closers } from '../../../redux/actions/app-actions/app-actions';
import { useNavigation } from '@react-navigation/native'
import moment from 'moment';
import Modal from 'react-native-modal';
import { get_all_notifications } from '../../../redux/actions/notification-actions/notification-actions';
import { capitalizeFirstLetter, convertLocationToAddress, handleLocationPermission, requestNotificationPermission } from '../../../shared/utilities/helper';
import { set_user_location_request } from '../../../redux/actions/auth-actions/auth-action';
import Geolocation from '@react-native-community/geolocation';

const Home = ({ navigation }) => {

  const dispatch = useDispatch()
  const carouselRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [selected, setSelected] = useState('buy');
  const [personDetailModal, setPersonDetailModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const { userInfo } = useSelector(state => state?.auth);
  const { userProfile } = useSelector(state => state?.settings);
  const { my_preference, top_support_closers } = useSelector(state => state?.appReducer)

  const hideItemClick = () => {
    setShowMenu(false);
  };

  const seeAllItemClick = () => {
    setShowMenu(false);
    setTimeout(() => {
      // setShowModal(true);
      navigation.navigate('SearchSupportCloser')
    }, 500);
  };


  const renderItem = (item, index, onPress) => {
    return (
      <Pressable style={styles.itemContainer} onPress={() => onPress(item)}>
        <View style={styles.itemInnerRow}>
          <Image source={{ uri: item?.avatar }} style={styles.personImgStyle} />
          <View style={styles.txtContainer}>
            <Text numberOfLines={1} style={styles.itemNameStyle}>{item?.full_name || 'N/A'}</Text>
            {/* <Text style={styles.h1TxtStyle}>Corporate Home X</Text> */}
            <Text numberOfLines={1} style={styles.h2TxtStyle}>{item?.professions?.map(item => item?.title)?.join(', ') || 'N/A'}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.iconContainer}
            onPress={() => setShowMenu(true)}>
            <Icon
              type={'entypo'}
              name={'dots-three-horizontal'}
              size={16}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
      </Pressable>
    );
  };

  const setUserCurrentLocation = async () => {
    const result = await handleLocationPermission()
    if (!result) return
    Geolocation.getCurrentPosition(
      async function (position) {
        try {
          const { latitude, longitude } = position.coords;
          const address = await convertLocationToAddress(latitude, longitude);
          const body = {
            latitude, longitude, address
          }
          dispatch(set_user_location_request(body))
        } catch (error) {
          // console.log('error response ', error?.response);
        }
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  useEffect(() => {
    if (userInfo) {
      dispatch(get_my_properties())
      dispatch(get_top_support_closers())
      dispatch(get_all_notifications())
      !userInfo?.user?.address && setUserCurrentLocation()
      setTimeout(requestNotificationPermission, 1000)
    }
  }, [])

  useEffect(() => {
    userInfo && my_preference && dispatch(get_matched_properties(1))
  }, [my_preference])

  return (
    <SafeAreaView style={styles.rootContainer}>
      <AppHeader
        onPressIcon={() => {
          navigation.navigate('Profile');
        }}
        rightIcon
        img={userProfile?.user?.avatar || userInfo?.user?.avatar}
        from={'home'}
      />
      {/* <Spacer androidVal={WP('4')} iOSVal={WP('4')} /> */}
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewStyle}
        stickyHeaderIndices={[3]}
        >
        <View style={styles.rowContainer}>
          <View>
            <Text style={styles.propertyTxtStyle}>Find a property</Text>
            <TouchableOpacity style={styles.innerRow} onPress={() => navigation.navigate('AddAddress', { from: 'home' })}>
              <Image source={appIcons.locIcon} style={styles.locIconStyle} />
              <Text style={styles.locTxtStyle} numberOfLines={2} >{capitalizeFirstLetter(userInfo?.user?.address) || 'Location'}</Text>
              <Icon
                type={'feather'}
                name={'chevron-down'}
                size={16}
                color={colors.g2}
                style={{ marginLeft: 5 }}
              />
            </TouchableOpacity>
          </View>
          <Image source={appImages.personPh1} style={styles.phImgStyle} />
        </View>
        <View>
        {top_support_closers?.length > 0 && (
          <Carousel
            ref={carouselRef}
            sliderWidth={scrWidth}
            sliderHeight={scrHeight}
            itemWidth={scrWidth / 1.15}
            data={top_support_closers}
            renderItem={({ item, index }) => renderItem(item, index, (data) => { setSelectedPerson(data); setPersonDetailModal(true) })}
          />
        )}
        </View>
        <View style={styles.menuContainer}>
          <Menu
            visible={showMenu}
            style={styles.menuStyle}
            onRequestClose={() => setShowMenu(false)}>
            {/* <MenuItem
                style={styles.menuItemStyle}
                textStyle={styles.menuTxtStyle}
                onPress={() => hideItemClick()}>
                Hide this ad
              </MenuItem> */}
            <MenuItem
              style={styles.menuItemStyle}
              textStyle={styles.menuTxtStyle}
              onPress={() => seeAllItemClick()}>
              See All
            </MenuItem>
          </Menu>
        </View>
        <View style={styles.paddingView}>
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setSelected('buy')}
              style={styles.tabStyle(selected === 'buy')}>
              <Text style={styles.tabTxtStyle(selected === 'buy')}>
                I Want To Buy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setSelected('matches')}
              style={styles.tabStyle(selected === 'matches')}>
              <Text style={styles.tabTxtStyle(selected === 'matches')}>
                My Matches
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setSelected('sell');
              }}
              style={styles.tabStyle(selected === 'sell')}>
              <Text style={styles.tabTxtStyle(selected === 'sell')}>
                I Want To Sell
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height:WP(2)}} />
        {selected === 'buy' && <BuyTab navigation={navigation} />}
        {selected === 'matches' && <MatchesTab navigation={navigation} />}
        {selected === 'sell' && (
          <SellTab navigation={navigation} />
        )}
        <View style={{ height: PADDING_BOTTOM_FOR_TAB_BAR_SCREENS + HP(5) }} />
      </KeyboardAwareScrollView>
      {
        selected === 'sell' &&
        <View style={styles.bottomView}>
          <AppButton
            width="38.5%"
            height={WP('10.3')}
            title="Enter Address"
            borderColor={colors.p2}
            shadowColor={colors.white}
            textStyle={styles.btnTxtStyle}
            onPress={() => navigation?.navigate('AddAddress', { from: 'enter_address' })}
          />
          <View style={{ width: WP('3') }} />
          <AppButton
            onPress={() => {
              navigation?.navigate('AddPropertyDetails', { from: 'create' });
            }}
            width="38.5%"
            height={WP('10.3')}
            borderColor={colors.p2}
            title="List A New Property"
            textStyle={styles.btnTxtStyle}
          />
        </View>
      }
      {
        selected == 'buy' &&
        <View style={styles.bottomView}>
          <AppButton
            width={'43%'}
            borderColor={colors.p2}
            title="Edit Buyer Preference"
            textStyle={{ fontSize: size.tiny }}
            onPress={() => navigation.navigate('FilterScreen')}
          />
        </View>
      }
      <PersonDetailsModal
        show={personDetailModal}
        onPressHide={() => setPersonDetailModal(false)}
        data={selectedPerson}
      />
    </SafeAreaView>
  );
};

export default Home;
