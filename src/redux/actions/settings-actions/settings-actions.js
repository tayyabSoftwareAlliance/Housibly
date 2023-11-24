import * as TYPES from '../types';

// get profile info
export const getProfileRequest = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_PROFILE_REQUEST,
    cbSuccess,
    cbFailure,
  };
};

// update profile
export const updateProfileRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.UPDATE_PROFILE_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//get Payment Cards
export const get_payment_cards_request = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_CARD_LIST_REQUEST,
    cbSuccess,
    cbFailure,
  };
};
//Set Payment
export const add_card_request = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.ADD_CARD_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Edit Payment
export const edit_card_request = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.EDIT_CARD_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Set Default Payment
export const default_card_request = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.ADD_DEFAULT_CARD_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Set Payment
export const delete_card_request = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.DELETE_CARD_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Pay with Debit
export const get_default_card_request = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_DEFAULT_CARD_REQUEST,
    cbSuccess,
    cbFailure,
  };
};

//Pay with Debit
export const pay_with_debit_request = (route, params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.PAY_WITH_DEBIT_REQUEST,
    route,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Pay with Google
export const pay_with_social_request = (
  payment_type,
  params,
  cbSuccess,
  cbFailure,
) => {
  return {
    type: TYPES.PAY_WITH_SOCIAL_REQUEST,
    payment_type,
    params,
    cbSuccess,
    cbFailure,
  };
};
