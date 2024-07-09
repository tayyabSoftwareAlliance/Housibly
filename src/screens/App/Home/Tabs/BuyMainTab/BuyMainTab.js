import React from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useSelector } from 'react-redux';
import PropertyComponent from '../../../../../components/Custom/PropertyComponent';
import { useNavigation } from '@react-navigation/native';
import NoData from '../../../../../components/NoData/NoData';
import LoadingText from '../../../../../components/LoadingText/LoadingText';

const BuyMainTab = () => {

  const { buy_properties, buy_properties_loading } = useSelector(state => state?.appReducer)
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
      {buy_properties.data.length > 0 ?
        <FlatList
          data={buy_properties.data.slice(0, 5)}
          renderItem={({ item, index }) => <PropertyComponent item={item} containerStyle={{ paddingHorizontal: 0 }} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        /> :
        buy_properties_loading ?
          <LoadingText /> :
          <NoData />
      }
    </View>
  );
};

export default BuyMainTab;
