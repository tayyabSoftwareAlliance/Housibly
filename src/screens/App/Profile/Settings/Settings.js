import React from 'react';
import { SafeAreaView, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import { AppButton, AppHeader, BackHeader, Spacer } from '../../../../components';
import { colors, HP, settings, WP } from '../../../../shared/exporter';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import { logoutRequset } from '../../../../redux/actions';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/routers';
import { auth } from '../../../../shared/api';
import { ScrollView } from 'react-native';

const Settings = ({ navigation }) => {
  const dispatch = useDispatch(null);
  const { userInfo } = useSelector(state => state?.auth);

  const logout = async () => {
    const formData = new FormData()
    formData.append('mobile_device_token', userInfo?.user?.mobile_device_token)
    auth.logoutUser(formData);
    dispatch(
      logoutRequset(null, () => {
        GoogleSignin.signOut();
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'Auth' }],
          }),
        );
      }),
    );
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle={'dark-content'}
      />
      <AppHeader subtitle={'Settings'} />
      <BackHeader title={'Settings'} />
      <Spacer androidVal={WP('12')} iOSVal={WP('12')} />
      <ScrollView showsVerticalScrollIndicator={false} >
        {settings.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={() => item.onPress ? item.onPress() : navigation.navigate(item.screen)}
              style={styles.rowContainer}>
              <View style={styles.innerRow}>
                <Image
                  resizeMode="contain"
                  source={item.icon}
                  style={styles.iconStyle}
                />
                <Text style={[styles.txtStyle, item.textColor && { color: item.textColor }]}>{item.title}</Text>
              </View>
              <Icon
                name={'right'}
                type={'antdesign'}
                size={20}
                color={colors.g35}
              />
            </TouchableOpacity>
          );
        })}
        <View style={{ height: HP(15) }} />
      </ScrollView>
      <View style={styles.bottomView}>
        <AppButton
          bgColor={colors.r3}
          borderColor={colors.r3}
          shadowColor={colors.white}
          title={'Logout'}
          onPress={() => logout()}
          textColor={colors.r1}
        />
      </View>
    </SafeAreaView>
  );
};

export default Settings;
