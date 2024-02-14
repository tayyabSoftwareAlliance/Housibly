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
    if (res?.status == 200 && res.data?.notification?.length > 0) {
      const arr = res.data.notification.map(item => {
        console.log('item', item)
        return {
          id: item.id,
          title: item.title,
          body: item.action,
          type: item.event_type,
          seen: item.seen,
          time: new Date(item.created_at),
          data: item.event_type == 'message' ? {
            conversation_id: item.conversation_id,
            sender_id: item.sender_id,
            sender_name: item.sender_name,
            sender_avatar: item.sender_avatar,
          } : item.event_type == 'buy_property' ? {
            property_id: item.property_id,
            property_image: item.property_image,
          } : item.event_type == 'sell_property' ? {
            property_id: item.property_id,
            property_owner_image:item.property_owner_image,
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