import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, View, Alert } from 'react-native';
import { AppHeader, AppLoader, BackHeader, Spacer } from '../../../components';
import { WP, colors, family, filter_bookmarks_list, responseValidator, spacing } from '../../../shared/exporter';
import styles from './styles';
import PropertyList from '../../../components/Custom/PropertyList';
import FilterComponent from '../../../components/Custom/FilterComponent';
import BookmarksList from '../../../components/Custom/BookmarksList';
import { app } from '../../../shared/api';
import { useIsFocused } from '@react-navigation/native';

const Bookmarks = () => {

  const [filterType, setFilterType] = useState(filter_bookmarks_list[0]);
  const [bookmarksMasterData, setBookmarksMasterData] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loader, setLoader] = useState(false)
  const isFocused = useIsFocused()

  const getBookmarks = async () => {
    try {
      setLoader(true)
      const res = await app.getBookmarks()
      if (res?.status == 200) {
        console.log(JSON.stringify(res.data, null, 2))
        setBookmarksMasterData(res?.data?.filter(item => item?.bookmark_type == 'property_bookmark') || [])
        setBookmarks(res?.data?.filter(item => item?.bookmark_type == 'property_bookmark') || [])
      }
    } catch (error) {
      console.log('getBookmarks error ', error)
      let msg = responseValidator(error?.response?.status, error?.response?.data);
      Alert.alert('Error', msg || 'Something went wrong!');
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    //for filters
    if (filterType.key == filter_bookmarks_list[0].key) //for all
      setBookmarks(bookmarksMasterData)
    else //for others filters
      setBookmarks(bookmarksMasterData.filter(item => filterType.key == item.bookmark_type))
  }, [filterType])

  useEffect(() => {
    if (isFocused) {
      setFilterType(filter_bookmarks_list[0])
      getBookmarks()
    }
  }, [isFocused])

  const onRemovePress = async (id) => {
    try {
      setLoader(true)
      let res;
      res = await app.deleteBookmark(id)
      if (res?.status == 200) {
        setBookmarksMasterData(prev => prev.filter(item => item?.id != id))
        setBookmarks(prev => prev.filter(item => item?.id != id))
      }
    } catch (error) {
      console.log('getPropertyDetail error ', error)
      let msg = responseValidator(error?.response?.status, error?.response?.data);
      Alert.alert('Error', msg || 'Something went wrong!');
    } finally {
      setLoader(false)
    }
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={spacing.my2}>
        <BackHeader subtitle={'Bookmarks'} hideBackButton={true} />
      </View>
      <Text style={styles.titleTxtStyle}>Recent</Text>
      <FilterComponent list={filter_bookmarks_list} selected={filterType} setSelected={setFilterType} />
      {bookmarks?.length > 0 ?
        <BookmarksList data={bookmarks} onRemovePress={onRemovePress} /> :
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <Text style={{ color: colors.g19, fontFamily: family.Gilroy_Medium }} >No Data Found Yet!</Text>
        </View>
      }
      <AppLoader loading={loader} />
    </SafeAreaView>
  );
};

export default Bookmarks;
