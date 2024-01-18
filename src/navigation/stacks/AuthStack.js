import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../../screens/Auth/Login';
import PrivacyPolicy from '../../screens/Auth/PrivacyPolicy';
import TermsConditions from '../../screens/Auth/TermsConditions';
import ForgotPassword from '../../screens/Auth/ForgotPassword';
import ResetPassword from '../../screens/Auth/ResetPassword';
import VerifyOTP from '../../screens/Auth/VerifyOTP';
import VerifyPhone from '../../screens/Auth/VerifyPhone';
import SignUp from '../../screens/Auth/Signup';
import AddPersonalInfo from '../../screens/Auth/AddPersonalInfo';
import SignUpPurpose from '../../screens/Auth/SignUpPurpose';
import UploadDocuments from '../../screens/Auth/UploadDocuments';
import AddSupportInfo from '../../screens/Auth/AddSupportInfo';
import ScheduleDay from '../../screens/Auth/ScheduleDay';

const Stack = createNativeStackNavigator();

function AuthStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignUpPurpose" component={SignUpPurpose} />
      <Stack.Screen name="AuthPrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
      <Stack.Screen name="VerifyPhone" component={VerifyPhone} />
      <Stack.Screen name="AddPersonalInfo" component={AddPersonalInfo} />
      <Stack.Screen name='AddSupportInfo' component={AddSupportInfo} />
      <Stack.Screen name='UploadDocuments' component={UploadDocuments} />
      <Stack.Screen name='ScheduleDay' component={ScheduleDay} />
    </Stack.Navigator>
  );
}

export default AuthStack