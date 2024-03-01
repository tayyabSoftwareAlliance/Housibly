import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Switch, Alert } from 'react-native';
import { AppHeader, AppLoader, BackHeader, Spacer } from '../../../../components';
import { colors, WP } from '../../../../shared/exporter';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { update_user_setting_request } from '../../../../redux/actions/auth-actions/auth-action';

const NewMessages = ({ navigation }) => {

  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state?.auth);
  const [pushNotificationToggle, setPushNotificationToggle] = useState(true)
  const [inAppNotificationToggle, setInAppNotificationToggle] = useState(true)
  const [emailToggle, setEmailToggle] = useState(true)
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    setPushNotificationToggle(userInfo?.user?.push_notification)
    setInAppNotificationToggle(userInfo?.user?.inapp_notification)
    setEmailToggle(userInfo?.user?.email_notification)
  }, [userInfo])

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
            value={pushNotificationToggle}
            thumbColor={colors.white}
            ios_backgroundColor={colors.g4}
            onValueChange={() => {
              setPushNotificationToggle(!pushNotificationToggle)
              setLoader(true)
              const formData = new FormData()
              formData.append('user_setting[push_notification]', !pushNotificationToggle)
              const onFailure = (msg) => {
                setPushNotificationToggle(pushNotificationToggle)
                Alert.alert('Error', msg || 'Something went wrong!')
              }
              const onFinally = () => {
                setLoader(false)
              }
              dispatch(update_user_setting_request(formData, onFailure, onFinally))
            }}
            trackColor={{ false: colors.g1, true: colors.p1 }}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.txtStyle}>In-app Notifications</Text>
          <Switch
            value={inAppNotificationToggle}
            thumbColor={colors.white}
            ios_backgroundColor={colors.g4}
            onValueChange={() => {
              setInAppNotificationToggle(!inAppNotificationToggle)
              setLoader(true)
              const formData = new FormData()
              formData.append('user_setting[inapp_notification]', !inAppNotificationToggle)
              const onFailure = (msg) => {
                setInAppNotificationToggle(inAppNotificationToggle)
                Alert.alert('Error', msg || 'Something went wrong!')
              }
              const onFinally = () => {
                setLoader(false)
              }
              dispatch(update_user_setting_request(formData, onFailure, onFinally))
            }}
            trackColor={{ false: colors.g1, true: colors.p1 }}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.txtStyle}>Emails</Text>
          <Switch
            value={emailToggle}
            thumbColor={colors.white}
            ios_backgroundColor={colors.g4}
            onValueChange={() => {
              setEmailToggle(!emailToggle)
              setLoader(true)
              const formData = new FormData()
              formData.append('user_setting[email_notification]', !emailToggle)
              const onFailure = (msg) => {
                setEmailToggle(emailToggle)
                Alert.alert('Error', msg || 'Something went wrong!')
              }
              const onFinally = () => {
                setLoader(false)
              }
              dispatch(update_user_setting_request(formData, onFailure, onFinally))
            }}
            trackColor={{ false: colors.g1, true: colors.p1 }}
          />
        </View>
      </View>
      <AppLoader loading={loader} />
    </SafeAreaView>
  );
};

export default NewMessages;
