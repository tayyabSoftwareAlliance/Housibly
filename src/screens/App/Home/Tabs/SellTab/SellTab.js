import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { AppLoader, BlankField } from '../../../../../components';
import { useSelector } from 'react-redux';
import PropertyList from '../../../../../components/Custom/PropertyList';

const SellTab = ({ navigation }) => {

  const { all_properties, loading } = useSelector(state => state?.appReducer);

  return (
    <View>
      <View style={styles.rowContainer}>
        <Text style={styles.titleTxtStyle}>Recent</Text>
        <Text
          style={styles.viewAllTxtStyle}
          onPress={() => navigation.navigate('AllSales')}>
          View All
        </Text>
      </View>
      {all_properties?.length > 0 ? (
        <PropertyList data={all_properties?.slice(0, 5)} />
      ) : (
        <BlankField title={'No Property Available'} />
      )}
      <AppLoader loading={!(all_properties?.length > 0) && loading} />
    </View>
  );
};

export default SellTab