import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { BackHeader, DeleteModal, AppLoader } from '../../../../components';
import {
  appIcons,
  appImages,
  family,
  size,
  WP,
  property_image,
  PADDING_BOTTOM_FOR_TAB_BAR_SCREENS,
} from '../../../../shared/exporter';
import { filter_property_type_list } from '../../../../shared/utilities/constant';
import styles from './styles';
import { useSelector } from 'react-redux';
import FilterComponent from '../../../../components/Custom/FilterComponent';

const AllSales = ({ navigation }) => {

  const { all_properties, loading } = useSelector(state => state.appReducer)

  const [item, setItem] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [filterType, setFilterType] = useState(filter_property_type_list[0]);
  const [properties, setProperties] = useState(all_properties || []);

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

  const onEdit = (data, rowMap) => {
    closeRow(rowMap, data?.index)
    navigation.navigate('AddPropertyDetails', { propertyData: data?.item, from: 'edit' });
  }

  // if any change occurs in redux against all_properties
  useEffect(() => {
    //for filters
    if (filterType.key == filter_property_type_list[0].key) //for all
      setProperties(all_properties)
    else //for others filters
      setProperties(all_properties.filter(item => filterType.key == item.property_type))
  }, [all_properties, filterType])

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.itemContainer}
        onPress={() => navigation.navigate('PotentialBuyers', { item })}>
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

  const renderHiddenItem = (data, rowMap) => {
    return (
      <View style={styles.backBtnsContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.backLeftBtn, styles.backLeftBtnLeft]}
          onPress={() => onEdit(data, rowMap)}>
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
          onPress={() => onEdit(data, rowMap)}>
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

  return (
    <SafeAreaView style={styles.rootContainer}>
      <BackHeader
        title="My Property Lists"
        txtCenter
        txtSize={size.xsmall}
        txtFamily={family.Gilroy_SemiBold}
      />
      <Text style={styles.titleTxtStyle}>Recent</Text>
      <FilterComponent list={filter_property_type_list} selected={filterType} setSelected={setFilterType} />
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
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{ height: PADDING_BOTTOM_FOR_TAB_BAR_SCREENS }}
      />
      <DeleteModal
        item={item}
        show={showModal}
        onPressHide={() => setShowModal(false)}
      />
      <AppLoader loading={!(all_properties?.length > 0) && loading} />
    </SafeAreaView>
  );
};

export default AllSales;
