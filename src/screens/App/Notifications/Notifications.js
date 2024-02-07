import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { PADDING_BOTTOM_FOR_TAB_BAR_SCREENS, WP, appIcons, appImages } from '../../../shared/exporter';
import styles from './styles';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useNavigation } from '@react-navigation/native'
import { ChatPopupModal } from '../../../components/Modal/ChatPopupModal';
import { useDispatch, useSelector } from 'react-redux'
import { AppLoader } from '../../../components';
import moment from 'moment';
import { navigateFromNotifi } from '../../../shared/utilities/notifications';

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
      onPress={() => navigateFromNotifi(item)}>
      <Image
        source={{uri:item.data?.sender_avatar}}
        style={styles.imgStyle}
      />
      <View>
        <Text style={styles.notificationTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.notificationBody} numberOfLines={1}>{item.body}</Text>
        <Text style={styles.notificationTime} numberOfLines={1}>{moment(item.time).fromNow()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Notifications = () => {

  const navigation = useNavigation()
  const { loading, all_notifications } = useSelector(state => state?.notification);

  return (
    <>
      <FlatList
        data={all_notifications}
        renderItem={({ item, index }) => renderItem(item, index, navigation)}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: WP(3) }}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{ height: PADDING_BOTTOM_FOR_TAB_BAR_SCREENS }}
      />
      <AppLoader loading={!(all_notifications.length > 0) && loading} />
    </>
  );
};

export default Notifications