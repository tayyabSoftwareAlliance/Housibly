import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { PADDING_BOTTOM_FOR_TAB_BAR_SCREENS, WP, appIcons, appImages, capitalizeFirstLetter } from '../../../shared/exporter';
import styles from './styles';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { AppLoader } from '../../../components';
import moment from 'moment';
import { navigateFromNotifi } from '../../../shared/utilities/notifications';
import { showNotification } from '../../../components/Modal/PropertySuggestionInAppNotification';
import { seen_notification } from '../../../redux/actions/notification-actions/notification-actions';
import { app } from '../../../shared/api';

const renderItem = (item, index, onPress) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.itemContainer}
      onPress={() => onPress(item)}>
      <Image
        source={{ uri: item.image }}
        style={styles.imgStyle}
      />
      <View>
        <Text style={styles.notificationTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.notificationBody} numberOfLines={2}>{capitalizeFirstLetter(item.body)}</Text>
        <Text style={styles.notificationTime} numberOfLines={1}>{moment(item.time).fromNow()}</Text>
      </View>
    </TouchableOpacity >
  );
};

const Notifications = () => {

  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { loading, all_notifications } = useSelector(state => state?.notification);
  const isFocused = useIsFocused()

  const notificationSeen = () => {
    dispatch(seen_notification())
    app.notificationSeen()
      .then((res) => {
        console.log('Seen notification success', res);
      })
      .catch((error) => {
        console.log('Seen notification error', error);
      })
  }

  useEffect(() => {
    isFocused && notificationSeen()
  }, [isFocused])

  const onNotificationPress = (item) => {
    notificationSeen(item.id)
    {
      if (item.type == 'buy_property' || item.type == 'sell_property') {
        showNotification(item)
      } else
        navigateFromNotifi(item)
    }
  }

  return (
    <>
      <FlatList
        data={all_notifications}
        renderItem={({ item, index }) => renderItem(item, index, onNotificationPress)}
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