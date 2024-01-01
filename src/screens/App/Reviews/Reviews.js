import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { BackHeader } from '../../../components';
import { colors, family, filter_property_type_list, size } from '../../../shared/exporter';
import styles from './styles';
import StarRating from 'react-native-star-rating';
import Review from '../../../components/Custom/Review';
import FilterComponent from '../../../components/Custom/FilterComponent';
import ReviewsFilterComponent from '../../../components/Custom/ReviewsFilterComponent';

const Reviews = () => {

  const [selectedFilter,setSelectedFilter] = useState(0)

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar
        translucent={false}
        backgroundColor={'#EFF8FC'}
        barStyle={'dark-content'}
      />
      <BackHeader
        title="Reviews"
        txtCenter
        txtSize={size.xsmall}
        txtFamily={family.Gilroy_SemiBold}
      />
      <View style={styles.contentContainer} >
        <View style={styles.titleContainer} >
          <Text style={styles.title} >Your Reviews (43)</Text>
          <ReviewsFilterComponent selected={selectedFilter} setSelected={setSelectedFilter} />
        </View>
        <FlatList
          data={[
            {
              title: 'Hanna Torff',
              review: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint Amet minim mollit non dest ullamco est sit aliqua dolor do amet sint Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.'
            },
            {
              title: 'Hanna Torff',
              review: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.'
            },
            {
              title: 'Hanna Torff',
              review: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.'
            },
          ]}
          keyExtractor={(_, index) => index}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Review data={item} containerStyle={index == 0 && { marginTop: 0 }} />
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default Reviews