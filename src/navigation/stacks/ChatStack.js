import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Chat from '../../screens/App/Chat';

const Stack = createNativeStackNavigator();

function ChatStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Chat"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

export default ChatStack;
