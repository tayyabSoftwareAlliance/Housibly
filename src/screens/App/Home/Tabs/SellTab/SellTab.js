import React from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import {
  appIcons,
  appImages,
  PADDING_BOTTOM_FOR_TAB_BAR_SCREENS,
  property_image,
  WP,
} from '../../../../../shared/exporter';
import styles from './styles';
import { AppLoader, BlankField } from '../../../../../components';
import { useSelector } from 'react-redux';

const SellTab = ({ navigation }) => {

  const { all_properties, loading } = useSelector(state => state?.appReducer);

  const RenderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation?.navigate('PropertyDetails', { item: item });
        }}
        style={styles.itemContainer}>
        <Image
          source={{ uri: item?.images?.[0]?.url, property_image }}
          style={styles.imgStyle}
        />
        <View style={{ paddingVertical: 5 }}>
          <View style={styles.innerRow}>
            <Text numberOfLines={1} style={styles.nameTxtStyle}>
              {item?.title}
            </Text>
            <View style={styles.txtContainer}>
              <Text style={styles.newTxtStyle}>{2}</Text>
            </View>
          </View>
          <View style={styles.simpleRow}>
            <Text style={styles.smallTxtStyle}>
              {`$${item?.price || 0}`} |{' '}
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
            {[1, 2, 3, 4, 5, 6, 7]?.map((item, index) => {
              return (
                index < 4 && (
                  <Image
                    source={appImages.personPh}
                    style={styles.personImgStyle(index)}
                  />
                )
              );
            })}
            {[1, 2, 3, 4, 5, 6].length > 4 && (
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
  return (
    <View style={styles.paddingView}>
      <View style={styles.rowContainer}>
        <Text style={styles.titleTxtStyle}>Recent</Text>
        <Text
          style={styles.viewAllTxtStyle}
          onPress={() => navigation.navigate('AllSales')}>
          View All
        </Text>
      </View>
      {all_properties?.length > 0 ? (
        <View>
          {
            all_properties.slice(0, 5).map((item, index) => {
              return (
                <RenderItem key={item?.id} item={item} index={index} />
              )
            })
          }
        </View>
      ) : (
        <BlankField title={'No Property Available'} />
      )}
      <AppLoader loading={!(all_properties?.length > 0) && loading} />
    </View>
  );
};

export default SellTab;
