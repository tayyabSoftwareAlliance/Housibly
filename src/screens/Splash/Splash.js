import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { appLogos } from '../../shared/theme/assets';
import styles from './styles';

const Splash = ({ navigation }) => {
  const { userInfo } = useSelector(state => state?.auth);

  const handleAppEntry = async () => {
    const isnotWalkthrough = await AsyncStorage.getItem('walkthrough');
    setTimeout(() => {
      if (isnotWalkthrough) {
        if (userInfo?.user?.auth_token && (userInfo.user.is_otp_verified || userInfo.user.login_type == "social_login") && userInfo.user.profile_complete) {
          navigation.replace('App');
        } else if (userInfo?.user) {
          if (!userInfo?.user?.is_otp_verified && userInfo?.user?.login_type != "social_login") {
            navigation?.replace('Auth', { screen: 'VerifyOTP', params: { email: userInfo?.user?.email_address, registeration: true } });
          } else {
            if (userInfo.user.login_type == "social_login") {
              navigation.replace('Auth', { screen: 'SignUpPurpose', params: { login_type: 'social_login' } })
            } else {
              if (userInfo?.user?.profile_type == 'support_closer')
                navigation.replace('Auth', { screen: 'AddSupportInfo', params: { profile_complete: true } })
              else
                navigation.replace('Auth', { screen: 'AddPersonalInfo', params: { profile_complete: true } })
            }
          }
        } else {
          navigation.replace('Auth');
        }
      } else {
        navigation.replace('Walkthrough');
      }
    }, 2500);
  };

  useEffect(() => {
    handleAppEntry();
  }, []);

  return (
    <View style={styles.rootContainer}>
      <StatusBar
        translucent={true}
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />
      <Image
        resizeMode="contain"
        source={appLogos.appLogo}
        style={styles.logoStyle}
      />
      <Text style={styles.logoTxtStyle}>Housibly</Text>
    </View>
  );
};

export default Splash;
