import { takeLatest, put } from 'redux-saga/effects';
import { sublists, responseValidator } from '../../../shared/exporter';
import {
  getAllProperties,
  getFilteredProperties,
  getRecentProperties,
} from '../../../shared/service/PropertyService';
import * as types from '../../actions/types';
import { app } from '../../../shared/api';

// add sublists
export function* getSublistsRequest() {
  yield takeLatest(types.GET_SUBLISTS, getSublists);
}
function* getSublists() {
  try {
    const res = yield app.getSublists()
    if (res?.status == 200) {
      yield put({
        type: types.GET_SUBLISTS_SUCCESS,
        payload: res?.data || {},
      });
    }
  } catch (error) {
    console.log('Get Sublists Error ', error)
  }
}

// *************Get Properties**************
export function* getRecentPropertiesRequest() {
  yield takeLatest(types.GET_RECENT_PROPERTIES_REQUEST, getRecentProp);
}
function* getRecentProp(params) {
  try {
    const res = yield getRecentProperties();
    yield put({
      type: types.GET_RECENT_PROPERTIES_SUCCESS,
      payload: res,
    });
    params?.cbSuccess(res);
  } catch (error) {
    yield put({
      type: types.GET_RECENT_PROPERTIES_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

//Get all
export function* getAllPropertiesRequest() {
  yield takeLatest(types.GET_ALL_PROPERTIES_REQUEST, getAllProp);
}
function* getAllProp(params) {
  try {
    const res = yield getAllProperties();
    yield put({
      type: types.GET_ALL_PROPERTIES_SUCCESS,
      payload: res,
    });
    params?.cbSuccess(res);
  } catch (error) {
    yield put({
      type: types.GET_ALL_PROPERTIES_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

//Get filtered all
export function* getFilteredPropertiesRequest() {
  yield takeLatest(types.GET_FILTERED_PROPERTIES_REQUEST, getFilteredProp);
}
function* getFilteredProp(params) {
  try {
    const res = yield getFilteredProperties(params?.params);
    yield put({
      type: types.GET_FILTERED_PROPERTIES_SUCCESS,
      payload: res,
    });
    params?.cbSuccess(res);
  } catch (error) {
    yield put({
      type: types.GET_FILTERED_PROPERTIES_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************SET ADDRESS Info**************
export function* setAddressRequest() {
  yield takeLatest(types.SET_ADDRESS_REQUEST, setAddress);
}
function* setAddress(params) {
  try {
    yield put({
      type: types.SET_ADDRESS_SUCCESS,
      payload: params?.params,
    });
    params?.cbSuccess(params.params);
  } catch (error) {
    console.log(error);
  }
}
