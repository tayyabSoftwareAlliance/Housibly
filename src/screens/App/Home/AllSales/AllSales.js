import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Spacer, BackHeader, DeleteModal } from '../../../../components';
import { Menu, MenuItem } from 'react-native-material-menu';
import {
  appIcons,
  appImages,
  checkConnected,
  colors,
  family,
  size,
  WP,
  networkText,
  property_image,
  responseValidator,
} from '../../../../shared/exporter';
import { allSales } from '../../../../shared/utilities/constant';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/core';
import {
  get_all_properties,
  get_filtered_properties,
} from '../../../../redux/actions';
import { app } from '../../../../shared/api';

const AllSales = ({ navigation }) => {
  const [item, setItem] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const [properties, setProperties] = useState([]);
  const dispatch = useDispatch();

  //Get Properties
  useEffect(() => {
    if (isFocused) {
      getAllProperties();
    }
  }, [isFocused]);

  //Get All Properties
  const getAllProperties = async () => {
    const check = await checkConnected();
    if (check) {
      try {
        setLoading(true);
        const res = await app.getMyProperties()
        if (res?.status == 200) {
          setProperties(res?.data || [])
        }
      }
      catch (error) {
        let msg = responseValidator(error?.response?.status, error?.response?.data);
        Alert.alert('Error', msg || 'Something went wrong!');
      }
      finally {
        setLoading(false)
      }
    } else {
      setLoading(false);
      Alert.alert('Error', networkText);
    }
  };

  //Get Filtered Properties
  const getFilteredProperties = async type => {
    const check = await checkConnected();
    if (check) {
      try {
        setLoading(true);
        const onSuccess = res => {
          setProperties(res);
          setLoading(false);
          setShowMenu(false);
          console.log('On Filter prop Success', res);
        };
        const onFailure = res => {
          setLoading(false);
          setShowMenu(false);
          Alert.alert('Error', res);
          console.log('On Filter prop Failure', res);
        };
        var form = new FormData();
        form.append(
          'type',
          type == 'Vacant Land' ? 'vacant_land' : type.toLowerCase(),
        );

        dispatch(get_filtered_properties(form, onSuccess, onFailure));
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setLoading(false);
      Alert.alert('Error', networkText);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.itemContainer}
        onPress={() => navigation.navigate('PropertyDetails', { item: item })}>
        <Image
          source={{ uri: item?.images?.[0]?.url || property_image }}
          style={styles.imgStyle}
        />
        <View style={{ paddingVertical: 5 }}>
          <View style={styles.innerRow}>
            <Text numberOfLines={1} style={styles.nameTxtStyle}>
              {item?.title}
            </Text>
            <View style={styles.txtContainer}>
              <Text style={styles.newTxtStyle}>{properties.length}</Text>
            </View>
          </View>
          <View style={styles.simpleRow}>
            <Text style={styles.smallTxtStyle}>
              {`${item?.currency_type} ${item?.price || 0}`} |{' '}
            </Text>
            <Image
              resizeMode="contain"
              source={appIcons.bedIcon}
              style={styles.bedIconStyle}
            />
            <Text style={styles.smallTxtStyle}>{item?.bed_rooms || 0}</Text>
            <Image source={appIcons.bathIcon} style={styles.bathIconStyle} />
            <Text resizeMode="contain" style={styles.smallTxtStyle}>
              {item?.bath_rooms || 0}
            </Text>
          </View>
          <View style={[styles.simpleRow, { paddingTop: 2 }]}>
            {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
              return (
                index < 4 && (
                  <Image
                    source={appImages.personPh}
                    style={styles.personImgStyle(index)}
                  />
                )
              );
            })}
            {[1, 2, 3, 4, 5, 6, 7].length > 4 && (
              <View style={styles.countContainer}>
                <Text style={styles.countTxtStyle}>
                  +{[1, 2, 3, 4, 5, 6]?.length - 4}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const closeRow = (map, key) => {
    map && map[key] && map[key].closeRow();
  };

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const handleDelete = data => {
    setItem(data?.item);
    setTimeout(() => {
      setShowModal(true);
    }, 300);
  };

  const renderHiddenItem = (data, rowMap) => {
    return (
      <View style={styles.backBtnsContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.backLeftBtn, styles.backLeftBtnLeft]}
          onPress={() => closeRow(rowMap, data?.index)}>
          <Image
            resizeMode="contain"
            source={appIcons.editIcon}
            style={styles.iconStyle}
          />
          <Text style={styles.editBtnTxtStyle}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.backLeftBtn, styles.backLeftBtnRight]}
          onPress={() => closeRow(rowMap, data?.index)}>
          <Image
            resizeMode="contain"
            source={appIcons.markedIcon}
            style={styles.iconStyle}
          />
          <Text style={styles.btnTxtStyle}>Mark as Sold</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={() => closeRow(rowMap, data?.index)}>
          <Image
            resizeMode="contain"
            source={appIcons.editIcon}
            style={styles.iconStyle}
          />
          <Text style={styles.editBtnTxtStyle}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => {
            closeRow(rowMap, data?.index);
            handleDelete(data);
          }}>
          <Image
            resizeMode="contain"
            source={appIcons.delIcon}
            style={styles.iconStyle}
          />
          <Text style={styles.btnTxtStyle}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const hideItemClick = type => {
    setFilterType(type);
    getFilteredProperties(type);
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <BackHeader
        title="My Property Lists"
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
          style={{ marginLeft: 5 }}
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
            onPress={() => hideItemClick('House')}>
            <View style={styles.menuItemRow}>
              <Image
                resizeMode="contain"
                source={appIcons.modelHome}
                style={styles.modelIconStyle}
              />
              <Text style={styles.menuTxtStyle}>House</Text>
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
                source={appIcons.condoStyle}
                style={styles.modelIconStyle}
              />
              <Text style={styles.menuTxtStyle}>Condo</Text>
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
              <Text style={styles.menuTxtStyle}>Vacant Land</Text>
            </View>
          </MenuItem>
        </Menu>
      </View>
      <View style={styles.container}>
        <SwipeListView
          useFlatList
          data={properties}
          // data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          // disableLeftSwipe={true}
          // disableRightSwipe={true}
          renderItem={renderItem}
          renderHiddenItem={(data, rowMap) => renderHiddenItem(data, rowMap)}
          leftOpenValue={180}
          rightOpenValue={-180}
          // previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          closeOnScroll
          onRowDidOpen={onRowDidOpen}
          onRowOpen={(rowKey, rowMap) => {
            let key = rowKey;
            if (key === rowKey) return;
            setTimeout(() => {
              rowMap[rowKey].closeRow();
            }, 2000);
          }}
          // closeOnRowPress
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <DeleteModal
        item={item}
        show={showModal}
        onPressHide={() => setShowModal(false)}
      />
    </SafeAreaView>
  );
};

export default AllSales;
