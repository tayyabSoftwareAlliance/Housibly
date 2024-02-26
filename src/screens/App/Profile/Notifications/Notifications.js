import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Switch, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { AppHeader, BackHeader, Spacer } from '../../../../components';
import { colors, WP } from '../../../../shared/exporter';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notifications = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleSwitch = async () => {
    setIsEnabled(previousState => !previousState);
    await AsyncStorage.setItem('notification_vibration', isEnabled ? 'false' : 'true')
  };

  const getNotificationVibrationValue = async () => {
    const value = await AsyncStorage.getItem('notification_vibration')
    setIsEnabled(value == 'true' ? true : false)
  }

  useEffect(() => {
    getNotificationVibrationValue()
  }, [])

  return (
    <SafeAreaView style={styles.rootContainer}>
      <AppHeader subtitle={'Notifications'} />
      <BackHeader title={'Notifications'} />
      <Spacer androidVal={WP('8.2')} iOSVal={WP('8.2')} />
      <View style={styles.contentContainer}>
        <Text style={styles.descTxtStyle}>
          Control your notifications depending on your preferences.
        </Text>
        <Text style={styles.notifyTxtStyle}>Message Notification</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.rowContainer}
          onPress={() => navigation.navigate('NewMessages')}>
          <Text style={styles.txtStyle}>New Messages</Text>
          <Icon
            type={'entypo'}
            name={'chevron-right'}
            size={22}
            color={colors.b2}
          />
        </TouchableOpacity>
        <Text style={styles.subTxtStyle}>
          If you disable this notification, you will not get notify when someone
          messages you.
        </Text>
        <Text style={styles.notifyTxtStyle}>Vibrations</Text>
        <View style={styles.rowContainer}>
          <Text style={styles.txtStyle}>Enable App Vibrations</Text>
          <Switch
            trackColor={{ false: colors.g1, true: colors.p1 }}
            thumbColor={colors.white}
            ios_backgroundColor={colors.g4}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notifications;
