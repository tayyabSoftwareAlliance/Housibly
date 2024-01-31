import { ActivityIndicator, Alert, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppButton, BackHeader } from '../../../components';
import { WP, colors, family, filter_property_type_list, responseValidator, size } from '../../../shared/exporter';
import styles from './styles';
import StarRating from 'react-native-star-rating';
import Review from '../../../components/Custom/Review';
import FilterComponent from '../../../components/Custom/FilterComponent';
import ReviewsFilterComponent from '../../../components/Custom/ReviewsFilterComponent';
import { app } from '../../../shared/api';
import { useIsFocused } from '@react-navigation/native'

let page = 1;

const Reviews = ({ navigation, route }) => {

  const { id, full_name, avatar, from } = route.params
  const [selectedFilter, setSelectedFilter] = useState(0)
  const [loader, setLoader] = useState(false)
  const [refreshLoader, setRefreshLoader] = useState(false)
  const [count, setCount] = useState(0)
  const [reviews, setReviews] = useState([])
  const isFocused = useIsFocused()

  const fetchData = async (from) => {
    if (loader || refreshLoader) return
    if (from == 'refresh' || from == 'useEffect') page = 1
    from == 'refresh' ? setRefreshLoader(true) : setLoader(true)
    console.log('formmmm', page)
    try {
      const res = await app.getSupportCloserReviews(id, selectedFilter || 'all', page)
      console.log('resss ', JSON.stringify(res.data, null, 2))
      if (res?.status == 200 && res?.data?.reviews?.length > 0) {
        setCount(res.data?.count || 0)
        if (page == 1)
          setReviews(res.data?.reviews)
        else
          setReviews(prev => [...prev, ...res.data?.reviews])
        page++
      }
    } catch (error) {
      console.log('error', error)
      let msg = responseValidator(error?.response?.status, error?.response?.data);
      Alert.alert('Error', msg || 'Something went wrong!');
    } finally {
      from == 'refresh' ? setRefreshLoader(false) : setLoader(false)
    }
  }

  useEffect(() => {
    isFocused && fetchData('useEffect')
  }, [selectedFilter, isFocused])

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
          <Text style={styles.title} >Your Reviews ({count})</Text>
          <ReviewsFilterComponent selected={selectedFilter} setSelected={setSelectedFilter} />
        </View>
        <FlatList
          data={reviews}
          keyExtractor={(_, index) => index}
          showsVerticalScrollIndicator={false}
          refreshing={refreshLoader}
          onRefresh={() => fetchData('refresh')}
          onEndReached={() => fetchData()}
          // onEndReachedThreshold={0.5}
          renderItem={({ item, index }) => (
            <Review data={item} containerStyle={index == 0 && { marginTop: 0 }} />
          )}
          ListFooterComponent={
            <View style={styles.footerComponent} >
              {!refreshLoader && loader && <ActivityIndicator size={WP(6)} color={colors.bl1} />}
            </View>
          }
          contentContainerStyle={from != 'SUPPORT_CLOSER_HOME' && { marginBottom: WP(20) }}
        />
        {from != 'SUPPORT_CLOSER_HOME' &&
          <View style={styles.bottomView}>
            <AppButton
              width="38.5%"
              height={WP('10.3')}
              title="Add Review"
              borderColor={colors.p2}
              shadowColor={colors.white}
              textStyle={styles.btnTxtStyle}
              onPress={() => navigation.navigate('AddReview', { id, full_name, avatar })}
            />
          </View>
        }
      </View>
    </SafeAreaView>
  )
}

export default Reviews