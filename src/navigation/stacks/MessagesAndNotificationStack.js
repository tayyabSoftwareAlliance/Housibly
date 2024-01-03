import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MessagesAndNotification from '../../screens/App/MessagesAndNotification';

const Stack = createNativeStackNavigator();

function MessagesAndNotificationStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="MessagesAndNotification"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="MessagesAndNotification" component={MessagesAndNotification} />
    </Stack.Navigator>
  );
}

export default MessagesAndNotificationStack;
