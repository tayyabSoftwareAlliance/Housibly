import React from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { appIcons, property_image } from '../../../../../shared/exporter';
import styles from './styles';
import { AppLoader } from '../../../../../components';
import { useSelector } from 'react-redux';
import PropertyComponent from '../../../../../components/Custom/PropertyComponent';

const MatchesTab = ({ navigation }) => {

  const { matched_properties, loading } = useSelector(state => state?.appReducer)

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
      <FlatList
        data={matched_properties.data.slice(0, 5)}
        renderItem={({ item, index }) => <PropertyComponent item={item} type={'not_my_property'} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
      <AppLoader loading={!(matched_properties.data.length > 0) && loading} />
    </View>
  );
};

export default MatchesTab;
