import * as TYPES from '../../actions/types';

const initialState = {
  loading: false,
  isSuccess: false,
  isFailure: false,
  userProfile: null,
  payment_card_list: [],
  pay_with_debit: null,
  pay_with_social: null,
  default_card: null,
};

const settingsReducers = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {
    //************User Get Profile states*************
    case TYPES.GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        userProfile: state.userProfile ? { ...state.userProfile, user: payload } : { user: payload },
      };
    case TYPES.GET_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        userProfile: null,
      };

    //************User Update Profile states*************
    case TYPES.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        userProfile: state.userProfile ? { ...state.userProfile, user: payload } : { user: payload },
      };
    case TYPES.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };
    // Add Support Info Success
    case TYPES.ADD_SUPPORT_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        userProfile: payload,
      };
    // Add Card Success
    case TYPES.ADD_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };

    case TYPES.ADD_CARD_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        payment_card_list: state.payment_card_list,
      };

    // Edit Card Success
    case TYPES.EDIT_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };

    case TYPES.EDIT_CARD_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        payment_card_list: state.payment_card_list,
      };

    // default Card Success
    case TYPES.ADD_DEFAULT_CARD_SUCCESS:
      state.payment_card_list.map((item, index) => {
        if (index == payload.id) {
          state.payment_card_list[index].default = true;
        } else {
          state.payment_card_list[index].default = false;
        }
      });
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        payment_card_list: state.payment_card_list,
      };

    case TYPES.ADD_DEFAULT_CARD_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        payment_card_list: state.payment_card_list,
      };

    // del Card Success
    case TYPES.DELETE_CARD_SUCCESS:
      const filteredItems = state.payment_card_list.filter(item => {
        return item.id !== payload?.card_id;
      });
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        payment_card_list: [...filteredItems],
      };

    case TYPES.DELETE_CARD_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        payment_card_list: state?.payment_card_list,
      };

    // Get Card Success
    case TYPES.GET_DEFAULT_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        default_card: payload,
      };

    case TYPES.GET_DEFAULT_CARD_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        default_card: null,
      };

    //Get all card Success
    case TYPES.GET_CARD_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        payment_card_list: payload,
      };

    case TYPES.GET_CARD_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        payment_card_list: [],
      };

    //************Pay With Debit Card*************
    case TYPES.PAY_WITH_DEBIT_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        pay_with_debit: payload,
      };

    case TYPES.PAY_WITH_DEBIT_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        pay_with_debit: null,
      };
    //************Pay With Google Card*************
    case TYPES.PAY_WITH_SOCIAL_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        pay_with_social: payload,
      };

    case TYPES.PAY_WITH_SOCIAL_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        pay_with_social: null,
      };

    //************Social Login Sates*************

    case TYPES.SOCIAL_LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        userProfile: payload,
      };

    //************Logout Sates*************
    case TYPES.LOGOUT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        userProfile: null,
      };

    default:
      return state;
  }
};

export default settingsReducers;
