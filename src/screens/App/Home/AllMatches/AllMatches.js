import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {AppButton, BackHeader} from '../../../../components';
import {Menu, MenuItem} from 'react-native-material-menu';
import {appIcons, colors, family, size, WP} from '../../../../shared/exporter';
import {allMatches} from '../../../../shared/utilities/constant';
import styles from './styles';

const AllMatches = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [filterType, setFilterType] = useState('All');

  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.itemContainer}>
        <Image source={item?.img} style={styles.imgStyle} />
        <View style={{paddingVertical: 5}}>
          <View style={styles.innerRow}>
            <Text numberOfLines={1} style={styles.nameTxtStyle}>
              {item?.name}
            </Text>
            {item?.isNew && (
              <View style={styles.txtContainer}>
                <Text style={styles.newTxtStyle}>New</Text>
              </View>
            )}
          </View>
          <View style={styles.simpleRow}>
            <Text style={styles.smallTxtStyle}>$25,000 | </Text>
            <Image
              resizeMode="contain"
              source={appIcons.bedIcon}
              style={styles.bedIconStyle}
            />
            <Text style={styles.smallTxtStyle}>4</Text>
            <Image source={appIcons.bathIcon} style={styles.bathIconStyle} />
            <Text resizeMode="contain" style={styles.smallTxtStyle}>
              3.5
            </Text>
          </View>
          <View style={[styles.simpleRow, {paddingTop: 0}]}>
            <Image source={appIcons.heartIcon} style={styles.heartIconStyle} />
            <Text style={styles.heartTxtStyle}>90% match</Text>
          </View>
          <Text style={styles.timeTxtStyle}>Last active: 1 day ago</Text>
        </View>
      </View>
    );
  };

  const hideItemClick = type => {
    setFilterType(type);
    setShowMenu(false);
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <BackHeader
        title="My Matches"
        txtCenter
        txtSize={size.xsmall}
        txtFamily={family.Gilroy_SemiBold}
      />
      <Text style={styles.titleTxtStyle}>Recent</Text>
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
      </View>
      <FlatList
        data={allMatches}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flStyle}
      />
      <View style={styles.bottomView}>
        <AppButton
          width="34.5%"
          height={WP('10.3')}
          title="View On Map"
          borderColor={colors.p2}
          textStyle={styles.tabTxtStyle}
        />
      </View>
    </SafeAreaView>
  );
};

export default AllMatches;
