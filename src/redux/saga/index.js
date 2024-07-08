import { fork } from 'redux-saga/effects';
import {
  getMyPropertiesRequest,
  getSublistsRequest,
  setAddressRequest,
  updateMyPropertyRequest,
  deleteMyPropertyRequest,
  createMyPropertyRequest,
  updateMyPreferenceRequest,
  getMyPreferenceRequest,
  getMatchedPropertiesRequest,
  getTopSupportClosersRequest,
  getDreamAddressesRequest,
  deleteDreamAddressRequest,
  createDreamAddressRequest,
  getBuyPropertiesRequest,
} from './app-sega/app-sega';

import {
  forgotPassRequest,
  loginRequest,
  signUpRequest,
  setUserTypeRequest,
  resetPassRequest,
  socialLoginRequest,
  logoutRequestSega,
  OTPVerifyRequest,
  resendOTPRequestSega,
  addInfoRequestSega,
  setSupportInfoSega,
  addSupportInfoRequestSega,
  setUserLocationRequestSega,
  updateUserSettingRequest,
} from './auth-saga/auth-sega';

import {
  addcardRequest,
  defaultCardRequest,
  delCardRequest,
  editcardRequest,
  getdefaultCardRequest,
  getPaymentCardRequest,
  getProfileRequest,
  payWithDebitRequest,
  updateProfileRequest,
} from './settings-saga/settings-saga';
import { deleteChatRequest, getAllChatsRequest, readChatMessagesRequest } from './chat-sega/chat-sega';
import { getAllNotificationsRequest } from './notification-sega/notification-sega';

export function* rootSaga() {
  yield fork(loginRequest);
  yield fork(signUpRequest);
  yield fork(setUserTypeRequest);
  yield fork(forgotPassRequest);
  yield fork(resetPassRequest);
  yield fork(socialLoginRequest);
  yield fork(logoutRequestSega);
  yield fork(OTPVerifyRequest);
  yield fork(resendOTPRequestSega);
  yield fork(addInfoRequestSega);
  yield fork(getProfileRequest);
  yield fork(updateProfileRequest);
  yield fork(setSupportInfoSega);
  yield fork(addSupportInfoRequestSega);
  yield fork(getTopSupportClosersRequest);
  yield fork(setUserLocationRequestSega);
  yield fork(updateUserSettingRequest);

  //Payments
  yield fork(addcardRequest);
  yield fork(getPaymentCardRequest);
  yield fork(delCardRequest);
  yield fork(defaultCardRequest);
  yield fork(editcardRequest);
  yield fork(payWithDebitRequest);
  yield fork(getdefaultCardRequest);
  yield fork(setAddressRequest);

  //Properties
  yield fork(getSublistsRequest);
  yield fork(createMyPropertyRequest);
  yield fork(getMyPropertiesRequest);
  yield fork(updateMyPropertyRequest);
  yield fork(deleteMyPropertyRequest);

  //Preference
  yield fork(getMyPreferenceRequest);
  yield fork(updateMyPreferenceRequest);

  //Dream Address
  yield fork(createDreamAddressRequest);
  yield fork(getDreamAddressesRequest);
  yield fork(deleteDreamAddressRequest);

  //Matched Properties
  yield fork(getMatchedPropertiesRequest);

  //Buy Properties
  yield fork(getBuyPropertiesRequest);

  //Chats
  yield fork(getAllChatsRequest);
  yield fork(deleteChatRequest);
  yield fork(readChatMessagesRequest);

  //Notifications
  yield fork(getAllNotificationsRequest);

}