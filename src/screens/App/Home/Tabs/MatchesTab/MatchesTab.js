import React from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { appIcons, property_image } from '../../../../../shared/exporter';
import styles from './styles';
import { AppLoader } from '../../../../../components';
import { useSelector } from 'react-redux';

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
          <View style={styles.txtContainer}>
            <Text style={styles.newTxtStyle}>New</Text>
          </View>
        </View>
        <View style={styles.simpleRow}>
          <Text style={styles.smallTxtStyle}>
            {`${item?.currency_type} ${item?.price || 0} | `}
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
        <View style={[styles.simpleRow, { paddingTop: 0 }]}>
          <Image source={appIcons.heartIcon} style={styles.heartIconStyle} />
          <Text style={styles.heartTxtStyle}>100% match</Text>
        </View>
        <Text style={styles.timeTxtStyle}>Last active: 1 day ago</Text>
      </View>
    </TouchableOpacity>
  );
};

const MatchesTab = ({ navigation }) => {

  const { matched_properties, loading } = useSelector(state => state?.appReducer)

  return (
    <View style={styles.paddingView}>
      <View style={styles.rowContainer}>
        <Text style={styles.titleTxtStyle}>Property Matches</Text>
        <Text
          style={styles.viewAllTxtStyle}
          onPress={() => navigation.navigate('AllMatches')}>
          View All
        </Text>
      </View>
      <FlatList
        data={matched_properties.data.slice(0, 5)}
        renderItem={({ item, index }) => renderItem(item, index, navigation)}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
      <AppLoader loading={!(matched_properties.data.length > 0) && loading} />
    </View>
  );
};

export default MatchesTab;
