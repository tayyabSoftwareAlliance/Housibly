import React, { useState, useLayoutEffect, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/core';
import { Spacer, BackHeader, AppLoader } from '../../../../components';
import { Menu, MenuItem } from 'react-native-material-menu';
import { appIcons, appLogos, colors, family, responseValidator, size, WP } from '../../../../shared/exporter';
import {
  condoMatches,
  landMatches,
  propertyMatches,
  property_image,
} from '../../../../shared/utilities/constant';
import styles from './styles';
import { app } from '../../../../shared/api';
import { formatNumber } from '../../../../shared/utilities/helper';

const PotentialBuyers = ({ navigation, route }) => {

  const { item } = route.params
  const property_type = item?.property_type
  const isFocus = useIsFocused();
  const [masterData, setMasterData] = useState([]);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false)
  const [showMenu, setShowMenu] = useState(false);
  // const [matchFilter, setMatchFilter] = useState('Match');
  const [filterType, setFilterType] = useState('Newest First');
  // const [showMatchMenu, setShowMatchMenu] = useState(false);

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
  }, [isFocus]);

  // useLayoutEffect(() => {
  //   let type = item?.type;
  //   if (type === 'House') {
  //     setData(propertyMatches);
  //   } else if (type === 'Condo') {
  //     setData(condoMatches);
  //   } else {
  //     setData(landMatches);
  //   }
  // }, []);

  const getPotentialBuyers = async () => {
    try {
      setLoader(true)
      const res = await app.getPotentialBuyers(item?.id)
      console.log('ressssss', res.data)
      if (res?.status == 200) {
        setMasterData(res.data || [])
        setData(res.data || [])
      }
    } catch (error) {
      console.log('getPotentialBuyers error ', error)
      let msg = responseValidator(error?.response?.status, error?.response?.data);
      Alert.alert('Error', msg || 'Something went wrong!');
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    getPotentialBuyers()
  }, [])

  useEffect(() => {
    if (filterType == 'Top Matches') {
      const array = JSON.parse(JSON.stringify(masterData)).sort((a, b) => b.match_percentage - a.match_percentage)
      setData(array)
    } else {
      setData(masterData)
    }
  }, [filterType])

  const RenderDetails = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.detailsContainer}
        onPress={() => navigation.navigate('PropertyDetail', { propertyData: item, id: item?.id })}>
        <Image
          source={{ uri: item?.images?.[0]?.url || property_image }}
          style={styles.imgStyle}
        />
        <View>
          <Text numberOfLines={2} style={styles.nameTxtStyle}>
            {item?.title || ''}
          </Text>
          <View style={styles.simpleRow}>
            <Text style={styles.smallTxtStyle}>
              {`$${item?.price}`} |{' '}
            </Text>
            <Image
              resizeMode="contain"
              source={appIcons.bedIcon}
              style={styles.bedIconStyle}
            />
            <Text style={styles.smallTxtStyle}>
              {item?.bed_rooms || 0}
            </Text>
            <Image source={appIcons.bathIcon} style={styles.bathIconStyle} />
            <Text resizeMode="contain" style={styles.smallTxtStyle}>
              {item?.bath_rooms || 0}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const hideItemClick = type => {
    setFilterType(type);
    setShowMenu(false);
  };

  // const hideMatchClick = type => {
  //   setMatchFilter(type);
  //   setShowMatchMenu(false);
  // };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.itemContainer}
        onPress={() =>
          navigation.navigate('PersonDetails', {
            item: item,
            property_type,
          })
        }>
        <View style={styles.innerRow}>
          <Image source={{ uri: item?.user?.avatar }} style={styles.itemImgStyle} />
          <View style={styles.contentContainer}>
            <Text numberOfLines={1} style={styles.nameStyle}>{item?.user?.full_name || 'N/A'}</Text>
            <Text numberOfLines={2} style={styles.txtStyle}>
              Budget: <Text style={styles.spanTxtStyle}>${formatNumber(item?.price?.value?.min) || 0}</Text> to{' '}
              <Text style={styles.spanTxtStyle}>{item?.price?.value?.max ? `$${formatNumber(item.price.value.max)}` : 'any'}</Text>
            </Text>
            <View style={styles.iconRow}>
              <Icon
                name={'heart'}
                type={'antdesign'}
                size={10}
                color={colors.r2}
              />
              <Text style={styles.matchTxtStyle}> {Number(item?.match_percentage).toFixed(0)}% match</Text>
            </View>
          </View>
        </View>
        <Image source={appLogos.roundLogo} style={styles.matchImgStyle} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar backgroundColor={colors.white} />
      <BackHeader
        title="Potential Buyers"
        txtCenter
        txtSize={size.xsmall}
        txtFamily={family.Gilroy_SemiBold}
      />
      <RenderDetails />
      <View style={styles.container}>
        <Text style={styles.titleTxtStyle}>Recent</Text>
        <View style={styles.menuesContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.typeRow}
            onPress={() => setShowMenu(true)}>
            <Image source={appIcons.blueHome} style={styles.homeIconStyle} />
            <Text style={styles.homeTxtStyle}>{filterType}</Text>
            <Icon
              type={'feather'}
              name={showMenu ? 'chevron-up' : 'chevron-down'}
              size={16}
              color={colors.g2}
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            activeOpacity={0.7}
            style={styles.typeRow}
            onPress={() => setShowMatchMenu(true)}>
            <Image source={appIcons.blueHome} style={styles.homeIconStyle} />
            <Text style={styles.homeTxtStyle}>{matchFilter}</Text>
            <Icon
              type={'feather'}
              name={showMatchMenu ? 'chevron-up' : 'chevron-down'}
              size={16}
              color={colors.g2}
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity> */}
        </View>
        <View style={styles.menuContainer}>
          <Menu
            visible={showMenu}
            style={styles.menuStyle}
            onRequestClose={() => setShowMenu(false)}>
            <MenuItem
              style={styles.menuItemStyle}
              textStyle={styles.menuTxtStyle}
              onPress={() => hideItemClick('Top Matches')}>
              <Text>Top Matches</Text>
            </MenuItem>
            <MenuItem
              style={styles.menuItemStyle}
              textStyle={styles.menuTxtStyle}
              onPress={() => hideItemClick('Newest First')}>
              <Text>Newest First</Text>
            </MenuItem>
          </Menu>
        </View>
        {/* <View style={styles.menuContainer1}>
          <Menu
            visible={showMatchMenu}
            style={styles.menuStyle1}
            onRequestClose={() => setShowMatchMenu(false)}>
            <MenuItem
              style={styles.menuItemStyle}
              textStyle={styles.menuTxtStyle}
              onPress={() => hideMatchClick('Match')}>
              <Text>Match</Text>
            </MenuItem>
            <MenuItem
              style={styles.menuItemStyle}
              textStyle={styles.menuTxtStyle}
              onPress={() => hideMatchClick('Draw Map')}>
              <Text>Draw Map</Text>
            </MenuItem>
            <MenuItem
              style={styles.menuItemStyle}
              textStyle={styles.menuTxtStyle}
              onPress={() => hideMatchClick('Dream Address')}>
              <Text>Dream Address</Text>
            </MenuItem>
          </Menu>
        </View> */}
        {data.length > 0 ?
          <FlatList
            data={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item + index.toString()}
          /> :
          <View style={styles.noDataContainer} >
            <Text style={styles.noData} >No Buyers Found Yet!</Text>
          </View>
        }
      </View>
      <AppLoader loading={loader} />
    </SafeAreaView>
  );
};

export default PotentialBuyers;
