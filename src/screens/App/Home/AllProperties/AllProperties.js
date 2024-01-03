import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { BackHeader } from '../../../../components';
import { appIcons, colors, family, size, WP } from '../../../../shared/exporter';
import { filter_property_type_list, property_image } from '../../../../shared/utilities/constant';
import styles from './styles';
import FilterComponent from '../../../../components/Custom/FilterComponent';

const renderItem = (item, index, navigation) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.itemContainer}
      onPress={() => navigation.navigate('PropertyDetail', { propertyData: item })}>
      <Image source={{ uri: item?.images?.[0]?.url || property_image }} style={styles.imgStyle} />
      <View style={{ paddingVertical: 5 }}>
        <View style={styles.innerRow}>
          <Text numberOfLines={1} style={styles.nameTxtStyle}>
            {item?.title}
          </Text>
          {/* <View style={styles.txtContainer}>
            <Text style={styles.newTxtStyle}>New</Text>
          </View> */}
        </View>
        <View style={styles.simpleRow}>
          <Text style={styles.smallTxtStyle}>
            {`${item?.currency_type} ${item?.price || 0} ${item?.property_type != 'vacant_land' ? '| ' : ''}`}
          </Text>
          {item?.property_type != 'vacant_land' &&
            <>
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
            </>
          }
        </View>
        {/* <View style={[styles.simpleRow, { paddingTop: 0 }]}>
          <Image source={appIcons.heartIcon} style={styles.heartIconStyle} />
          <Text style={styles.heartTxtStyle}>100% match</Text>
        </View> */}
        <Text style={styles.timeTxtStyle}>Last active: 1 day ago</Text>
      </View>
    </TouchableOpacity>
  );
};

const AllProperties = ({ navigation, route }) => {

  const propertiesData = route.params?.properties || []
  const [filterType, setFilterType] = useState(filter_property_type_list[0]);
  const [properties, setProperties] = useState(propertiesData || []);

  useEffect(() => {
    //for filters
    if (filterType.key == filter_property_type_list[0].key) //for all
      setProperties(propertiesData)
    else //for others filters
      setProperties(propertiesData.filter(item => filterType.key == item.property_type))
  }, [filterType])

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle={'dark-content'}
      />
      <BackHeader
        title="All Properties"
        txtCenter
        txtSize={size.xsmall}
        txtFamily={family.Gilroy_SemiBold}
      />
      <Text style={styles.titleTxtStyle}>Lists</Text>
      <FilterComponent list={filter_property_type_list} selected={filterType} setSelected={setFilterType} />
      {properties.length > 0 &&
        <FlatList
          data={properties}
          renderItem={({ item, index }) => renderItem(item, index, navigation)}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flStyle}
        />
      }
    </SafeAreaView>
  )
}

export default AllProperties