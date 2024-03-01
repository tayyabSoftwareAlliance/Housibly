import { takeLatest, put } from 'redux-saga/effects';
import { responseValidator } from '../../../shared/exporter';
import * as types from '../../actions/types';
import { auth, setAuthToken, setting } from '../../../shared/api';
import { handleLocationPermission } from '../../../shared/utilities/helper';
import Geolocation from '@react-native-community/geolocation';

// *************Login Sega**************
export function* loginRequest() {
  yield takeLatest(types.LOGIN_REQUEST_REQUEST, login);
}
function* login(params) {
  try {
    const res = yield auth.login(params?.params);
    if (res?.status == 200) {
      yield put({
        type: types.LOGIN_REQUEST_SUCCESS,
        payload: res.data,
      });
      setAuthToken(res.data?.user?.auth_token)
      params?.cbSuccess(res.data);
    }
  } catch (error) {
    console.log('login error ', error);
    yield put({
      type: types.LOGIN_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************Social Login Login Sega**************
export function* socialLoginRequest() {
  yield takeLatest(types.SOCIAL_LOGIN_REQUEST, socialLoginUser);
}

function* socialLoginUser(params) {
  try {
    const res = yield auth.socialLogin(params?.params);
    if (res?.status == 200) {
      yield put({
        type: types.SOCIAL_LOGIN_REQUEST_SUCCESS,
        payload: res.data,
      });
      setAuthToken(res.data?.user?.auth_token)
      params?.cbSuccess(res.data);
    } else {
      yield put({
        type: types.SOCIAL_LOGIN_REQUEST_FAILURE,
        payload: null,
      });
      params?.cbFailure(res?.data);
    }
  } catch (error) {
    console.log(JSON.stringify(error?.response, null, 2));
    yield put({
      type: types.SOCIAL_LOGIN_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status);
    params?.cbFailure(error?.response?.data?.message || msg);
  }
}

// *************Sign Up Sega**************
export function* signUpRequest() {
  yield takeLatest(types.SIGNUP_REQUEST, signUp);
}

function* signUp(params) {
  try {
    const res = yield auth.register(params?.params);
    if (res?.status == 200) {
      params?.cbSuccess(res.data);
    }
  } catch (error) {
    console.log('error', error)
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************Forgot Sega**************
export function* forgotPassRequest() {
  yield takeLatest(types.FORGOT_PASSWORD_REQUEST, forgot);
}

function* forgot(params) {
  try {
    const res = yield auth.forgotPassword(params?.route, params?.params);
    if (res?.status == 200) {
      yield put({
        type: types.FORGOT_PASSWORD_SUCCESS,
        payload: res.data,
      });
      params?.cbSuccess(res.data);
    }
  } catch (error) {
    yield put({
      type: types.FORGOT_PASSWORD_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************Verify OTP Sega**************
export function* OTPVerifyRequest() {
  yield takeLatest(types.OTP_VERIFY_REQUEST, verifyOTP);
}

function* verifyOTP(params) {
  try {
    const res = yield auth.OTPVerify(params?.params);
    if (res?.status == 200) {
      yield put({
        type: types.OTP_VERIFY_SUCCESS,
        payload: res.data,
      });
      setAuthToken(res.data?.user?.auth_token)
      params?.cbSuccess(res.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.OTP_VERIFY_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************Reset Password Sega**************
export function* resetPassRequest() {
  yield takeLatest(types.RESET_PASSWORD_REQUEST, resetPass);
}

function* resetPass(params) {
  try {
    const res = yield auth.resetPassword(params?.route, params?.params);
    if (res?.status == 200) {
      yield put({
        type: types.RESET_PASSWORD_SUCCESS,
        payload: res.data,
      });
      params?.cbSuccess(res.data);
    }
  } catch (error) {
    // console.log('error', error)
    // console.log('error', error?.response?.data)
    yield put({
      type: types.RESET_PASSWORD_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

//*************Walkthrough SEGA**************
export function* setUserTypeRequest() {
  yield takeLatest(types.USER_TYPE_REQUEST, user_type_request);
}
function* user_type_request(params) {
  try {
    yield put({
      type: types.USER_TYPE_SUCCESS,
      payload: params?.params,
    });
    params?.cbSuccess();
  } catch (error) { }
}
//************* Logout **************
export function* logoutRequestSega() {
  yield takeLatest(types.LOGOUT_REQUEST_REQUEST, logout);
}
function* logout(params) {
  try {
    yield put({
      type: types.LOGOUT_REQUEST_SUCCESS,
      payload: params,
    });
    params?.callBack();
  } catch (error) {
    console.log(error);
  }
}

// *************Resend OTP Sega**************
export function* resendOTPRequestSega() {
  yield takeLatest(types.RESEND_OTP_REQUEST, resend_otp);
}

function* resend_otp(params) {
  try {
    const res = yield auth.resendOTP(params?.params);
    if (res?.status == 200) {
      yield put({
        type: types.RESEND_OTP_SUCCESS,
        payload: res.data,
      });
      params?.cbSuccess(res.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.RESEND_OTP_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************Add Info Sega**************
export function* addInfoRequestSega() {
  yield takeLatest(types.ADD_ADDITIONAL_INFO_REQUEST, add_info);
}

function* add_info(params) {
  try {
    const res = yield auth.addInfo(params?.params);
    console.log('resssssss status',res.status)
    console.log('resssssss dataaa',res.data)
    if (res?.status == 200) {
      yield put({
        type: types.ADD_ADDITIONAL_INFO_SUCCESS,
        payload: res.data,
      });
      params?.cbSuccess(res.data);
    }
  } catch (error) {
    console.log('error response ',error?.response);
    yield put({
      type: types.ADD_ADDITIONAL_INFO_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}


// *************Set User Current Location Sega**************
export function* setUserLocationRequestSega() {
  yield takeLatest(types.SET_USER_LOCATION_REQUEST, set_location);
}

function* set_location(params) {
  try {
    const { latitude, longitude, address } = params.params
    const formData = new FormData()
    formData.append('user[latitude]', latitude)
    formData.append('user[longitude]', longitude)
    formData.append('user[address]', address)
    const res = yield auth.setUserLocation(formData);
    if (res?.status == 200) {
      yield put({
        type: types.SET_USER_LOCATION_SUCCESS,
        payload: {
          latitude,
          longitude,
          address,
        },
      });
      params.onSuccess?.()
    }
  } catch (error) {
    // console.log('set_location error ', error);
  }
}

// *************Set Support Info Sega**************
export function* setSupportInfoSega() {
  yield takeLatest(types.SET_SUPPORT_INFO_REQUEST, support_info);
}

function* support_info(params) {
  try {
    yield put({
      type: types.SET_SUPPORT_INFO_SUCCESS,
      payload: params?.params,
    });
    params?.callBack(params?.params);
  } catch (error) {
    console.log(error);
  }
}

// *************Add Support Info Sega**************
export function* addSupportInfoRequestSega() {
  yield takeLatest(types.ADD_SUPPORT_INFO_REQUEST, add_support_info);
}

function* add_support_info(params) {
  try {
    const res = yield auth.addInfo(params?.params);
    if (res?.status == 200) {
      yield put({
        type: types.ADD_SUPPORT_INFO_SUCCESS,
        payload: res.data,
      });
      params?.cbSuccess(res.data);
    }
  } catch (error) {
    // console.log('error response ',error?.response);
    yield put({
      type: types.ADD_SUPPORT_INFO_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************Update User Setting Request**************
export function* updateUserSettingRequest() {
  yield takeLatest(types.UPDATE_USER_SETTING_REQUEST, updateUserSetting);
}

function* updateUserSetting(params) {
  try {
    const res = yield setting.updateUserSetting(params?.params);
    if (res?.status == 200) {
      yield put({
        type: types.UPDATE_USER_SETTING_SUCCESS,
        payload: res.data || {},
      });
    } else {
      params?.onFailure(res?.data?.message);
    }
  } catch (error) {
    console.log('updateUserSetting error ',error);
    let msg = responseValidator(error?.response?.status);
    params?.onFailure(msg);
  } finally{
    params?.onFinally()
  }
}
