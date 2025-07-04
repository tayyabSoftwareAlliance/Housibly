import * as TYPES from '../types';

//add sublists
export const getSublists = () => {
  return {
    type: TYPES.GET_SUBLISTS,
  };
};

// save create property data
export const saveCreatePropertyData = (payload) => {
  return {
    type: TYPES.SAVE_CREATE_PROPERTY_DATA,
    payload
  };
};

// remove create property data
export const removeCreatePropertyData = () => {
  return {
    type: TYPES.REMOVE_CREATE_PROPERTY_DATA,
  };
};

export const set_address_request = (params, cbSuccess) => {
  return {
    type: TYPES.SET_ADDRESS_REQUEST,
    params,
    cbSuccess,
  };
};

//Create My Property
export const create_my_property = (payload, onSuccess) => {
  return {
    type: TYPES.CREATE_MY_PROPERTY_REQUEST,
    payload,
    onSuccess
  };
};

//Get My Properties
export const get_my_properties = () => {
  return {
    type: TYPES.GET_MY_PROPERTIES_REQUEST,
  };
};

//Update My Property
export const update_my_property = (payload, onSuccess) => {
  return {
    type: TYPES.UPDATE_MY_PROPERTY_REQUEST,
    payload,
    onSuccess
  };
};

//Delete My Property
export const delete_my_property = (payload, onSuccess) => {
  return {
    type: TYPES.DELETE_MY_PROPERTY_REQUEST,
    payload,
    onSuccess
  };
};

//Get My Preference
export const get_my_preference = (onSuccess) => {
  return {
    type: TYPES.GET_MY_PREFERENCE_REQUEST,
    onSuccess
  };
};

//Update My Preference
export const update_my_preference = (payload, onSuccess) => {
  return {
    type: TYPES.UPDATE_MY_PREFERENCE_REQUEST,
    payload,
    onSuccess
  };
};

//Create dream address
export const create_dream_address = (payload, onSuccess, onFinally) => {
  return {
    type: TYPES.CREATE_DREAM_ADDRESS_REQUEST,
    payload,
    onSuccess,
    onFinally
  };
};

//Get dream addresses
export const get_dream_addresses = () => {
  return {
    type: TYPES.GET_DREAM_ADDRESSES_REQUEST,
  };
};

//Delete dream address
export const delete_dream_address = (payload, onSuccess, onFinally) => {
  return {
    type: TYPES.DELETE_DREAM_ADDRESS_REQUEST,
    payload,
    onSuccess,
    onFinally
  };
};

//Get Matched Properties
export const get_matched_properties = (page, onFinally) => {
  return {
    type: TYPES.GET_MATCHED_PROPERTIES_REQUEST,
    payload: { page },
    onFinally
  };
};

//Get Buy Properties
export const get_buy_properties = (page, onFinally) => {
  return {
    type: TYPES.GET_BUY_PROPERTIES_REQUEST,
    payload: { page },
    onFinally
  };
};

//Get Top Support Closers
export const get_top_support_closers = () => {
  return {
    type: TYPES.GET_TOP_SUPPORT_CLOSERS_REQUEST,
  };
};

export const set_conversation_opened_id = (id) => {
  return {
    type: TYPES.SET_CONVERSATION_OPENED_ID,
    payload: { id }
  };
};

export const set_in_app_notification_to_show = (notification) => {
  return {
    type: TYPES.SET_IN_APP_NOTIFICATION_TO_SHOW,
    payload: { notification }
  };
};
