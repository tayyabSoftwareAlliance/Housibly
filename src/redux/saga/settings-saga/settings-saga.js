import { takeLatest, put } from 'redux-saga/effects';
import { responseValidator } from '../../../shared/exporter';
import {
  addDebitCard,
  delDebitCard,
  editDebitCard,
  getAllPaymentCards,
  getDefaultCard,
  getUserData,
  setDefaultCard,
  updateUserData,
} from '../../../shared/service/SettingsService';
import * as types from '../../actions/types';
import { setting } from '../../../shared/api';

// *************Get Profile Info**************
export function* getProfileRequest() {
  yield takeLatest(types.GET_PROFILE_REQUEST, getProfile);
}
function* getProfile(params) {
  try {
    const res = yield setting.getProfile();
    if (res?.status == 200) {
      yield put({
        type: types.GET_PROFILE_SUCCESS,
        payload: res.data,
      });
      params?.cbSuccess(res.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_PROFILE_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************Update Profile Request**************
export function* updateProfileRequest() {
  yield takeLatest(types.UPDATE_PROFILE_REQUEST, updateProfile);
}

function* updateProfile(params) {
  try {
    const res = yield setting.updateProfile(params?.params);
    console.log('res',res)
    if (res?.status == 200) {
      yield put({
        type: types.UPDATE_PROFILE_SUCCESS,
        payload: res.data,
      });
      params?.cbSuccess(res.data)
    } else {
      yield put({
        type: types.UPDATE_PROFILE_FAILURE,
        payload: null,
      });
      params?.cbFailure(res?.data);
    }
  } catch (error) {
    console.log('error',error);
    yield put({
      type: types.UPDATE_PROFILE_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status);
    params?.cbFailure(msg);
  }
}

//Payments

// *************ADD CARD SEGA**************
export function* addcardRequest() {
  yield takeLatest(types.ADD_CARD_REQUEST, addCard);
}
function* addCard(params) {
  try {
    const res = yield addDebitCard(params?.params);
    if (res) {
      yield put({
        type: types.ADD_CARD_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.ADD_CARD_FAILURE,
      payload: null,
    });

    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************EDIT CARD SEGA**************
export function* editcardRequest() {
  yield takeLatest(types.EDIT_CARD_REQUEST, editCard);
}
function* editCard(params) {
  try {
    const res = yield editDebitCard(params?.params);
    if (res) {
      yield put({
        type: types.EDIT_CARD_SUCCESS,
        payload: res,
      });

      params?.cbSuccess(res);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.EDIT_CARD_FAILURE,
      payload: null,
    });

    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************GET PAYMENT CARD SEGA**************
export function* getPaymentCardRequest() {
  yield takeLatest(types.GET_CARD_LIST_REQUEST, paymentsCards);
}
function* paymentsCards(params) {
  try {
    const res = yield getAllPaymentCards();
    if (res) {
      yield put({
        type: types.GET_CARD_LIST_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    console.log(error?.response?.status);
    yield put({
      type: types.GET_CARD_LIST_FAILURE,
      payload: null,
    });

    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************PAY WITH DEBIT SEGA**************
export function* payWithDebitRequest() {
  yield takeLatest(types.PAY_WITH_DEBIT_REQUEST, payWithDebit);
}
function* payWithDebit(params) {
  try {
    const res = yield payWithDebitCard(params?.route, params?.params);
    if (res.data) {
      yield put({
        type: types.PAY_WITH_DEBIT_SUCCESS,
        payload: res.data,
      });
      params?.cbSuccess(res.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.PAY_WITH_DEBIT_FAILURE,
      payload: null,
    });

    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************PAY WITH SOCIAL SEGA**************
export function* payWithSocialAccountRequest() {
  yield takeLatest(types.PAY_WITH_SOCIAL_REQUEST, payWithSocial);
}
function* payWithSocial(params) {
  try {
    const res = yield payWithSocialCard(params?.payment_type, params?.params);
    if (res.data) {
      yield put({
        type: types.PAY_WITH_SOCIAL_SUCCESS,
        payload: res.data,
      });
      params?.cbSuccess(res.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.PAY_WITH_SOCIAL_FAILURE,
      payload: null,
    });

    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************Delete CARD SEGA**************
export function* delCardRequest() {
  yield takeLatest(types.DELETE_CARD_REQUEST, delCard);
}
function* delCard(params) {
  try {
    const res = yield delDebitCard(params?.params);
    if (res) {
      yield put({
        type: types.DELETE_CARD_SUCCESS,
        payload: params?.params,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.DELETE_CARD_FAILURE,
      payload: null,
    });

    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************DEFAULT CARD SEGA**************
export function* defaultCardRequest() {
  yield takeLatest(types.ADD_DEFAULT_CARD_REQUEST, defaultCard);
}
function* defaultCard(params) {
  try {
    var form = new FormData();
    form.append('payment[id]', params?.params?.card?.card?.id);
    const res = yield setDefaultCard(form);
    if (res) {
      yield put({
        type: types.ADD_DEFAULT_CARD_SUCCESS,
        payload: params?.params,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.ADD_DEFAULT_CARD_FAILURE,
      payload: null,
    });

    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************GET DEFAULT CARD SEGA**************
export function* getdefaultCardRequest() {
  yield takeLatest(types.GET_DEFAULT_CARD_REQUEST, getdefaultCard);
}
function* getdefaultCard(params) {
  try {
    const res = yield getDefaultCard();

    yield put({
      type: types.GET_DEFAULT_CARD_SUCCESS,
      payload: res,
    });
    params?.cbSuccess(res);
  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_DEFAULT_CARD_FAILURE,
      payload: null,
    });

    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}
