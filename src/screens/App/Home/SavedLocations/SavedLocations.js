import React, { useEffect, useMemo, useState } from 'react';
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
import { filter_property_type_list, months, property_image } from '../../../../shared/utilities/constant';
import styles from './styles';
import FilterComponent from '../../../../components/Custom/FilterComponent';

const SavedLocationsData = [
  {
    id: 1,
    title: 'Dream Address',
    address: "abc",
    createdAt: new Date()
  },
  {
    id: 2,
    title: 'Dream Address 2',
    address: "abc",
    createdAt: new Date()
  }
]

const renderDate = (date) => {
  date = new Date(date)
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}

const renderItem = (item, index) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.itemContainer}
      onPress={() => { }}>
      <View style={{ paddingVertical: 5 }}>
          <Text numberOfLines={1} style={styles.nameTxtStyle}>{item?.title}</Text>
        <Text numberOfLines={1} style={[styles.smallTxtStyle, { paddingTop: 13, paddingBottom: 6 }]}>{item?.address}</Text>
        <Text numberOfLines={1} style={styles.timeTxtStyle}>Saved Last {renderDate(item?.createdAt)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SavedLocations = ({ navigation }) => {

  const [data, setData] = useState(SavedLocationsData)

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle={'dark-content'}
      />
      <BackHeader
        title="Saved Location"
        txtCenter
        txtSize={size.xsmall}
        txtFamily={family.Gilroy_SemiBold}
      />
      <Text style={styles.titleTxtStyle}>Saved Lists</Text>
      {data.length > 0 &&
        <FlatList
          data={data}
          renderItem={({ item, index }) => renderItem(item, index, navigation)}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flStyle}
        />
      }
    </SafeAreaView>
  )
}

export default SavedLocations