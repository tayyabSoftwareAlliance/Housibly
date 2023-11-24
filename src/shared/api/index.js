import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '../exporter';

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.headers.common['Accept'] = 'application/json';

export const setAuthToken = (token) => {
    axios.defaults.headers.common['auth_token'] = token;
}

const requests = {
    get: (endpoint) => axios.get(endpoint),
    post: (endpoint, data) => axios.post(endpoint, data),
    put: (endpoint, data) => axios.put(endpoint, data)
}

export const auth = {
    register: (data) => requests.post(ENDPOINTS.REGISTER, data),
    login: (data) => requests.post(ENDPOINTS.LOGIN, data),
    socialLogin: (data) => requests.post(ENDPOINTS.SOCIAL_LOGIN, data),
    forgotPassword: (data) => requests.post(ENDPOINTS.FORGOT_PASS, data),
    OTPVerify: (data) => requests.post(ENDPOINTS.VERIFY_OTP, data),
    resendOTP: (data) => requests.post(ENDPOINTS.RESEND_OTP, data),
    addInfo: (data) => requests.post(ENDPOINTS.RESET_PASS, data),
    resetPassword: (data) => requests.post(ENDPOINTS.INFO_CONST, data),
    logoutUser: () => requests.post(ENDPOINTS.LOGOUT),
}

export const setting = {
    getProfile: () => requests.get(ENDPOINTS.GET_PROFILE),
    updateProfile: (data) => requests.put(ENDPOINTS.UPDATE_PROFILE, data),
}

export const app = {
    getHouseSublists: () => requests.get(ENDPOINTS.HOUSE_SUBLISTS),
    getCondoSublists: () => requests.get(ENDPOINTS.CONDO_SUBLISTS),
}