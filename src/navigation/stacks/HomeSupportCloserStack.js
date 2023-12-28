import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeSupportCloser from '../../screens/App/HomeSupportCloser';

const Stack = createNativeStackNavigator();

function HomeSupportCloserStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeSupportCloser} />
    </Stack.Navigator>
  );
}

export default HomeSupportCloserStack