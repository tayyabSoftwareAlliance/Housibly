import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '../exporter';

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.headers.common['Accept'] = 'application/json';

export const setAuthToken = token => {
  axios.defaults.headers.common['auth_token'] = token;
};

const requests = {
  get: endpoint => axios.get(endpoint),
  post: (endpoint, data) => axios.post(endpoint, data),
  put: (endpoint, data) => axios.put(endpoint, data),
  patch: (endpoint, data) => axios.patch(endpoint, data),
  delete: endpoint => axios.delete(endpoint),
};

export const auth = {
  register: data => requests.post(ENDPOINTS.REGISTER, data),
  login: data => requests.post(ENDPOINTS.LOGIN, data),
  socialLogin: data => requests.post(ENDPOINTS.SOCIAL_LOGIN, data),
  forgotPassword: (type, data) => requests.post(`${ENDPOINTS.FORGOT_PASS}/${type}`, data),
  OTPVerify: data => requests.post(ENDPOINTS.VERIFY_OTP, data),
  resendOTP: data => requests.post(ENDPOINTS.RESEND_OTP, data),
  addInfo: data => requests.post(ENDPOINTS.INFO_CONST, data),
  setUserLocation: data => requests.put(ENDPOINTS.SET_USER_LOCATION, data),
  resetPassword: (type, data) => requests.post(`${ENDPOINTS.RESET_PASS}/${type}`, data),
  logoutUser: (data) => requests.post(ENDPOINTS.LOGOUT,data),
  deleteAccount: () => requests.delete(ENDPOINTS.DELETE_ACCOUNT),
};

export const setting = {
  getProfile: () => requests.get(ENDPOINTS.GET_PROFILE),
  updateProfile: data => requests.put(ENDPOINTS.UPDATE_PROFILE, data),
};

export const app = {
  getSublists: () => requests.get(ENDPOINTS.GET_SUBLISTS),
  createProperty: data => requests.post(ENDPOINTS.PROPERTY, data),
  getMyProperties: () => requests.get(ENDPOINTS.PROPERTY),
  getMatchedProperties: (page) => requests.get(`${ENDPOINTS.MATCHED_PROPERTY}?page=${page}`),
  updateProperty: (data, id) => requests.put(`${ENDPOINTS.PROPERTY}/${id}`, data),
  deleteProperty: id => requests.delete(`${ENDPOINTS.PROPERTY}/${id}`),
  getPreference: () => requests.get(ENDPOINTS.USER_PREFERENCE),
  updatePreference: data => requests.post(ENDPOINTS.USER_PREFERENCE, data),
  getTopSupportClosers: () => requests.get(ENDPOINTS.GET_TOP_SUPPORT_CLOSERS),
  getPropertiesInsideCircle: params => requests.get(`${ENDPOINTS.CIRCLE_PROPERTY}?${params}`),
  getPropertiesInsidePolygon: params => requests.get(`${ENDPOINTS.POLYGON_PROPERTY}?${params}`),
  getPropertiesAgainstZipCode: params => requests.get(`${ENDPOINTS.ZIPCODE_PROPERTY}?${params}`),
  getPropertyDetail: id => requests.get(`${ENDPOINTS.GET_PROPERTY_DETAIL}/${id}`),
  getPotentialBuyers: id => requests.get(`${ENDPOINTS.GET_POTENTIAL_BUYERS}?property_id=${id}&sort_criteria=newest`),
  createSavedLocation: data => requests.post(ENDPOINTS.SAVED_LOCATIONS, data),
  updateSavedLocation: (data, id) => requests.put(`${ENDPOINTS.SAVED_LOCATIONS}/${id}`, data),
  getSavedLocations: () => requests.get(ENDPOINTS.SAVED_LOCATIONS),
  getAllChats: () => requests.get(ENDPOINTS.CONVERSATIONS),
  getAllNotifications: () => requests.get(ENDPOINTS.GET_ALL_NOTIFICATIONS),
  notificationSeen: () => requests.get(ENDPOINTS.NOTIFICATION_SEEN),
  deleteChat: (id) => requests.delete(`${ENDPOINTS.CONVERSATIONS}/${id}`),
  getAllMessages: (data) => requests.post(ENDPOINTS.GET_ALL_MESSAGES, data),
  createConversation: (data) => requests.post(ENDPOINTS.CONVERSATIONS, data),
  checkIsConversationCreated: (data) => requests.post(ENDPOINTS.CHECK_IS_CONVERSATION_CREATED, data),
  checkIsConversationBlocked: (data) => requests.post(ENDPOINTS.CHECK_IS_CONVERSATION_BLOCKED, data),
  sendMessage: (data) => requests.post(ENDPOINTS.SEND_MESSAGE, data),
  readMessages: (data) => requests.post(ENDPOINTS.READ_MESSAGES, data),
  searchSupportCloser: (search, page) => requests.get(`${ENDPOINTS.SEARCH_SUPPORT_CLOSER}?search_query=${search}&page=${page}`),
  getOtherUserProfile: (id) => requests.get(`${ENDPOINTS.GET_OTHER_USER_PROFILE}?user_id=${id}`),
  getSupportCloserReviews: (id, rating, page) => requests.get(`${ENDPOINTS.GET_SUPPORT_CLOSER_REVIEWS}?review[support_closer_id]=${id}${rating == 'all' ? '' : ('&review[rating]=' + rating)}&page=${page}`),
  getVisitors: () => requests.get(`${ENDPOINTS.GET_VISITORS}`),
  createReview: (data) => requests.post(ENDPOINTS.CREATE_REVIEW, data),
  blockUnblockUser: (data) => requests.post(ENDPOINTS.BLOCK_UNLBLOCK_USER,data),
  getBlockedUsers: () => requests.get(ENDPOINTS.GET_BLOCKED_USERS),
  createCard: (data) => requests.post(ENDPOINTS.CREATE_CARD,data),
  getAllCards: () => requests.get(ENDPOINTS.GET_ALL_CARDS),
  getCardDetail: (id) => requests.get(`${ENDPOINTS.GET_CARD_DETAIL}?payment[id]=${id}`),
  deleteCard: (id) => requests.delete(`${ENDPOINTS.DELETE_CARD}?payment[id]=${id}`),
  setDefaultCard: (id) => requests.put(`${ENDPOINTS.SET_DEFAULT_CARD}?payment[id]=${id}`),
};
