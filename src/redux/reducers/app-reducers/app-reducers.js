import * as TYPES from '../../actions/types';

const initialState = {
  loading: false,
  isSuccess: false,
  isFailure: false,
  saved_create_property_data: null,
  sublists: {},
  address: '',
  all_properties: [],
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
          if (item.id == payload.id)
            return { ...payload.data }
          else
            return item
        }),
      };
    case TYPES.UPDATE_MY_PROPERTY_FINALLY:
      return {
        ...state,
        loading: false,
      };

    //************ Get My Properties states*************
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

    default:
      return state;
  }
};

export default appReducers;
