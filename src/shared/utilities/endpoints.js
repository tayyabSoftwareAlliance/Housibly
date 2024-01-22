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
  MATCHED_PROPERTY: 'properties/matching_properties',
  CIRCLE_PROPERTY: 'properties/find_in_circle',
  POLYGON_PROPERTY: 'properties/find_in_polygon',
  ZIPCODE_PROPERTY: 'properties/find_by_zip_code',
  USER_PREFERENCE: 'user_preferences',
  SAVED_LOCATIONS: 'saved_searches',

  //chat
  CONVERSATIONS: 'conversations',
  GET_ALL_MESSAGES: 'messages/get_messages',
  SEND_MESSAGE: 'messages',
  READ_MESSAGES: 'conversations/read_messages',

};

export { BASE_URL, ENDPOINTS };
