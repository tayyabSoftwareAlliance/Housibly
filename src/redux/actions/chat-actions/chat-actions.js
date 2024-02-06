import * as TYPES from '../types';

//Get All Chats
export const get_all_chats = () => {
  return {
    type: TYPES.GET_ALL_CHATS_REQUEST,
  };
};

//Delete Chat
export const delete_chat = (id,onSuccess) => {
  return {
    type: TYPES.DELETE_CHAT_REQUEST,
    payload:{id},
    onSuccess
  };
};


//Read Chat Messages
export const read_chat_messages = (id) => {
  return {
    type: TYPES.READ_CHAT_MESSAGES_REQUEST,
    payload:{id},
  };
};
