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
//Get Recent Properties
export const get_recent_properties = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_RECENT_PROPERTIES_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Get Filtered Properties
export const get_filtered_properties = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_FILTERED_PROPERTIES_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Get All Properties
export const get_all_properties = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_ALL_PROPERTIES_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};
