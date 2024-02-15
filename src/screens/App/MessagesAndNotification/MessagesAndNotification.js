import React, { useEffect, useMemo, useState } from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import { AppHeader, Spacer } from '../../../components';
import { WP, colors } from '../../../shared/exporter';
import styles from './styles';
import { TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import AllChats from '../AllChats';
import Notifications from '../Notifications';
import { useSelector } from 'react-redux'

const MessagesAndNotification = () => {

  const [selectedTab, setSelectedTab] = useState('messages')
  const topTabLineAnimatedValue = useSharedValue(0)
  const { all_notifications } = useSelector(state => state?.notification);

  useEffect(() => {
    if (selectedTab == 'messages')
      topTabLineAnimatedValue.value = withTiming(0)
    else
      topTabLineAnimatedValue.value = withTiming(WP(50))
  }, [selectedTab])

  const topTabLineAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: topTabLineAnimatedValue.value }]
  }))

  const unSeenNotificationCount = useMemo(() => {
    const count = all_notifications?.filter(item => !item.seen)?.length || 0
    return count > 99 ? '99+' : count
  }, [all_notifications])

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.topTabContainer} >
        <TouchableOpacity style={styles.topTabTxtContainer} onPress={() => setSelectedTab('messages')}>
          <Text style={[styles.topTabTxt, selectedTab == 'messages' && { color: colors.b1 }]} >
            Messages
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topTabTxtContainer} onPress={() => setSelectedTab('notifications')}>
          <Text style={[styles.topTabTxt, selectedTab == 'notifications' && { color: colors.b1 }]} >
            Notifications
          </Text>
          <View style={styles.badge} >
            <Text style={styles.badgeTxt}>{unSeenNotificationCount}</Text>
          </View>
        </TouchableOpacity>
        <Animated.View style={[styles.topTabLine, topTabLineAnimatedStyle]} />
      </View>
      {selectedTab == 'messages' && <AllChats />}
      {selectedTab == 'notifications' && <Notifications />}
    </SafeAreaView>
  );
};

export default MessagesAndNotification