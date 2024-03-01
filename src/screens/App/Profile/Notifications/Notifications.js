import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Switch, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { AppHeader, AppLoader, BackHeader, Spacer } from '../../../../components';
import { colors, WP } from '../../../../shared/exporter';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { update_user_setting_request } from '../../../../redux/actions/auth-actions/auth-action';

const Notifications = ({ navigation }) => {

  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state?.auth);
  const [vibration, setVibration] = useState(true);
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    setVibration(userInfo?.user?.vibration)
  }, [userInfo])

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
            value={vibration}
            onValueChange={() => {
              setVibration(!vibration)
              setLoader(true)
              const formData = new FormData()
              formData.append('user_setting[vibration]', !vibration)
              const onFailure = (msg) => {
                setPushNotificationToggle(vibration)
                Alert.alert('Error', msg || 'Something went wrong!')
              }
              const onFinally = () => {
                setLoader(false)
              }
              dispatch(update_user_setting_request(formData, onFailure, onFinally))
            }}
            trackColor={{ false: colors.g1, true: colors.p1 }}
            thumbColor={colors.white}
            ios_backgroundColor={colors.g4}
          />
        </View>
      </View>
      <AppLoader loading={loader} />
    </SafeAreaView>
  );
};

export default Notifications;
