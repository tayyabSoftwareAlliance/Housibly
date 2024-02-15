import * as TYPES from '../types';

//Get All Notifications
export const get_all_notifications = () => {
  return {
    type: TYPES.GET_ALL_NOTIFICATIONS_REQUEST,
  };
};

//Add Notification
export const add_notification = (notification) => {
  return {
    type: TYPES.ADD_NOTIFICATION,
    payload: { notification }
  };
};

// Notification seen
export const seen_notification = (id) => {
  return {
    type: TYPES.NOTIFICATION_SEEN,
    payload: { id }
  };
};

