import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import { AppHeader, BackHeader, Spacer } from '../../../components';
import { WP, filter_bookmarks_list, spacing } from '../../../shared/exporter';
import styles from './styles';
import PropertyList from '../../../components/Custom/PropertyList';
import FilterComponent from '../../../components/Custom/FilterComponent';
import BookmarksList from '../../../components/Custom/BookmarksList';

const bookmarks_data = [
  {
    id: 1,
    title: 'Surban house',
    currency_type: '$USD',
    price: 1000,
    bed_rooms: 2,
    bath_rooms: 3,
    type: 'property'
  },
  {
    id: 2,
    title: 'White house',
    currency_type: '$USD',
    price: 3000,
    bed_rooms: 3,
    bath_rooms: 3,
    type: 'property'
  },
  {
    id: 3,
    title: 'Harden Eusaff',
    company: 'Company xxx',
    profession: 'Home Inspector',
    rating: 5,
    type: 'support_closer'
  },
  {
    id: 4,
    title: 'Surban house',
    currency_type: '$USD',
    price: 2000,
    bed_rooms: 4,
    bath_rooms: 3,
    type: 'property'
  },
  {
    id: 2,
    title: 'White house',
    currency_type: '$USD',
    price: 3000,
    bed_rooms: 3,
    bath_rooms: 3,
    type: 'property'
  },
  {
    id: 3,
    title: 'Harden Eusaff',
    company: 'Company xxx',
    profession: 'Home Inspector',
    rating: 5,
    type: 'support_closer'
  },
  {
    id: 4,
    title: 'Surban house',
    currency_type: '$USD',
    price: 2000,
    bed_rooms: 4,
    bath_rooms: 3,
    type: 'property'
  },
  {
    id: 2,
    title: 'White house',
    currency_type: '$USD',
    price: 3000,
    bed_rooms: 3,
    bath_rooms: 3,
    type: 'property'
  },
  {
    id: 3,
    title: 'Harden Eusaff',
    company: 'Company xxx',
    profession: 'Home Inspector',
    rating: 5,
    type: 'support_closer'
  },
  {
    id: 4,
    title: 'Surban house',
    currency_type: '$USD',
    price: 2000,
    bed_rooms: 4,
    bath_rooms: 3,
    type: 'property'
  },
  {
    id: 2,
    title: 'White house',
    currency_type: '$USD',
    price: 3000,
    bed_rooms: 3,
    bath_rooms: 3,
    type: 'property'
  },
  {
    id: 3,
    title: 'Harden Eusaff',
    company: 'Company xxx',
    profession: 'Home Inspector',
    rating: 5,
    type: 'support_closer'
  },
  {
    id: 4,
    title: 'Surban house',
    currency_type: '$USD',
    price: 2000,
    bed_rooms: 4,
    bath_rooms: 3,
    type: 'property'
  }
]

const Bookmarks = () => {

  const [filterType, setFilterType] = useState(filter_bookmarks_list[0]);
  const [bookmarks, setBookmarks] = useState(bookmarks_data);

  useEffect(() => {
    //for filters
    if (filterType.key == filter_bookmarks_list[0].key) //for all
      setBookmarks(bookmarks_data)
    else //for others filters
      setBookmarks(bookmarks_data.filter(item => filterType.key == item.type))
  }, [filterType])

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={spacing.my2}>
        <BackHeader subtitle={'Bookmarks'} hideBackButton={true} />
      </View>
      <Text style={styles.titleTxtStyle}>Recent</Text>
      <FilterComponent list={filter_bookmarks_list} selected={filterType} setSelected={setFilterType} />
      <BookmarksList data={bookmarks} />
    </SafeAreaView>
  );
};

export default Bookmarks;
