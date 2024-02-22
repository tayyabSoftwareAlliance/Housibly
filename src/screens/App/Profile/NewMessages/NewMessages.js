import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Switch, Alert } from 'react-native';
import { AppHeader, AppLoader, BackHeader, Spacer } from '../../../../components';
import { colors, responseValidator, WP } from '../../../../shared/exporter';
import styles from './styles';
import { app } from '../../../../shared/api';

const NewMessages = ({ navigation }) => {
  const [settings, setSettings] = useState({
    push_notification: true,
    inapp_notification: true,
    email_notification: true
  })
  const [loader, setLoader] = useState(true)

  const getNotificationSettings = async () => {
    try {
      setLoader(true)
      const res = await app.getNotificationSetting()
      if (res.status == 200) {
        setSettings({
          push_notification: res?.data?.push_notification,
          inapp_notification: res?.data?.inapp_notification,
          email_notification: res?.data?.email_notification
        })
      }
    } catch (error) {
      console.log('getNotificationSettings error ', error)
      let msg = responseValidator(error?.response?.status, error?.response?.data);
      Alert.alert('Error', msg)
    } finally {
      setLoader(false)
    }
  }

  const updateNotificationSettings = async (type) => {
    try {
      setLoader(true)
      const formData = new FormData()
      formData.append('user_setting[push_notification]', type == 'push_notification' ? !settings.push_notification : settings.push_notification)
      formData.append('user_setting[inapp_notification]', type == 'inapp_notification' ? !settings.inapp_notification : settings.inapp_notification)
      formData.append('user_setting[email_notification]', type == 'email_notification' ? !settings.email_notification : settings.email_notification)
      const res = await app.updateNotificationSetting(formData)
      if (res.status == 200) {
        setSettings({
          push_notification: res?.data?.push_notification,
          inapp_notification: res?.data?.inapp_notification,
          email_notification: res?.data?.email_notification
        })
      }
    } catch (error) {
      console.log('updataNotificationSettings error ', error)
      let msg = responseValidator(error?.response?.status, error?.response?.data);
      Alert.alert('Error', msg)
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    getNotificationSettings()
  }, [])

  return (
    <SafeAreaView style={styles.rootContainer}>
      <AppHeader subtitle={'New Messages'} />
      <BackHeader title={'New Messages'} />
      <Spacer androidVal={WP('8.2')} iOSVal={WP('8.2')} />
      <View style={styles.contentContainer}>
        <Text style={styles.descTxtStyle}>
          If you disable this notification, you will not get notify when someone
          messages you
        </Text>
        <View style={styles.rowContainer}>
          <Text style={styles.txtStyle}>Push Notifications</Text>
          <Switch
            value={settings.push_notification}
            thumbColor={colors.white}
            ios_backgroundColor={colors.g4}
            onValueChange={() => updateNotificationSettings('push_notification')}
            trackColor={{ false: colors.g1, true: colors.p1 }}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.txtStyle}>In-app Notifications</Text>
          <Switch
            value={settings.inapp_notification}
            thumbColor={colors.white}
            ios_backgroundColor={colors.g4}
            onValueChange={() => updateNotificationSettings('inapp_notification')}
            trackColor={{ false: colors.g1, true: colors.p1 }}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.txtStyle}>Emails</Text>
          <Switch
            value={settings.email_notification}
            thumbColor={colors.white}
            ios_backgroundColor={colors.g4}
            onValueChange={() => updateNotificationSettings('email_notification')}
            trackColor={{ false: colors.g1, true: colors.p1 }}
          />
        </View>
      </View>
      <AppLoader loading={loader} />
    </SafeAreaView>
  );
};

export default NewMessages;
