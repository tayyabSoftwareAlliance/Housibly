import axios from 'axios';
import {Alert} from 'react-native';
import {BASE_URL, responseValidator} from '../exporter';
import {GetToken} from '../utilities/headers';

const TEMP_URL = 'https://0e68-2400-adc5-454-d100-2b98-4232-35b-22a.ngrok-free.app/api/v1/'

export const getHouseSublists = async (setloading) => {
  var myHeaders = new Headers();
  // myHeaders.append('auth_token', await GetToken());
  myHeaders.append('auth_token', 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im11dHRhaGFyLjk3QGdtYWlsLmNvbSJ9.A97k_BHOXv2xPS8lVCQVUyUC_h0UR5_wjHnpWuTIrJU');
  myHeaders.append('Accept', '*/*');
  myHeaders.append('User-Agent', 'request');

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  try {
    const res = await fetch(`${TEMP_URL}properties/house_detail_options`, requestOptions);
    const data = await res.text();
    console.log('dataa',data)
    setloading?.(false);
    // return data;
  } catch (error) {
    console.log('errorrrr',error)
    setloading?.(false);
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    Alert.alert('Error', msg || 'Something went wrong!');
  }
};


export const getCondoSublists = async (setloading) => {
  var myHeaders = new Headers();
  // myHeaders.append('auth_token', await GetToken());
  myHeaders.append('auth_token', 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im11dHRhaGFyLjk3QGdtYWlsLmNvbSJ9.A97k_BHOXv2xPS8lVCQVUyUC_h0UR5_wjHnpWuTIrJU');
  myHeaders.append('Accept', '*/*');
  myHeaders.append('User-Agent', 'request');
  myHeaders.append('Content-Type', 'multipart/form-data');

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  try {
    const res = await fetch(`${TEMP_URL}properties/condo_detail_options`, requestOptions);
    const data = await res.json();
    setloading?.(false);
    return data;
  } catch (error) {
    console.log('errorrrr',error)
    setloading?.(false);
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    Alert.alert('Error', msg || 'Something went wrong!');
  }
};

export const addProperty = async (data, setloading) => {
  var myHeaders = new Headers();
  myHeaders.append('auth_token', await GetToken());
  myHeaders.append('Accept', '*/*');
  myHeaders.append('User-Agent', 'request');
  myHeaders.append('Content-Type', 'multipart/form-data');

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
    redirect: 'follow',
  };
  try {
    const res = await fetch(`${BASE_URL}properties`, requestOptions);
    const data = await res.json();
    setloading?.(false);
    return data;
  } catch (error) {
    setloading?.(false);
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    Alert.alert('Error', msg || 'Something went wrong!');
  }
};

export const getRecentProperties = async () => {
  const res = await axios.get(`${BASE_URL}recent_property`, {
    headers: {
      auth_token: await GetToken(),
      Accept: 'application/json',
    },
  });
  return res.data;
};

export const getFilteredProperties = async params => {
  console.log(params);
  const res = await axios.post(`${BASE_URL}property/filter`, params, {
    headers: {
      auth_token: await GetToken(),
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};