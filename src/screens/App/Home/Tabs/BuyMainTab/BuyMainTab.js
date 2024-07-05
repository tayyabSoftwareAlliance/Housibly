import React from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { appIcons, property_image } from '../../../../../shared/exporter';
import styles from './styles';
import { AppLoader } from '../../../../../components';
import { useSelector } from 'react-redux';
import PropertyComponent from '../../../../../components/Custom/PropertyComponent';
import { useNavigation } from '@react-navigation/native';

const BuyMainTab = () => {

  const { matched_properties, loading } = useSelector(state => state?.appReducer)
  const navigation = useNavigation()

  return (
    <View>
        <View style={styles.rowContainer}>
          <Text style={styles.titleTxtStyle}>Recent</Text>
          <Text
            style={styles.viewAllTxtStyle}
            onPress={() => navigation.navigate('AllBuyMain')}>
            View All
          </Text>
        </View>
      <FlatList
        data={[matched_properties.data[0],matched_properties.data[0],matched_properties.data[0],matched_properties.data[0],matched_properties.data[0],matched_properties.data[0],matched_properties.data[0],matched_properties.data[0],matched_properties.data[0],matched_properties.data[0]]}
        renderItem={({ item, index }) => <PropertyComponent item={item} containerStyle={{paddingHorizontal:0}} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
      <AppLoader loading={!(matched_properties.data.length > 0) && loading} />
    </View>
  );
};

export default BuyMainTab;
