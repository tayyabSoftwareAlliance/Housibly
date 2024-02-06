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

    default:
      return state;
  }
};

export default notificationReducers;
