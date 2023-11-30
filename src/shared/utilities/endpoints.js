const BASE_URL = 'http://16.171.63.250:3000/api/v1/';

const ENDPOINTS = {

  //auth
  REGISTER: 'signup.json',
  LOGIN: 'login',
  SOCIAL_LOGIN: 'social_login.json',
  APPLE_SIGN_IN: 'apple_login',
  FORGOT_PASS: 'forgot_password',
  RESET_PASS: 'reset_password',
  LOGOUT: 'logout',
  ACCESS_TOKEN: 'get_access_token',
  VERIFY_OTP: 'verify_otp.json',
  INFO_CONST: 'register_user',
  RESEND_OTP: 'verify_otp/email_resend_otp',
  RESEND_OTP: 'verify_otp/resend_otp',

  //setting
  GET_PROFILE: 'get_profile.json',
  UPDATE_PROFILE: 'update_profile.json',
  CARD_CONST: 'card',
  CARDS_CONST: 'cards',
  DELETE_CARD_CONST: 'delete_card',
  EDIT_CARD_CONST: 'update_card',
  DEFAULT_CARD_CONST: 'default_card',

  //app
  GET_SUBLISTS: 'properties/detail_options',
  PROPERTY: 'properties',
};

export { BASE_URL, ENDPOINTS };
