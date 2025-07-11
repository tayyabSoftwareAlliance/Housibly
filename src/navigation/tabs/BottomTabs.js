import React, { useEffect } from 'react';
import { View, Image, Platform, StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { appIcons, BOTTOM_TAB_HEIGHT, colors, WP } from '../../shared/exporter';

import HomeStack from '../stacks/HomeStack';
import SearchStack from '../stacks/SearchStack';
import { useDispatch, useSelector } from 'react-redux'
import { getSublists } from '../../redux/actions';
import HomeSupportCloserStack from '../stacks/HomeSupportCloserStack';
import MessagesAndNotificationStack from '../stacks/MessagesAndNotificationStack';
import BookmarksStack from '../stacks/BookmarksStack';
import SupportCloserChats from '../../screens/App/SupportCloserChats';
import SupportCloserNotifications from '../../screens/App/SupportCloserNotifications';

const Tab = createBottomTabNavigator();

export default BottomTabs = ({ }) => {

  const { userInfo } = useSelector(state => state?.auth);
  let hasNotch = DeviceInfo.hasNotch();
  const dispatch = useDispatch()

  useEffect(() => {
    userInfo && dispatch(getSublists())
  }, [])

  return userInfo && (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          android: styles.barStyle,
          ios: hasNotch ? styles.notchBarStyle : styles.barStyle,
        }),
        borderTopColor: 'transparent',
        shadowColor: 'transparent',
        borderTopWidth: 0,
        elevation: 0,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: "flex"
          },
          null
        ]
      }}

      // tabBarOptions={{
      //   showLabel: false,
      // }}

      initialRouteName={'Home'}>
      {userInfo?.user?.profile_type == 'support_closer' ?
        <>
          <Tab.Screen
            name="Home"
            component={HomeSupportCloserStack}
            options={{
              tabBarIcon: ({ focused }) => (
                <>
                  <Image
                    resizeMode="contain"
                    source={appIcons.homeIcon}
                    style={styles.iconStyle(focused)}
                  />
                  <View style={styles.barViewStyle(focused)} />
                </>
              ),
            }}
          />
          <Tab.Screen
            name="SupportCloserChats"
            component={SupportCloserChats}
            options={{
              tabBarIcon: ({ focused }) => (
                <>
                  <Image
                    resizeMode="contain"
                    source={appIcons.messageIcon}
                    style={styles.iconStyle(focused)}
                  />
                  <View style={styles.barViewStyle(focused)} />
                </>
              ),
            }}
          />
          <Tab.Screen
            name="SupportCloserNotifications"
            component={SupportCloserNotifications}
            options={{
              tabBarIcon: ({ focused }) => (
                <>
                  <Image
                    resizeMode="contain"
                    source={appIcons.notify}
                    style={styles.iconStyle(focused)}
                  />
                  <View style={styles.barViewStyle(focused)} />
                </>
              ),
            }}
          />
        </> :
        <>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarIcon: ({ focused }) => (
                <>
                  <Image
                    resizeMode="contain"
                    source={appIcons.homeIcon}
                    style={styles.iconStyle(focused)}
                  />
                  <View style={styles.barViewStyle(focused)} />
                </>
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchStack}
            options={{
              tabBarIcon: ({ focused }) => (
                <>
                  <Image
                    resizeMode="contain"
                    source={appIcons.searchIcon}
                    style={styles.iconStyle(focused)}
                  />
                  <View style={styles.barViewStyle(focused)} />
                </>
              ),
            }}
          />
          <Tab.Screen
            name="Bookmarks"
            component={BookmarksStack}
            options={{
              tabBarIcon: ({ focused }) => (
                <>
                  <Image
                    resizeMode="contain"
                    source={appIcons.bookmarksIcon}
                    style={styles.bookmarksIconStyle(focused)}
                  />
                  <View style={styles.barViewStyle(focused)} />
                </>
              ),
            }}
          />
          <Tab.Screen
            name="MessagesAndNotification"
            component={MessagesAndNotificationStack}
            options={{
              tabBarIcon: ({ focused }) => (
                <>
                  <Image
                    resizeMode="contain"
                    source={appIcons.messageIcon}
                    style={styles.iconStyle(focused)}
                  />
                  <View style={styles.barViewStyle(focused)} />
                </>
              ),
            }}
          />
        </>
      }
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  barStyle: {
    height: BOTTOM_TAB_HEIGHT,
    borderTopWidth: 0,
    position: 'absolute',
    paddingHorizontal: 5,
    backgroundColor: colors.white,
  },
  notchBarStyle: {
    paddingTop: 20,
    borderTopWidth: 0,
    height: WP('20.5'),
    paddingHorizontal: 5,
    backgroundColor: colors.white,
  },
  iconStyle: isFocused => {
    return {
      width: 24,
      height: 24,
      tintColor: isFocused ? colors.p2 : colors.g13,
    };
  },
  bookmarksIconStyle: isFocused => {
    return {
      width: 21,
      height: 24,
      tintColor: isFocused ? colors.p2 : colors.g13,
    };
  },
  barViewStyle: isFocused => {
    return {
      width: 14,
      height: 3,
      marginTop: 6,
      borderRadius: 1.5,
      backgroundColor: isFocused ? colors.p1 : colors.white,
    };
  },
});
