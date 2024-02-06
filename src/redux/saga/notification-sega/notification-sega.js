import { takeLatest, put } from 'redux-saga/effects';
import { responseValidator } from '../../../shared/exporter';
import * as types from '../../actions/types';
import { app } from '../../../shared/api';
import { Alert } from 'react-native';

//Get all notifications
export function* getAllNotificationsRequest() {
  yield takeLatest(types.GET_ALL_NOTIFICATIONS_REQUEST, getAllNotifications);
}
function* getAllNotifications() {
  try {
    const res = yield app.getAllChats()
    if (res?.status == 200) {
      yield put({
        type: types.GET_ALL_NOTIFICATIONS_SUCCESS,
        payload: res?.data || [],
      });
    }
  } catch (error) {
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    Alert.alert('Error', msg || 'Something went wrong!');
  } finally {
    yield put({
      type: types.GET_ALL_NOTIFICATIONS_FINALLY
    });
  }
}