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
  delete: endpoint => axios.delete(endpoint),
};

export const auth = {
  register: data => requests.post(ENDPOINTS.REGISTER, data),
  login: data => requests.post(ENDPOINTS.LOGIN, data),
  socialLogin: data => requests.post(ENDPOINTS.SOCIAL_LOGIN, data),
  forgotPassword: (type, data) =>
    requests.post(`${ENDPOINTS.FORGOT_PASS}/${type}`, data),
  OTPVerify: data => requests.post(ENDPOINTS.VERIFY_OTP, data),
  resendOTP: data => requests.post(ENDPOINTS.RESEND_OTP, data),
  addInfo: data => requests.post(ENDPOINTS.INFO_CONST, data),
  resetPassword: (type, data) =>
    requests.post(`${ENDPOINTS.RESET_PASS}/${type}`, data),
  logoutUser: () => requests.post(ENDPOINTS.LOGOUT),
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
  getPropertiesInsideCircle: params => requests.get(`${ENDPOINTS.CIRCLE_PROPERTY}?${params}`),
  getPropertiesInsidePolygon: params => requests.get(`${ENDPOINTS.POLYGON_PROPERTY}?${params}`),
  getPropertiesAgainstZipCode: params => requests.get(`${ENDPOINTS.ZIPCODE_PROPERTY}?${params}`),
};
