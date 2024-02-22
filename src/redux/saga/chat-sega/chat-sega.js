import { takeLatest, put } from 'redux-saga/effects';
import { responseValidator } from '../../../shared/exporter';
import * as types from '../../actions/types';
import { app } from '../../../shared/api';
import { Alert } from 'react-native';

//Get all chats
export function* getAllChatsRequest() {
  yield takeLatest(types.GET_ALL_CHATS_REQUEST, getAllChats);
}
function* getAllChats(params) {
  try {
    const res = yield app.getAllChats()
    if (res?.status == 200) {
      const arr = res.data?.sort((a, b) => new Date(b.updated_at)?.getTime() - new Date(a.updated_at)?.getTime())
      yield put({
        type: types.GET_ALL_CHATS_SUCCESS,
        payload: arr || [],
      });
    }
  } catch (error) {
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    Alert.alert('Error', msg || 'Something went wrong!');
  } finally {
    params?.onFinally?.()
  }
}

//Delete chat
export function* deleteChatRequest() {
  yield takeLatest(types.DELETE_CHAT_REQUEST, deleteChat);
}
function* deleteChat(action) {
  try {
    const res = yield app.deleteChat(action.payload.id)
    if (res?.status == 200) {
      yield put({
        type: types.DELETE_CHAT_SUCCESS,
        payload: action.payload,
      });
      action.onSuccess()
    }
  } catch (error) {
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    Alert.alert('Error', msg || 'Something went wrong!');
  } finally {
    yield put({
      type: types.DELETE_CHAT_FINALLY
    });
  }
}

//Delete chat
export function* readChatMessagesRequest() {
  yield takeLatest(types.READ_CHAT_MESSAGES_REQUEST, readChatMessages);
}
function* readChatMessages(action) {
  console.log('Read Messagessss')
  try {
    const formData = new FormData()
    formData.append('conversation_id', action.payload.id)
    const res = yield app.readMessages(formData);
    console.log('ressss',res?.data)
    if (res?.status == 200) {
      yield put({
        type: types.READ_CHAT_MESSAGES_SUCCESS,
        payload: action.payload,
      });
    }
  } catch (error) {
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    // Alert.alert('Error', msg || 'Something went wrong!');
  }
}