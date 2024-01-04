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
import PayMethod from '../screens/App/Profile/PayMethod';
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
import { useSelector } from 'react-redux'
import { setAuthToken } from '../shared/api';
import Reviews from '../screens/App/Reviews';
import BoostProfile from '../screens/App/BoostProfile';
import BoostProfileDetail from '../screens/App/BoostProfile/BoostProfileDetail';
import AllProperties from '../screens/App/Home/AllProperties';
import PersonChat from '../screens/App/PersonChat';

const AppStack = createNativeStackNavigator();

const MainAppNav = () => {

  const { userInfo } = useSelector(state => state?.auth);

  useEffect(() => {
    setAuthToken(userInfo?.user?.auth_token)
  }, [])

  return (
    <NavigationContainer>
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
        <AppStack.Screen name={'Notifications'} component={Notifications} />
        <AppStack.Screen name={'Terms'} component={Terms} />
        <AppStack.Screen name={'PrivacyPolicy'} component={PrivacyPolicy} />
        <AppStack.Screen name={'Support'} component={Support} />
        <AppStack.Screen name={'SupportQuery'} component={SupportQuery} />
        <AppStack.Screen name={'SupportChat'} component={SupportChat} />
        <AppStack.Screen name={'FAQ'} component={FAQ} />
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
        <AppStack.Screen name={'PayMethod'} component={PayMethod} />
        <AppStack.Screen name={'AllCards'} component={AllCards} />
        <AppStack.Screen name={'CardDetails'} component={CardDetails} />
        <AppStack.Screen name={'Reviews'} component={Reviews} />
        <AppStack.Screen name={"BoostProfile"} component={BoostProfile} />
        <AppStack.Screen name={"BoostProfileDetail"} component={BoostProfileDetail} />
        <AppStack.Screen name={"AllProperties"} component={AllProperties} />
        <AppStack.Screen name={"PersonChat"} component={PersonChat} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default MainAppNav;
