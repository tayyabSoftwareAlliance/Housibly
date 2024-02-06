import * as TYPES from '../types';

//Get All Notifications
export const get_all_notification = () => {
  return {
    type: TYPES.GET_ALL_NOTIFICATIONS_REQUEST,
  };
};
