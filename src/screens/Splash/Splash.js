import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {View, Text, Image, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {appLogos} from '../../shared/theme/assets';
import styles from './styles';

const Splash = ({navigation}) => {
  const {userInfo} = useSelector(state => state?.auth);
  useEffect(() => {
    handleAppEntry();
  }, []);

  const handleAppEntry = async () => {
    const isnotWalkthrough = await AsyncStorage.getItem('walkthrough');
    setTimeout(() => {
      if (isnotWalkthrough) {
        if (userInfo?.user?.auth_token && userInfo?.user?.is_otp_verified) {
          navigation.replace('App');
        } else {
          navigation.replace('Auth');
        }
      } else {
        navigation.replace('Walkthrough');
      }
    }, 2500);
  };

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
