import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { PADDING_BOTTOM_FOR_TAB_BAR_SCREENS, WP, appIcons, appImages } from '../../../shared/exporter';
import styles from './styles';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useNavigation } from '@react-navigation/native'
import { ChatPopupModal } from '../../../components/Modal/ChatPopupModal';

const AllNotificationsData = [
  {
    id: 1,
    title: 'Someone messages you',
    body: 'Davis Vaccaro messaged you, check doing well at hr rjf rfirf rif',
    image: appImages.avatar,
    time: '3 min ago'
  },
  {
    id: 2,
    title: 'Someone searched your location',
    body: 'Cheyenne Dias searched the address 2118 Thor check doing well at hr rjf rfirf rif',
    image: appImages.avatar,
    time: '5 min ago'
  }
]

const renderItem = (item, index, navigation) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.itemContainer}
      onPress={() => {}}>
      <Image
        source={item?.image}
        style={styles.imgStyle}
      />
      <View>
        <Text style={styles.notificationTitle} numberOfLines={1}>{item?.title}</Text>
        <Text style={styles.notificationBody} numberOfLines={1}>{item?.body}</Text>
        <Text style={styles.notificationTime} numberOfLines={1}>{item?.time}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Notifications = () => {

  const navigation = useNavigation()

  return (
      <FlatList
        data={AllNotificationsData}
        renderItem={({ item, index }) => renderItem(item, index, navigation)}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: WP(3) }}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{ height: PADDING_BOTTOM_FOR_TAB_BAR_SCREENS }}
      />
  );
};

export default Notifications