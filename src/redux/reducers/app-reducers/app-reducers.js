import { currency_list } from '../../../shared/exporter';
import * as TYPES from '../../actions/types';

const initialState = {
  loading: false,
  isSuccess: false,
  isFailure: false,
  saved_create_property_data: null,
  sublists: {},
  address: '',
  all_properties: [],
  my_preference: { property_type: 'house', currency_type: currency_list[0] },
  matched_properties: { lastPage: 0, data: [] },
  top_support_closers: []
};

const appReducers = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case TYPES.SAVE_CREATE_PROPERTY_DATA:
      return {
        ...state,
        saved_create_property_data: payload,
      };
    case TYPES.REMOVE_CREATE_PROPERTY_DATA:
      return {
        ...state,
        saved_create_property_data: null,
      };

    //************Get Sublists*************
    case TYPES.GET_SUBLISTS_SUCCESS:
      return {
        ...state,
        sublists: payload || {},
      };

    //************ Create My Property states*************
    case TYPES.CREATE_MY_PROPERTY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.CREATE_MY_PROPERTY_SUCCESS:
      return {
        ...state,
        all_properties: [{ ...payload }, ...state.all_properties],
      };
    case TYPES.CREATE_MY_PROPERTY_FINALLY:
      return {
        ...state,
        loading: false,
      };

    //************ Get My Properties states*************
    case TYPES.GET_MY_PROPERTIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.GET_MY_PROPERTIES_SUCCESS:
      return {
        ...state,
        all_properties: payload,
      };
    case TYPES.GET_MY_PROPERTIES_FINALLY:
      return {
        ...state,
        loading: false,
      };

    //************ Update My Property states*************
    case TYPES.UPDATE_MY_PROPERTY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.UPDATE_MY_PROPERTY_SUCCESS:
      return {
        ...state,
        all_properties: state.all_properties.map(item => {
          if (item.id == payload.id) return { ...payload.data };
          else return item;
        }),
      };
    case TYPES.UPDATE_MY_PROPERTY_FINALLY:
      return {
        ...state,
        loading: false,
      };

    //************ Delete My Properties states*************
    case TYPES.DELETE_MY_PROPERTY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.DELETE_MY_PROPERTY_SUCCESS:
      return {
        ...state,
        all_properties: state.all_properties.filter(item => item.id != payload),
      };
    case TYPES.DELETE_MY_PROPERTY_FINALLY:
      return {
        ...state,
        loading: false,
      };

    //************ Get My Preference states*************
    case TYPES.GET_MY_PREFERENCE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.GET_MY_PREFERENCE_SUCCESS:
      return {
        ...state,
        my_preference: { ...payload }
      };
    case TYPES.GET_MY_PREFERENCE_FINALLY:
      return {
        ...state,
        loading: false,
      };

    //************ Update My Preference states*************
    case TYPES.UPDATE_MY_PREFERENCE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.UPDATE_MY_PREFERENCE_SUCCESS:
      return {
        ...state,
        my_preference: { ...payload }
      };
    case TYPES.UPDATE_MY_PREFERENCE_FINALLY:
      return {
        ...state,
        loading: false,
      };

    //************ Get Matched Properties states*************
    case TYPES.GET_MATCHED_PROPERTIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.GET_MATCHED_PROPERTIES_SUCCESS:
      return {
        ...state,
        matched_properties: {
          lastPage: payload.data.length > 0 ? payload.page : state.matched_properties.lastPage,
          data:
            payload.page == 1 ?
              payload.data :
              [...state.matched_properties.data, ...payload.data]
        }
      };
    case TYPES.GET_MATCHED_PROPERTIES_FINALLY:
      return {
        ...state,
        loading: false,
      };


    //************ Get Top Support Closers states*************
    case TYPES.GET_TOP_SUPPORT_CLOSERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.GET_TOP_SUPPORT_CLOSERS_SUCCESS:
      return {
        ...state,
        top_support_closers: payload,
      };
    case TYPES.GET_TOP_SUPPORT_CLOSERS_FINALLY:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default appReducers;
