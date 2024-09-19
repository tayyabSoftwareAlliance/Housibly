import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import MainNavigation from './src/navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import store, { persistor } from './src/redux/store';
import { colors } from './src/shared/exporter';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StripeProvider } from '@stripe/stripe-react-native';
import Toast from 'react-native-toast-message';
import PropertySuggestionInAppNotification from './src/components/Modal/PropertySuggestionInAppNotification';
import {WEB_CLIENT_ID,STRIPE_PUBLISHABLE_KEY} from '@env'

// ignore warnings
LogBox.ignoreAllLogs();
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
});

const App = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar
          translucent={false}
          backgroundColor={colors.white}
          barStyle={'dark-content'}
        />
        <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY} merchantIdentifier='merchant.com.housibly.app'>
          <PersistGate persistor={persistor}>
            <SafeAreaProvider>
              <MainNavigation />
              <PropertySuggestionInAppNotification />
            </SafeAreaProvider>
          </PersistGate>
        </StripeProvider>
      </Provider>
      <Toast />
    </>
  );
};

export default App;
