import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Walkthrough from '../screens/Walkthrough';
import AuthStack from '../navigation/stacks/AuthStack';
import BottomTabs from '../navigation/tabs/BottomTabs';
import FilterScreen from '../screens/App/FilterScreen';
import SubFilterScreen from '../screens/App/SubFilterScreen';
import Profile from '../screens/App/Profile';
import EditProfile from '../screens/App/EditProfile';
import Settings from '../screens/App/Profile/Settings';
import Notifications from '../screens/App/Profile/Notifications';
import NewMessages from '../screens/App/Profile/NewMessages';
import Terms from '../screens/App/Profile/Terms';
import PrivacyPolicy from '../screens/App/Profile/PrivacyPolicy';
import Support from '../screens/App/Profile/Support';
import SupportQuery from '../screens/App/Profile/SupportQuery';
import SupportChat from '../screens/App/Profile/SupportChat';
import FAQ from '../screens/App/Profile/FAQ';
import MapScreen from '../screens/App/Home/MapScreen';
import AddPropertyDetails from '../screens/App/Home/AddPropertyDetails';
// import PayMethod from '../screens/App/Profile/PayMethod';
import AllCards from '../screens/App/Profile/AllCards';
import CardDetails from '../screens/App/Profile/CardDetails';
import AddCard from '../screens/App/Payment/AddCard';
import EditCard from '../screens/App/Payment/EditCard';
import AddMorePropertyDetail from '../screens/App/Home/AddMorePropertyDetail';
import AddPropertyDes from '../screens/App/Home/AddPropertyDes';
import PropertyDetail from '../screens/App/Home/PropertyDetail';
import AddAddress from '../screens/App/Home/AddAddress';
import Video from '../screens/App/Video';
import AddRoom from '../screens/App/Home/AddRoom';
import { useDispatch, useSelector } from 'react-redux'
import { app, setAuthToken } from '../shared/api';
import Reviews from '../screens/App/Reviews';
// import BoostProfile from '../screens/App/BoostProfile';
// import BoostProfileDetail from '../screens/App/BoostProfile/BoostProfileDetail';
import AllProperties from '../screens/App/Home/AllProperties';
import PersonChat from '../screens/App/PersonChat';
import SavedLocations from '../screens/App/Home/SavedLocations';
import SearchSupportCloser from '../screens/App/SearchSupportCloser';
import SupportCloserDetail from '../screens/App/SupportCloserDetail';
import AddReview from '../screens/App/AddReview';
import BlockedList from '../screens/App/Profile/BlockedList';
import linking from '../shared/utilities/linking';
import messaging from '@react-native-firebase/messaging';
import { navigateFromNotifi, notificationFormater } from '../shared/utilities/notifications';
import Toast from 'react-native-toast-message';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { add_notification, seen_notification } from '../redux/actions/notification-actions/notification-actions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HP } from '../shared/exporter';
import { set_in_app_notification_to_show } from '../redux/actions/app-actions/app-actions';
import DeleteAccount from '../screens/App/Profile/DeleteAccount';

const AppStack = createNativeStackNavigator();

const MainAppNav = () => {

  const { userInfo } = useSelector(state => state?.auth);
  const { conversation_opened_id, showed_in_app_notification } = useSelector(state => state?.appReducer)
  const dispatch = useDispatch()
  const { top } = useSafeAreaInsets()

  const addToRedux = (notification) => {
    if (notification.type == 'buy_property' || notification.type == 'sell_property' || notification.type == 'message')
      dispatch(add_notification(notification))
  }

  const onMessageCallback = async remoteMessage => {
    console.log('on message remoteMessage', JSON.stringify(remoteMessage, null, 2))
    const notification = notificationFormater(remoteMessage)
    console.log('notificationnnnnnn', JSON.stringify(notification, null, 2))
    addToRedux(notification)
    if (notification.type == 'buy_property' || notification.type == 'sell_property') {
      !showed_in_app_notification && dispatch(set_in_app_notification_to_show(notification))
    } else {
      if (notification.type == 'message' && notification.data?.conversation_id == conversation_opened_id) return
      Toast.show({
        type: 'info',
        text1: notification?.title,
        text2: notification?.body,
        topOffset: top + HP(2),
        onPress: () => {
          navigateFromNotifi(notification)
          Toast.hide()
        }
      })
    }
  }

  const onAppStateChangeCallback = async (state) => {
    if (state == 'active') {
      let notifications = await AsyncStorage.getItem('new_notifications')
      notifications = notifications && JSON.parse(notifications)
      notifications?.length > 0 && notifications.forEach((notification, index) => {
        addToRedux(notification)
      })
      AsyncStorage.removeItem('new_notifications')
    }
  }

  const onNotificationOpenedAppCallback = remoteMessage => {
    // console.log(
    //   'Notification caused app to open from background state:',
    //   remoteMessage,
    // );
    const notification = notificationFormater(remoteMessage)
    navigateFromNotifi(notification)
  }

  const getInitialNotificationCallback = remoteMessage => {
    if (remoteMessage) {
      // console.log(
      //   'Notification caused app to open from quit state:',
      //   remoteMessage
      // )
      const notification = notificationFormater(remoteMessage)
      navigateFromNotifi(notification)
    }
  }

  const addNotificationListeners = () => {

    //listener for listening notification when app is in foreground state
    unsubscribe = messaging().onMessage(onMessageCallback)

    //when app state changes
    appStateListener = AppState.addEventListener('change', onAppStateChangeCallback)

    //when app is in background state and opened by clicking on notification
    messaging().onNotificationOpenedApp(onNotificationOpenedAppCallback);

    //when app is in quit state and opened by clicking on notification
    messaging()
      .getInitialNotification()
      .then(getInitialNotificationCallback);

  }

  useEffect(() => {
    setAuthToken(userInfo?.user?.auth_token)
  }, [userInfo])

  useEffect(() => {
    addNotificationListeners()
    return () => {
      unsubscribe && unsubscribe()
      appStateListener && appStateListener.remove()
    }
  }, [conversation_opened_id, showed_in_app_notification])

  return (
    <NavigationContainer linking={linking}>
      <AppStack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}>
        <AppStack.Screen name={'Splash'} component={Splash} />
        <AppStack.Screen name={'Walkthrough'} component={Walkthrough} />
        <AppStack.Screen name={'Auth'} component={AuthStack} />
        <AppStack.Screen name={'App'} component={BottomTabs} />
        <AppStack.Screen name={'FilterScreen'} component={FilterScreen} />
        <AppStack.Screen name={'SubFilterScreen'} component={SubFilterScreen} />
        <AppStack.Screen name={'Profile'} component={Profile} />
        <AppStack.Screen name={'EditProfile'} component={EditProfile} />
        <AppStack.Screen name={'Settings'} component={Settings} />
        <AppStack.Screen name={'DeleteAccount'} component={DeleteAccount} />
        <AppStack.Screen name={'Notifications'} component={Notifications} />
        <AppStack.Screen name={'Terms'} component={Terms} />
        <AppStack.Screen name={'PrivacyPolicy'} component={PrivacyPolicy} />
        <AppStack.Screen name={'Support'} component={Support} />
        <AppStack.Screen name={'SupportQuery'} component={SupportQuery} />
        <AppStack.Screen name={'SupportChat'} component={SupportChat} />
        <AppStack.Screen name={'FAQ'} component={FAQ} />
        <AppStack.Screen name={'BlockedList'} component={BlockedList} />
        <AppStack.Screen name={'NewMessages'} component={NewMessages} />
        <AppStack.Screen name={'MapScreen'} component={MapScreen} />
        <AppStack.Screen name={'AddCard'} component={AddCard} />
        <AppStack.Screen name={'EditCard'} component={EditCard} />
        <AppStack.Screen name={'AddPropertyDetails'} component={AddPropertyDetails} />
        <AppStack.Screen name={'AddMorePropertyDetails'} component={AddMorePropertyDetail} />
        <AppStack.Screen name={'AddPropertyDesc'} component={AddPropertyDes} />
        <AppStack.Screen name={'AddRoom'} component={AddRoom} />
        <AppStack.Screen name={'PropertyDetail'} component={PropertyDetail} />
        <AppStack.Screen name={'AddAddress'} component={AddAddress} />
        <AppStack.Screen name={'Video'} component={Video} />
        {/* <AppStack.Screen name={'PayMethod'} component={PayMethod} /> */}
        <AppStack.Screen name={'AllCards'} component={AllCards} />
        <AppStack.Screen name={'CardDetails'} component={CardDetails} />
        <AppStack.Screen name={'Reviews'} component={Reviews} />
        {/* <AppStack.Screen name={"BoostProfile"} component={BoostProfile} /> */}
        {/* <AppStack.Screen name={"BoostProfileDetail"} component={BoostProfileDetail} /> */}
        <AppStack.Screen name={"AllProperties"} component={AllProperties} />
        <AppStack.Screen name={"PersonChat"} component={PersonChat} />
        <AppStack.Screen name={"SavedLocations"} component={SavedLocations} />
        <AppStack.Screen name={"SearchSupportCloser"} component={SearchSupportCloser} />
        <AppStack.Screen name={"SupportCloserDetail"} component={SupportCloserDetail} />
        <AppStack.Screen name={"AddReview"} component={AddReview} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default MainAppNav;
