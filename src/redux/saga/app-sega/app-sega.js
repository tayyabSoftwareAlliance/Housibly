import { takeLatest, put } from 'redux-saga/effects';
import { sublists, responseValidator } from '../../../shared/exporter';
import {
  getAllProperties,
  getFilteredProperties,
  getRecentProperties,
} from '../../../shared/service/PropertyService';
import * as types from '../../actions/types';
import { app } from '../../../shared/api';
import { Alert } from 'react-native';

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

//Create my property
export function* createMyPropertyRequest() {
  yield takeLatest(types.CREATE_MY_PROPERTY_REQUEST, createMyProp);
}
function* createMyProp(action) {
  try {
    const res = yield app.createProperty(action.payload)
    if (res?.status == 200) {
      yield put({
        type: types.CREATE_MY_PROPERTY_SUCCESS,
        payload: res?.data || {},
      });
      action.onSuccess()
    }
  } catch (error) {
    console.log('create property error', error.response)
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    Alert.alert('Error', msg || 'Something went wrong!');
  } finally {
    yield put({
      type: types.CREATE_MY_PROPERTY_FINALLY
    });
  }
}

//Get my properties
export function* getMyPropertiesRequest() {
  yield takeLatest(types.GET_MY_PROPERTIES_REQUEST, getMyProp);
}
function* getMyProp() {
  try {
    const res = yield app.getMyProperties()
    if (res?.status == 200) {
      yield put({
        type: types.GET_MY_PROPERTIES_SUCCESS,
        payload: res?.data || [],
      });
    }
  } catch (error) {
    console.log('get my properties error ', error)
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    Alert.alert('Error', msg || 'Something went wrong!');
  } finally {
    yield put({
      type: types.GET_MY_PROPERTIES_FINALLY
    });
  }
}

//Update my property
export function* updateMyPropertyRequest() {
  yield takeLatest(types.UPDATE_MY_PROPERTY_REQUEST, updateMyProp);
}
function* updateMyProp(action) {
  try {
    const res = yield app.updateProperty(action.payload.data, action.payload.id)
    if (res?.status == 200) {
      yield put({
        type: types.UPDATE_MY_PROPERTY_SUCCESS,
        payload: { id: action.payload.id, data: res?.data || {} },
      });
      action.onSuccess()
    }
  } catch (error) {
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    Alert.alert('Error', msg || 'Something went wrong!');
  } finally {
    yield put({
      type: types.UPDATE_MY_PROPERTY_FINALLY
    });
  }
}

//Delete my property
export function* deleteMyPropertyRequest() {
  yield takeLatest(types.DELETE_MY_PROPERTY_REQUEST, deleteMyProp);
}
function* deleteMyProp(action) {
  try {
    const res = yield app.deleteProperty(action.payload)
    if (res?.status == 200) {
      yield put({
        type: types.DELETE_MY_PROPERTY_SUCCESS,
        payload: action.payload,
      });
      action.onSuccess()
    }
  } catch (error) {
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    Alert.alert('Error', msg || 'Something went wrong!');
  } finally {
    yield put({
      type: types.DELETE_MY_PROPERTY_FINALLY
    });
  }
}

//Get my preference
export function* getMyPreferenceRequest() {
  yield takeLatest(types.GET_MY_PREFERENCE_REQUEST, getMyPreference);
}
function* getMyPreference(action) {
  try {
    const res = yield app.getPreference()
    if (res?.status == 200) {
      // console.log('ressss',res?.data)
      yield put({
        type: types.GET_MY_PREFERENCE_SUCCESS,
        payload: res?.data || {},
      });
      action.onSuccess?.()
    }
  } catch (error) {
    console.log('error', error?.response?.data)
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    Alert.alert('Error', msg || 'Something went wrong!');
  } finally {
    yield put({
      type: types.GET_MY_PREFERENCE_FINALLY
    });
  }
}

//Update my preference
export function* updateMyPreferenceRequest() {
  yield takeLatest(types.UPDATE_MY_PREFERENCE_REQUEST, updateMyPreference);
}
function* updateMyPreference(action) {
  try {
    const res = yield app.updatePreference(action.payload)
    if (res?.status == 200) {
      // console.log('ressss', res?.data)
      yield put({
        type: types.UPDATE_MY_PREFERENCE_SUCCESS,
        payload: res?.data || {},
      });
      action.onSuccess()
    }
  } catch (error) {
    console.log('error', error?.response?.data)
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    Alert.alert('Error', msg || 'Something went wrong!');
  } finally {
    yield put({
      type: types.UPDATE_MY_PREFERENCE_FINALLY
    });
  }
}

//Create dream address
export function* createDreamAddressRequest() {
  yield takeLatest(types.CREATE_DREAM_ADDRESS_REQUEST, createDreamAddress);
}
function* createDreamAddress(action) {
  try {
    const res = yield app.createDreamAddress(action.payload)
    if (res?.status == 200) {
      console.log('ressss', res?.data)
      yield put({
        type: types.CREATE_DREAM_ADDRESS_SUCCESS,
        payload: res?.data,
      });
      action.onSuccess?.()
    }
  } catch (error) {
    console.log('error', error?.response?.data)
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    Alert.alert('Error', msg || 'Something went wrong!');
  } finally {
    yield put({
      type: types.CREATE_DREAM_ADDRESS_FINALLY
    });
    action.onFinally?.()
  }
}

//Get dream addresses
export function* getDreamAddressesRequest() {
  yield takeLatest(types.GET_DREAM_ADDRESSES_REQUEST, getDreamAddresses);
}
function* getDreamAddresses() {
  try {
    const res = yield app.getDreamAddresses()
    if (res?.status == 200) {
      yield put({
        type: types.GET_DREAM_ADDRESSES_SUCCESS,
        payload: res?.data || [],
      });
    }
  } catch (error) {
    console.log('error', error?.response?.data)
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    Alert.alert('Error', msg || 'Something went wrong!');
  } finally {
    yield put({
      type: types.GET_DREAM_ADDRESSES_FINALLY
    });
  }
}

//Delete dream address
export function* deleteDreamAddressRequest() {
  yield takeLatest(types.DELETE_DREAM_ADDRESS_REQUEST, deleteDreamAddress);
}
function* deleteDreamAddress(action) {
  try {
    const res = yield app.deleteDreamAddress(action.payload.id)
    if (res?.status == 200) {
      yield put({
        type: types.DELETE_DREAM_ADDRESS_SUCCESS,
        payload: action.payload,
      });
      action.onSuccess?.()
    } else {
      Alert.alert('Error', res?.data?.message || 'Something went wrong!');
    }
  } catch (error) {
    console.log('error', error?.response?.data)
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    Alert.alert('Error', msg || 'Something went wrong!');
  } finally {
    yield put({
      type: types.DELETE_DREAM_ADDRESS_FINALLY
    });
    action.onFinally?.()
  }
}

//Get matched properties
export function* getMatchedPropertiesRequest() {
  yield takeLatest(types.GET_MATCHED_PROPERTIES_REQUEST, getMatchedProp);
}
function* getMatchedProp(action) {
  // console.log('matchedddd start', action.payload.page)
  try {
    const res = yield app.getMatchedProperties(action.payload.page)
    console.log('matchedddd ', action.payload.page,res.data)
    if (res?.status == 200 && res?.data?.length > 0) {
      yield put({
        type: types.GET_MATCHED_PROPERTIES_SUCCESS,
        payload: {
          page: action.payload.page,
          data: res?.data?.sort((a, b) => b.percentage - a.percentage) || []
        },
      });
    }
  } catch (error) {
    console.log('error', error?.response?.data)
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    Alert.alert('Error', msg || 'Something went wrong!');
  } finally {
    action.onFinally?.()
    yield put({
      type: types.GET_MATCHED_PROPERTIES_FINALLY
    });
  }
}

//Get matched properties
export function* getBuyPropertiesRequest() {
  yield takeLatest(types.GET_BUY_PROPERTIES_REQUEST, getBuyProp);
}
function* getBuyProp(action) {
  // console.log('matchedddd start getBuyPropertiesRequest', action.payload.page)
  try {
    const res = yield app.getBuyProperties(action.payload.page)
    // console.log('buy properties ', res.data)
    if (res?.status == 200 && res?.data?.length > 0) {
      yield put({
        type: types.GET_BUY_PROPERTIES_SUCCESS,
        payload: {
          page: action.payload.page,
          data: res?.data?.sort((a, b) => b.percentage - a.percentage) || []
        },
      });
    }
  } catch (error) {
    console.log('error', error?.response?.data)
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    Alert.alert('Error', msg || 'Something went wrong!');
  } finally {
    action.onFinally?.()
    yield put({
      type: types.GET_BUY_PROPERTIES_FINALLY
    });
  }
}

//Get top support closers
export function* getTopSupportClosersRequest() {
  yield takeLatest(types.GET_TOP_SUPPORT_CLOSERS_REQUEST, getTopSupportClosers);
}
function* getTopSupportClosers() {
  try {
    const res = yield app.getTopSupportClosers()
    if (res?.status == 200) {
      yield put({
        type: types.GET_TOP_SUPPORT_CLOSERS_SUCCESS,
        payload: res?.data || [],
      });
    }
  } catch (error) {
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    // Alert.alert('Error', msg || 'Something went wrong!');
  } finally {
    yield put({
      type: types.GET_TOP_SUPPORT_CLOSERS_FINALLY
    });
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
