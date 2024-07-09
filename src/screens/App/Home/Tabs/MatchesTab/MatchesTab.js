import React from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useSelector } from 'react-redux';
import PropertyComponent from '../../../../../components/Custom/PropertyComponent';
import LoadingText from '../../../../../components/LoadingText/LoadingText';
import NoData from '../../../../../components/NoData/NoData';

const MatchesTab = ({ navigation }) => {

  const { matched_properties, matched_properties_loading } = useSelector(state => state?.appReducer)

  return (
    <View>
      <View style={styles.paddingView}>
        <View style={styles.rowContainer}>
          <Text style={styles.titleTxtStyle}>Property Matches</Text>
          <Text
            style={styles.viewAllTxtStyle}
            onPress={() => navigation.navigate('AllMatches')}>
            View All
          </Text>
        </View>
      </View>
      {matched_properties.data.length > 0 ?
        <FlatList
          data={matched_properties.data.slice(0, 5)}
          renderItem={({ item, index }) => <PropertyComponent item={item} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        /> :
        matched_properties_loading ?
          <LoadingText /> :
          <NoData />
      }
    </View>
  );
};

export default MatchesTab;
