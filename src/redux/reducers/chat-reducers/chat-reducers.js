import { currency_list } from '../../../shared/exporter';
import * as TYPES from '../../actions/types';

const initialState = {
  delete_loader: false,
  all_chats: []
};

const chatReducers = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {

    //************ Get All Chats States*************
    case TYPES.GET_ALL_CHATS_SUCCESS:
      return {
        ...state,
        all_chats: payload,
      };

    //************ Delete Chat States*************
    case TYPES.DELETE_CHAT_REQUEST:
      return {
        ...state,
        delete_loader: true,
      };
    case TYPES.DELETE_CHAT_SUCCESS:
      return {
        ...state,
        all_chats: state.all_chats.filter(item => item.id != payload.id),
      };
    case TYPES.DELETE_CHAT_FINALLY:
      return {
        ...state,
        delete_loader: false,
      };

    //************ Read Chat Messages States*************
    case TYPES.READ_CHAT_MESSAGES_SUCCESS:
      return {
        ...state,
        all_chats: state.all_chats.map(item => {
          if (item.id == payload.id) {
            item.unread_message = 0
            return { ...item }
          }
          return item
        }),
      };

    default:
      return state;
  }
};

export default chatReducers;
