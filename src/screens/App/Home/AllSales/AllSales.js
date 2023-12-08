import React, { useEffect, useState } from 'react';
import {
  Text,
  SafeAreaView,
} from 'react-native';
import { BackHeader, AppLoader } from '../../../../components';
import {
  family,
  size,
} from '../../../../shared/exporter';
import { filter_property_type_list } from '../../../../shared/utilities/constant';
import styles from './styles';
import { useSelector } from 'react-redux';
import FilterComponent from '../../../../components/Custom/FilterComponent';
import PropertyList from '../../../../components/Custom/PropertyList';

const AllSales = ({ navigation }) => {

  const { all_properties, loading } = useSelector(state => state.appReducer)

  const [filterType, setFilterType] = useState(filter_property_type_list[0]);
  const [properties, setProperties] = useState(all_properties || []);

  // if any change occurs in redux against all_properties
  useEffect(() => {
    //for filters
    if (filterType.key == filter_property_type_list[0].key) //for all
      setProperties(all_properties)
    else //for others filters
      setProperties(all_properties.filter(item => filterType.key == item.property_type))
  }, [all_properties, filterType])

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
      <PropertyList data={properties} />
      <AppLoader loading={!(all_properties?.length > 0) && loading} />
    </SafeAreaView>
  );
};

export default AllSales