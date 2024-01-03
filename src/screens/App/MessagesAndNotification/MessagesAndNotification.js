import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import { AppHeader, Spacer } from '../../../components';
import { WP, colors } from '../../../shared/exporter';
import styles from './styles';
import { TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import AllMessages from '../AllMessages';

const MessagesAndNotification = () => {

  const [selectedTab, setSelectedTab] = useState('messages')
  const topTabLineAnimatedValue = useSharedValue(0)

  useEffect(() => {
    if(selectedTab == 'messages')
      topTabLineAnimatedValue.value = withTiming(0)
    else
    topTabLineAnimatedValue.value = withTiming(WP(50))
  },[selectedTab])

  const topTabLineAnimatedStyle=useAnimatedStyle(() => ({
    transform:[{translateX:topTabLineAnimatedValue.value}]
  })) 

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
        </TouchableOpacity>
        <Animated.View style={[styles.topTabLine,topTabLineAnimatedStyle]} />
      </View>
      {selectedTab == 'messages' && <AllMessages/>}
    </SafeAreaView>
  );
};

export default MessagesAndNotification