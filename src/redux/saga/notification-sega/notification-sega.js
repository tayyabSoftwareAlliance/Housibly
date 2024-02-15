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
    const res = yield app.getAllNotifications()
    if (res?.status == 200 && res.data?.length > 0) {
      const arr = res.data.map(item => {
        console.log('item', item)
        return {
          id: item.id,
          title: item.title,
          body: item.action,
          image: item.type == 'message' ? item.sender_avatar : item.type == 'buy_property' ? item.property_image : item.type == 'sell_property' ? item.sender_avatar : '',
          type: item.type,
          seen: item.seen,
          time: new Date(item.created_at),
          data: item.type == 'message' ? {
            conversation_id: item.conversation_id,
            sender_id: item.sender_id,
            sender_name: item.sender_name,
          } : item.type == 'buy_property' ? {
            property_id: item.property_id,
          } : item.type == 'sell_property' ? {
            property_id: item.property_id,
            property_owner_id: item.sender_id,
            property_owner_name: item.title,
          } : {}
        }
      })
      yield put({
        type: types.GET_ALL_NOTIFICATIONS_SUCCESS,
        payload: arr,
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