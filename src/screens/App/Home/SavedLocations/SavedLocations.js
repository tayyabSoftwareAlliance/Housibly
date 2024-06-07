import React, { useEffect, useMemo, useState } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { AppLoader, BackHeader } from '../../../../components';
import { appIcons, colors, family, responseValidator, size, WP } from '../../../../shared/exporter';
import { filter_property_type_list, months, property_image } from '../../../../shared/utilities/constant';
import styles from './styles';
import FilterComponent from '../../../../components/Custom/FilterComponent';
import { app } from '../../../../shared/api';
import { useIsFocused } from '@react-navigation/native'

const renderDate = (date) => {
  date = new Date(date)
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}

const renderItem = (item, index, navigation, deleteLocation) => {

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.itemContainer}
      onPress={() => {
        navigation.navigate('MapScreen', { savedLocation: item, from: 'savedLocation' })
      }}>
      <View style={{ paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text numberOfLines={1} style={[styles.nameTxtStyle, { textTransform: 'capitalize' }]}>{item?.title}</Text>
          <Text numberOfLines={1} style={[styles.smallTxtStyle, { paddingTop: 13, paddingBottom: 6 }]}>{item?.display_address || 'N/A'}</Text>
          <Text numberOfLines={1} style={styles.timeTxtStyle}>Saved Last {renderDate(item?.updated_at)}</Text>
        </View>
        <TouchableOpacity style={{ padding: WP(2) }} onPress={() => deleteLocation(item?.id)}>
          <Image source={require('../../../../assets/icons/delete.png')} style={{ height: WP(4), width: WP(4) }} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const SavedLocations = ({ navigation }) => {

  const [data, setData] = useState([])
  const [loader, setLoader] = useState(true)
  const isFocused = useIsFocused()

  const fetchSavedLocations = async () => {
    try {
      setLoader(true)
      const res = await app.getSavedLocations();
      if (res?.status == 200) {
        setData(res.data || [])
      } else {
        Alert.alert('Failed to Save Location!')
      }
    } catch (error) {
      console.log(error.response);
      let msg = responseValidator(error?.response?.status, error?.response?.data);
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    isFocused && fetchSavedLocations()
  }, [isFocused])

  const deleteLocation = async (id) => {
    try {
      setLoader(true)
      const res = await app.deleteSavedLocation(id);
      if (res?.status == 200) {
        setData(data.filter(item => item.id != id))
      } else {
        Alert.alert('Failed to Delete Location!')
      }
    } catch (error) {
      console.log(error.response);
      let msg = responseValidator(error?.response?.status, error?.response?.data);
      Alert.alert(msg || 'Failed to Delete Location!')
    } finally {
      setLoader(false)
    }
  }

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
      {data.length > 0 ?
        <FlatList
          data={data}
          renderItem={({ item, index }) => renderItem(item, index, navigation, deleteLocation)}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flStyle}
        /> :
        !loader ?
          <View style={styles.noDataContainer} >
            <Text style={styles.noData} >No Saved Locations</Text>
          </View> : null
      }
      <AppLoader loading={loader} />
    </SafeAreaView>
  )
}

export default SavedLocations