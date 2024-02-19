/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { notificationFormater } from './src/shared/utilities/notifications';

//listener for listening notification when app is in background/quit state
messaging().setBackgroundMessageHandler(async remoteMessage => {
    // console.log('Message handled in the background!', remoteMessage);
    const notification = notificationFormater(remoteMessage)
    let notifications = await AsyncStorage.getItem('new_notifications')
    notifications = notifications ? JSON.parse(notifications) : []
    notifications = [notification, ...notifications]
    AsyncStorage.setItem('new_notifications', JSON.stringify(notifications))
});

AppRegistry.registerComponent(appName, () => App);
