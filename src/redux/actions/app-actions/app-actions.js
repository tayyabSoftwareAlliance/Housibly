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

export const set_address_request = (params, cbSuccess) => {
  return {
    type: TYPES.SET_ADDRESS_REQUEST,
    params,
    cbSuccess,
  };
};

//Get My Properties
export const create_my_property = (payload,onSuccess) => {
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

//Get My Properties
export const update_my_property = (payload,onSuccess) => {
  return {
    type: TYPES.UPDATE_MY_PROPERTY_REQUEST,
    payload,
    onSuccess
  };
};

//Get My Properties
export const delete_my_property = (payload,onSuccess) => {
  return {
    type: TYPES.DELETE_MY_PROPERTY_REQUEST,
    payload,
    onSuccess
  };
};