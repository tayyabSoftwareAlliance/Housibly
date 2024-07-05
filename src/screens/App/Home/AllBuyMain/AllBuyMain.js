import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { AppButton, AppLoader, BackHeader } from '../../../../components';
import { Menu, MenuItem } from 'react-native-material-menu';
import { appIcons, colors, family, size, WP } from '../../../../shared/exporter';
import { allMatches, property_image } from '../../../../shared/utilities/constant';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { get_matched_properties } from '../../../../redux/actions/app-actions/app-actions';
import { ActivityIndicator } from 'react-native';
import PropertyComponent from '../../../../components/Custom/PropertyComponent';

const AllBuyMain = ({ navigation }) => {

  const dispatch = useDispatch()
  const { matched_properties, loading } = useSelector(state => state?.appReducer)
  const [refreshLoader, setRefreshLoader] = useState(false)
  // const [showMenu, setShowMenu] = useState(false);
  // const [filterType, setFilterType] = useState('All');

  // const hideItemClick = type => {
  //   setFilterType(type);
  //   setShowMenu(false);
  // };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <BackHeader
        title="My Matches"
        txtCenter
        txtSize={size.xsmall}
        txtFamily={family.Gilroy_SemiBold}
      />
      <Text style={styles.titleTxtStyle}>Recent</Text>
      {/* <TouchableOpacity
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
          style={{marginLeft: 5}}
        />
      </TouchableOpacity>
      <View style={styles.menuContainer}>
        <Menu
          visible={showMenu}
          style={styles.menuStyle}
          onRequestClose={() => setShowMenu(false)}>
          <MenuItem
            style={styles.menuItemStyle}
            textStyle={styles.menuTxtStyle}
            onPress={() => hideItemClick('Home')}>
            <View style={styles.menuItemRow}>
              <Image
                resizeMode="contain"
                source={appIcons.modelHome}
                style={styles.modelIconStyle}
              />
              <Text>Home</Text>
            </View>
          </MenuItem>
          <View style={styles.dividerView} />
          <MenuItem
            style={styles.menuItemStyle}
            textStyle={styles.menuTxtStyle}
            onPress={() => hideItemClick('Condo')}>
            <View style={styles.menuItemRow}>
              <Image
                resizeMode="contain"
                source={appIcons.condo}
                style={styles.modelIconStyle}
              />
              <Text>Condo</Text>
            </View>
          </MenuItem>
          <View style={styles.dividerView} />
          <MenuItem
            style={styles.menuItemStyle}
            textStyle={styles.menuTxtStyle}
            onPress={() => hideItemClick('Vacant Land')}>
            <View style={styles.menuItemRow}>
              <Image
                resizeMode="contain"
                source={appIcons.vacant}
                style={styles.modelIconStyle}
              />
              <Text>Vacant Land</Text>
            </View>
          </MenuItem>
        </Menu>
      </View> */}
      {matched_properties.data.length > 0 &&
        <FlatList
          data={matched_properties.data}
          renderItem={({ item }) => <PropertyComponent item={item} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flStyle}
          refreshing={refreshLoader}
          onRefresh={() => {
            if (!loading) {
              const onFinally = () => setRefreshLoader(false)
              setRefreshLoader(true)
              dispatch(get_matched_properties(1, onFinally))
            }
          }}
          onEndReached={() => {
            if (!loading)
              dispatch(get_matched_properties(matched_properties.lastPage + 1))
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            <View style={styles.footerComponent} >
              {!refreshLoader && loading && <ActivityIndicator size={WP(6)} color={colors.bl1} />}
            </View>
          }
        />
      }
      <View style={styles.bottomView}>
        <AppButton
          width="34.5%"
          height={WP('10.3')}
          title="View On Map"
          borderColor={colors.p2}
          textStyle={styles.tabTxtStyle}
        />
      </View>
      <AppLoader loading={!(matched_properties.data.length > 0) && loading} />
    </SafeAreaView>
  );
};

export default AllBuyMain;
