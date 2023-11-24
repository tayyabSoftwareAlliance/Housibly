import * as TYPES from '../../actions/types';

const initialState = {
  loading: false,
  isSuccess: false,
  isFailure: false,
  add_property_detail: null,
  sublists: {},
  address: '',
  recent_properties: [],
  all_properties: [],
  filtered_properties: [],
};

const appReducers = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {

    //************Get Sublists*************
    case TYPES.GET_SUBLISTS_SUCCESS:
      return {
        ...state,
        sublists: payload || {},
      };

    //************Add Property*************
    case TYPES.SAVE_CREATE_PROPERTY_DATA:
      return {
        ...state,
        add_property_detail: payload,
      };

    //************ Get Recent Properties states*************
    case TYPES.GET_RECENT_PROPERTIES_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        recent_properties: payload,
      };
    case TYPES.GET_RECENT_PROPERTIES_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        recent_properties: null,
      };

    //************ Get All Properties states*************
    case TYPES.GET_ALL_PROPERTIES_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        all_properties: payload,
      };
    case TYPES.GET_ALL_PROPERTIES_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        all_properties: null,
      };

    //************ Get Filtered Properties states*************
    case TYPES.GET_FILTERED_PROPERTIES_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        filtered_properties: payload,
      };
    case TYPES.GET_FILTERED_PROPERTIES_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        filtered_properties: null,
      };

    case TYPES.SET_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        address: payload,
      };

    default:
      return state;
  }
};

export default appReducers;
