import * as TYPES from '../../actions/types';

const house_type_list = [
  { id: 1, title: 'Attached/Row/Townhouse' },
  { id: 2, title: 'Semi-Detached' },
  { id: 3, title: 'Detached' },
  { id: 4, title: 'Mobile/Trailer' },
  { id: 5, title: 'Duplex (2 units)' },
  { id: 6, title: 'Multiplex (4+ units)' },
  { id: 7, title: 'Cottage' }
]
const house_style_list = [
  { id: 1, title: 'Bungalow (1 storey)' },
  { id: 2, title: '1 1/2 Storey' },
  { id: 3, title: '2 Storey' },
  { id: 4, title: '2 1/2 Storey' },
  { id: 5, title: '3 Storey' },
  { id: 6, title: 'Backsplit' },
  { id: 7, title: 'Sidesplit' }
]
const condo_type_list = [
  { id: 1, title: 'Condo Apartment' },
  { id: 2, title: 'Condo Townhouse' },
  { id: 3, title: 'Co-op/Co-Ownership' },
  { id: 4, title: 'Detached Condo' },
  { id: 5, title: 'Semi-Detached Condo' },
]
const condo_style_list = [
  { id: 1, title: 'Apartment' },
  { id: 2, title: 'Townhouse' },
  { id: 3, title: '2 Storey' },
  { id: 4, title: '3 Storey' },
  { id: 5, title: 'Studio/Bachelor' },
  { id: 6, title: 'Loft' },
  { id: 7, title: 'Multi-Level' },
]
const exterior_list = [
  { id: 1, title: 'Brick' },
  { id: 2, title: 'Concrete' },
  { id: 3, title: 'Glass' },
  { id: 4, title: 'Metal siding' },
  { id: 5, title: 'Stone' },
  { id: 6, title: 'Stucco' },
  { id: 7, title: 'Vinyl' },
  { id: 8, title: 'Wood' },
  { id: 9, title: 'Other' }
]
const balcony_list = [
  { id: 1, title: 'Yes' },
  { id: 2, title: 'No' },
  { id: 3, title: 'Terrace' },
]
const exposure_list = [
  { id: 1, title: 'North' },
  { id: 2, title: 'Nothest' },
  { id: 3, title: 'Northwest' },
]
const security_list = [
  { id: 1, title: 'Guard' },
  { id: 2, title: 'System' },
  { id: 3, title: 'None' },
]
const pets_allowed_list = [
  { id: 1, title: 'No' },
  { id: 2, title: 'Yes' },
  { id: 3, title: 'Yes with Restrictions' },
]
const utilities_list = [
  { id: 1, title: 'Electricity' },
  { id: 2, title: 'Water' },
  { id: 3, title: 'Cable TV' },
  { id: 4, title: 'Internet' },
]
const basement_list = [
  { id: 1, title: 'Apartment' },
  { id: 2, title: 'Finished' },
  { id: 3, title: 'Separate Entrance' },
  { id: 4, title: 'Unfinished' },
  { id: 5, title: 'Walk-Out' },
  { id: 6, title: 'None' }
]
const driveway_list = [
  { id: 1, title: 'Private' },
  { id: 2, title: 'Mutual' },
  { id: 3, title: 'Lane-way' },
  { id: 4, title: 'Front Yard' },
  { id: 5, title: 'None' },
  { id: 6, title: 'Other' }
]
const water_list = [
  { id: 1, title: 'municipal' },
  { id: 2, title: 'well' },
  { id: 3, title: 'Other' }
]
const sewer_list = [
  { id: 1, title: 'municipal' },
  { id: 2, title: 'septic' },
  { id: 3, title: 'Other' }
]
const heat_source_list = [
  { id: 1, title: 'Electricity' },
  { id: 2, title: 'Oil' },
  { id: 3, title: 'Gas' },
  { id: 4, title: 'Propane' },
  { id: 5, title: 'Solar' },
  { id: 6, title: 'Other' }
]
const heat_type_list = [
  { id: 1, title: 'Forced Air' },
  { id: 2, title: 'Baseboard Heater' },
  { id: 3, title: 'Water/Radiant' },
  { id: 4, title: 'Other' },
]
const air_conditioner_list = [
  { id: 1, title: 'Central Air' },
  { id: 2, title: 'Wall Unit' },
  { id: 3, title: 'Window Unit' },
  { id: 4, title: 'None' },
  { id: 5, title: 'Other' },
]
const fireplace_list = [
  { id: 1, title: 'Gas' },
  { id: 2, title: 'Wood' },
  { id: 3, title: 'None' },
]
const pool_list = [
  { id: 1, title: 'No' },
  { id: 2, title: 'In-ground' },
  { id: 3, title: 'Above Ground' },
]

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
