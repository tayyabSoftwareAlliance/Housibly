import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Search from '../../screens/App/Search';

const Stack = createNativeStackNavigator();

function SearchStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Search" component={Search} initialParams={{ from: 'bottomTab' }} />
    </Stack.Navigator>
  );
}

export default SearchStack;
