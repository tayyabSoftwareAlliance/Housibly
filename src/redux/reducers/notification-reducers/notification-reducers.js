import { currency_list } from '../../../shared/exporter';
import * as TYPES from '../../actions/types';

const initialState = {
  loading: false,
  all_notifications: []
};

const notificationReducers = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {

    //************ Get All Notifications States*************
    case TYPES.GET_ALL_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.GET_ALL_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        all_notifications: payload,
      };
    case TYPES.GET_ALL_NOTIFICATIONS_FINALLY:
      return {
        ...state,
        loading: false,
      };

    //************ Notification Seen States*************
    case TYPES.NOTIFICATION_SEEN:
      return {
        ...state,
        all_notifications: state.all_notifications.map(item => {
          if (item.id == payload.id) {
            item.seen = true
            return { ...item }
          }
          return item
        }),
      };

    //************ Notification Add States*************
    case TYPES.ADD_NOTIFICATION:
      return {
        ...state,
        all_notifications:[payload.notification,...state.all_notifications]
      };

    default:
      return state;
  }
};

export default notificationReducers;
