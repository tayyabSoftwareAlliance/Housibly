import {HTTP_CLIENT, ENDPOINTS} from '../exporter';
import axios from 'axios';
import {GetToken} from '../utilities/headers';
import {BASE_URL} from '../utilities/endpoints';

export const getUserData = async () => {
  const res = await axios.get(`${BASE_URL}${ENDPOINTS.GET_PROFILE}`, {
    headers: {
      auth_token: await GetToken(),
    },
  });
  return res.data;
};

export const updateUserData = async params => {
  const res = await axios.put(
    `${BASE_URL}${ENDPOINTS.UPDATE_PROFILE}`,
    params,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        auth_token: await GetToken(),
      },
    },
  );
  return res.data;
};

//Add Card Requests
export const addDebitCard = async params => {
  const token = await GetToken();
  const res = await axios.post(`${BASE_URL}${ENDPOINTS.CARD_CONST}`, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
      auth_token: token,
      Accept: 'application/json',
    },
  });
  return res.data;
};

//Edit
export const editDebitCard = async params => {
  const token = await GetToken();
  const res = await axios.put(
    `${BASE_URL}${ENDPOINTS.EDIT_CARD_CONST}`,
    params,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        auth_token: token,
        Accept: 'application/json',
      },
    },
  );
  return res.data;
};

//Set Default Card
export const setDefaultCard = async params => {
  const token = await GetToken();
  const res = await axios.put(
    `${BASE_URL}${ENDPOINTS.DEFAULT_CARD_CONST}`,
    params,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        auth_token: token,
        Accept: 'application/json',
      },
    },
  );
  return res.data;
};

//Get Default Card
export const getDefaultCard = async () => {
  const res = await axios.get(`${BASE_URL}get_default_card`, {
    headers: {
      auth_token: await GetToken(),
      Accept: 'application/json',
    },
  });
  return res.data;
};

//Del Card Requests
export const delDebitCard = async params => {
  const token = await GetToken();
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.DELETE_CARD_CONST}`,
    params,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        auth_token: token,
        Accept: 'application/json',
      },
    },
  );
  return res.data;
};

//Get Card Requests
export const getAllPaymentCards = async () => {
  const token = await GetToken();
  const res = await axios.get(`${BASE_URL}${ENDPOINTS.CARDS_CONST}`, {
    headers: {
      auth_token: token,
      Accept: 'application/json',
    },
  });
  return res.data;
};

//Pay With Social Card Requests
export const payWithDebitCard = (route, params) => {
  return HTTP_CLIENT.post(`${ENDPOINTS.CARD_CONST}/${route}`, params);
};

//Pay With Social Card Requests
export const payWithSocialCard = (type, params) => {
  console.log('Payment Type', type);
  return HTTP_CLIENT.post(
    `${ENDPOINTS.CARD_CONST}/${type == 'apple' ? 'apple_pay' : 'google_pay'}`,
    params,
  );
};
