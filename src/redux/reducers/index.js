import {combineReducers} from 'redux';
import authReducer from './auth-reducers/auth-reducer';
import settingsReducers from './settings-reducers/settings-reducers';
import appReducer from './app-reducers/app-reducers';

import * as types from '../actions/types';
import chatReducers from './chat-reducers/chat-reducers';
import notificationReducers from './notification-reducers/notification-reducers';

const root_reducer = combineReducers({
  /* your app’s top-level reducers */
  auth: authReducer,
  settings: settingsReducers,
  appReducer: appReducer,
  chat: chatReducers,
  notification: notificationReducers,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === types.LOGOUT_REQUEST_SUCCESS) {
    state = undefined;
  }

  return root_reducer(state, action);
};

export default rootReducer;
