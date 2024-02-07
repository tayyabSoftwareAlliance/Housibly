import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar, LogBox, Clipboard } from 'react-native';
import MainNavigation from './src/navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import store, { persistor } from './src/redux/store';
import { colors, stripe_publishableKey } from './src/shared/exporter';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import { requestNotificationPermission } from './src/shared/utilities/helper';
import {StripeProvider} from '@stripe/stripe-react-native';
import Toast from 'react-native-toast-message';

// ignore warnings
LogBox.ignoreAllLogs();
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

GoogleSignin.configure({
  webClientId:
    '859276342696-gm0lnsee2kjh5pvpj85gcm5enrkdgfr2.apps.googleusercontent.com',
});

const App = () => {

  // useEffect(async() => {
  //   // requestNotificationPermission()
  //   const token = await messaging().getToken();
  //   // Clipboard.setString(token);
  //   console.log('FCM Token: ',token)
  //   unsubscribe = messaging().onMessage((remoteMessage) => console.log('remoteeee',JSON.stringify(remoteMessage,null,2)))
  //   return() => unsubscribe()
  // },[])

  return (
    <>
    <Provider store={store}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle={'dark-content'}
      />
      <StripeProvider publishableKey={stripe_publishableKey}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <MainNavigation />
        </SafeAreaProvider>
      </PersistGate>
      </StripeProvider>
    </Provider>
    <Toast/>
    </>
  );
};

export default App;
