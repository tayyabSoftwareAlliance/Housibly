import * as TYPES from '../types';

//Email Validation Action
export const loginRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.LOGIN_REQUEST_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Social Login Action
export const socialLoginRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.SOCIAL_LOGIN_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Sign up obj Action
export const signUpRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.SIGNUP_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Forgot Password Action
export const forgotPassRequest = (route, params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.FORGOT_PASSWORD_REQUEST,
    route,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Resend OTP Action
export const resendOTPRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.RESEND_OTP_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Reset Password Action
export const resetPassRequest = (route, params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.RESET_PASSWORD_REQUEST,
    route,
    params,
    cbSuccess,
    cbFailure,
  };
};
//Verify OTP Action
export const verifyOTPRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.OTP_VERIFY_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Verify OTP Action
export const addInfoRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.ADD_ADDITIONAL_INFO_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Set Walkthrough Action
export const set_user_type_request = (params, cbSuccess) => {
  return {
    type: TYPES.USER_TYPE_REQUEST,
    params,
    cbSuccess,
  };
};

//Set Walkthrough Action
export const logoutRequset = (params, callBack) => {
  return {
    type: TYPES.LOGOUT_REQUEST_REQUEST,
    params,
    callBack,
  };
};

//Set Support Closure Action
export const setSupportClosureRequest = (params, callBack) => {
  return {
    type: TYPES.SET_SUPPORT_INFO_REQUEST,
    params,
    callBack,
  };
};
