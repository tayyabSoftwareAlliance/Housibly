import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../../screens/App/Home';
import AllMatches from '../../screens/App/Home/AllMatches';
import AllSales from '../../screens/App/Home/AllSales';
import PotentialBuyers from '../../screens/App/Home/PotentialBuyers';
import PersonDetails from '../../screens/App/Home/PersonDetails';
import AllBuyMain from '../../screens/App/Home/AllBuyMain';

const Stack = createNativeStackNavigator();

function HomeStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AllMatches" component={AllMatches} />
      <Stack.Screen name="AllBuyMain" component={AllBuyMain} />
      <Stack.Screen name="AllSales" component={AllSales} />
      <Stack.Screen name="PotentialBuyers" component={PotentialBuyers} />
      <Stack.Screen name="PersonDetails" component={PersonDetails} />
    </Stack.Navigator>
  );
}

export default HomeStack;
