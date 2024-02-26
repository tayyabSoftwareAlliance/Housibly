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
  DELETE_ACCOUNT: 'delete_account',
  ACCESS_TOKEN: 'get_access_token',
  VERIFY_OTP: 'verify_otp.json',
  INFO_CONST: 'register_user',
  RESEND_OTP: 'verify_otp/email_resend_otp',
  RESEND_OTP: 'verify_otp/resend_otp',
  SET_USER_LOCATION:'update_location',

  //setting
  GET_PROFILE: 'show_profile',
  UPDATE_PROFILE: 'update_profile.json',
  CARD_CONST: 'card',
  CARDS_CONST: 'cards',
  EDIT_CARD_CONST: 'update_card',
  DEFAULT_CARD_CONST: 'default_card',

  //app
  GET_SUBLISTS: 'properties/detail_options',
  PROPERTY: 'properties',
  MATCHED_PROPERTY: 'properties/matching_properties',
  CIRCLE_PROPERTY: 'properties/find_in_circle',
  POLYGON_PROPERTY: 'properties/find_in_polygon',
  ZIPCODE_PROPERTY: 'properties/find_by_zip_code',
  GET_PROPERTY_DETAIL: 'properties',
  GET_POTENTIAL_BUYERS: 'user_preferences/potential_buyers',
  GET_BOOKMARKS:'bookmarks',
  USER_PREFERENCE: 'user_preferences',
  SAVED_LOCATIONS: 'saved_searches',
  GET_OTHER_USER_PROFILE: 'show_other_user_profile',
  CREATE_REVIEW:'reviews',
  BLOCK_UNLBLOCK_USER:'block_unblock_user',
  GET_BLOCKED_USERS:'blocked_users',
  GET_TOP_SUPPORT_CLOSERS:'top_support_closers',
  CREATE_CARD:'create_card',
  GET_ALL_CARDS:'get_all_cards',
  GET_CARD_DETAIL:'get_card',
  DELETE_CARD: 'delete_card',
  SET_DEFAULT_CARD: 'set_default_card',
  GET_NOTIFICATION_SETTING:'show_current_user_setting',
  UPDATE_NOTIFICATION_SETTING:'update_current_user_setting',
  GET_PACKAGES:'get_packages',
  
  //chat
  CONVERSATIONS: 'conversations',
  CHECK_IS_CONVERSATION_CREATED:'conversations/check_conversation_between_users',
  CHECK_IS_CONVERSATION_BLOCKED:'conversations/check_conversation_blocked_status',
  GET_ALL_MESSAGES: 'messages/get_messages',
  SEND_MESSAGE: 'messages',
  READ_MESSAGES: 'conversations/read_messages',

  //notification
  GET_ALL_NOTIFICATIONS: 'get_user_notifications',
  NOTIFICATION_SEEN: 'mark_as_read',

  //support closer
  SEARCH_SUPPORT_CLOSER:'search_support_closers',
  GET_SUPPORT_CLOSER_REVIEWS:'reviews/get_reviews',
  GET_VISITORS:'profile_visitor_list',

  //support chat
  SUPPORT_TICKET:'tickets',
  CREATE_SUPPORT_MESSAGE:'support_conversations/create_message',
  GET_SUPPORT_MESSAGES:'support_conversations/get_messages',

};

export { BASE_URL, ENDPOINTS };
