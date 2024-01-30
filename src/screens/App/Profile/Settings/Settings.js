import React from 'react';
import { SafeAreaView, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import { AppButton, AppHeader, BackHeader, Spacer } from '../../../../components';
import { colors, settings, WP } from '../../../../shared/exporter';
import styles from './styles';
import { useDispatch } from 'react-redux';
import { Icon } from 'react-native-elements';
import { logoutRequset } from '../../../../redux/actions';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/routers';

const Settings = ({ navigation }) => {
  const dispatch = useDispatch(null);

  const logout = async () => {
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
      {settings?.map(item => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate(item.screen)}
            style={styles.rowContainer}>
            <View style={styles.innerRow}>
              <Image
                resizeMode="contain"
                source={item.icon}
                style={styles.iconStyle}
              />
              <Text style={styles.txtStyle}>{item.title}</Text>
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
