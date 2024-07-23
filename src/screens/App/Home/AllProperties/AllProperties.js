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
import PropertyComponent from '../../../../components/Custom/PropertyComponent';

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
      <Text style={styles.titleTxtStyle}>Listing</Text>
      <FilterComponent list={filter_property_type_list} selected={filterType} setSelected={setFilterType} />
      {properties.length > 0 &&
        <FlatList
          data={properties}
          renderItem={({ item, index }) => <PropertyComponent item={item} hidePercentage />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flStyle}
        />
      }
    </SafeAreaView>
  )
}

export default AllProperties