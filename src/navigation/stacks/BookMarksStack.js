import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Bookmarks from '../../screens/App/Bookmarks';

const Stack = createNativeStackNavigator();

function BookmarksStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Bookmarks"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Bookmarks" component={Bookmarks} />
    </Stack.Navigator>
  );
}

export default BookmarksStack;
