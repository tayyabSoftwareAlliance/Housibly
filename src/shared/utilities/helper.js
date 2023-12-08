import NetInfo from '@react-native-community/netinfo';
import { createContext, useContext, useEffect } from 'react';
import { appIcons, IOS, lot_area_unit_list, lot_unit_list, WP } from '../exporter';
import moment from 'moment';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { Platform } from 'react-native';
import { isLocationEnabled, promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';

export const checkConnected = () => {
  return NetInfo.fetch().then(state => {
    return state.isConnected;
  });
};
const OnlineStatusContext = createContext(true);
export const OnlineStatusProvider = ({ children }) => {
  const [isOffline, setOfflineStatus] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });
    return () => removeNetInfoSubscription();
  }, []);
  return (
    <OnlineStatusContext.Provider value={isOffline}>
      {children}
    </OnlineStatusContext.Provider>
  );
};
export const useOnlineStatus = () => {
  const store = useContext(OnlineStatusContext);
  return store;
};
export const capitalizeFirstLetter = string => {
  if (typeof string == 'string')
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  return string
};
export const responseValidator = (response, errorMsg) => {
  let errorCode = response;
  if (errorCode == 401) {
    if (errorMsg) {
      const msg = errorMsg?.message;
      return msg;
    } else {
      return 'Something went wrong!';
    }
  } else if (errorCode == 400) {
    if (errorMsg) {
      const msg = errorMsg?.message;
      return msg;
    } else {
      return 'Something went wrong!';
    }
  } else if (errorCode == 404) {
    if (errorMsg) {
      const msg = errorMsg?.message;
      return msg;
    } else {
      return 'Something went wrong!';
    }
  } else if (errorCode == 422) {
    if (errorMsg) {
      const msg = errorMsg?.message;
      return msg;
    } else {
      return 'Something went wrong!';
    }
  } else if (errorCode == 500) {
    if (errorMsg) {
      const msg = errorMsg?.message;
      return msg;
    } else {
      return 'Internal Server Error Please Try Again!';
    }
  } else {
    return 'Something went wrong!';
  }
};
export const checkBrand = name => {
  if (name == 'Visa') {
    return appIcons.visa;
  } else if (name == 'MasterCard') {
    return appIcons.masterCard;
  }
};

export const checkExerciseItemOrder = item => {
  console.log(item);
};

export const calculateDateDiff = date => {
  const diff_date = moment(date).diff(moment(new Date()), 'days');
  return diff_date;
};
export const calculateCurrentDateDiff = date => {
  const diff_date = moment(date).diff(moment(new Date()), 'minutes');
  if (diff_date > 1440) {
    return calculateDateDiff(date) > 1
      ? `${calculateDateDiff(date)} Days`
      : `${calculateDateDiff(date)} Day`;
  } else if (diff_date > 60 && diff_date <= 1440) {
    const diff_hours = moment(date).diff(moment(new Date()), 'hours');
    return `${diff_hours} hours`;
  } else if (diff_date <= 60 && diff_date >= 0) {
    return diff_date > 1 ? `${diff_date} minutes` : 'few seconds left';
  }
  return 0;
};

export function convertNumberSystem(num) {
  let isNegative = false;
  let formattedNumber;
  if (num < 0) {
    isNegative = true;
  }
  num = Math.abs(num);
  if (num >= 1000000000000) {
    formattedNumber =
      (num / 1000000000000).toFixed(1).replace(/\.0$/, '') + 'T';
  } else if (num >= 1000000000) {
    formattedNumber = (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  } else if (num >= 1000000) {
    formattedNumber = (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (num >= 1000) {
    formattedNumber = (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  } else {
    formattedNumber = num;
  }
  if (isNegative) {
    formattedNumber = '-' + formattedNumber;
  }
  return formattedNumber;
}
export const best_set = sets => {
  for (let i = 0; i < sets?.length; i++) {
    sets[i]['maxValue'] = sets[i].set * sets[i].lbs;
  }
  const max = sets?.reduce(function (prev, current) {
    return prev?.maxValue > current?.maxValue ? prev : current;
  });
  return max;
};

export function setDigitSize(num) {
  if (num >= 1000000000000) {
    return WP('4');
  } else if (num >= 10000000000) {
    return WP('5');
  } else if (num >= 100000000) {
    return WP('7');
  } else if (num >= 10000000) {
    return WP('9');
  } else if (num >= 1000000) {
    return WP('11');
  } else if (num >= 100000) {
    return WP('13');
  } else if (num >= 10000) {
    return WP('14');
  } else if (num >= 1000) {
    return WP('18');
  } else {
    return WP('18');
  }
}

export const handleLocationPermission = async () => {
  let result;
  if (Platform.OS == 'android') {
    result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

    //for enabling location on android
    try {
      if (await isLocationEnabled())
        return true
      const enableResult = await promptForEnableLocationIfNeeded();
      if (enableResult == 'enabled')
        return true
      // The user has accepted to enable the location services
      // data can be :
      //  - "already-enabled" if the location services has been already enabled
      //  - "enabled" if user has clicked on OK button in the popup
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        // The user has not accepted to enable the location services or something went wrong during the process
        // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
        // codes :
        //  - ERR00 : The user has clicked on Cancel button in the popup
        //  - ERR01 : If the Settings change are unavailable
        //  - ERR02 : If the popup has failed to open
        //  - ERR03 : Internal error
      }
    }
  } else {
    result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
  }
  if (result == RESULTS.GRANTED) {
    return true
  }
}

export const propertyFormData = (data = {}) => {
  const formdata = new FormData();
  formdata.append('property[property_type]', data.property_type);
  data.images?.forEach(item => {
    if (item?.id)
      formdata.append('property[images][]', item?.id)
    else
      formdata.append('property[images][]', {
        uri: item?.path,
        type: item?.mime || 'image/jpeg',
        name: item?.filename || 'image',
      })
  })
  formdata.append('property[title]', data.title);
  formdata.append('property[price]', data.price);
  formdata.append('property[currency_type]', data.currency_type);
  formdata.append('property[address]', data.address);
  formdata.append('property[tax_year]', data.tax_year);
  formdata.append('property[property_tax]', data.property_tax);
  formdata.append('property[property_description]', data.property_description);

  if (data.property_type == 'vacant_land') {
    formdata.append('property[lot_frontage]', data.lot_frontage);
    formdata.append('property[lot_frontage_unit]', data.lot_frontage_unit);
    formdata.append('property[lot_depth]', data.lot_depth);
    formdata.append('property[lot_depth_unit]', data.lot_frontage_unit);
    formdata.append('property[lot_size]', data.lot_size);
    formdata.append('property[lot_size_unit]',
      data.lot_frontage_unit == lot_unit_list[0] ?
        lot_area_unit_list[0] :
        lot_area_unit_list[1]
    );
    formdata.append('property[is_lot_irregular]', data.is_lot_irregular);
    formdata.append('property[lot_description]', data.lot_description);
  } else if (data.property_type == 'house') {
    formdata.append('property[year_built]', data.year_built);
    formdata.append('property[unit]', data.unit);
    formdata.append('property[lot_frontage]', data.lot_frontage);
    formdata.append('property[lot_frontage_unit]', data.lot_frontage_unit);
    formdata.append('property[lot_depth]', data.lot_depth);
    formdata.append('property[lot_depth_unit]', data.lot_frontage_unit);
    formdata.append('property[lot_size]', data.lot_size);
    formdata.append('property[lot_size_unit]',
      data.lot_frontage_unit == lot_unit_list[0] ?
        lot_area_unit_list[0] :
        lot_area_unit_list[1]
    );
    formdata.append('property[is_lot_irregular]', data.is_lot_irregular);
    formdata.append('property[lot_description]', data.lot_description);
    formdata.append('property[house_type]', data.house_type);
    formdata.append('property[house_style]', data.house_style);
    formdata.append('property[bed_rooms]', data.bed_rooms);
    formdata.append('property[bath_rooms]', data.bath_rooms);
    formdata.append('property[total_number_of_rooms]', data.total_number_of_rooms);
    formdata.append('property[total_parking_spaces]', data.total_parking_spaces);
    formdata.append('property[garage_spaces]', data.garage_spaces);
    formdata.append('property[driveway]', data.driveway);
    formdata.append('property[water]', data.water);
    formdata.append('property[sewer]', data.sewer);
    formdata.append('property[laundry]', data.laundry);
    formdata.append('property[fireplace]', data.fireplace);
    formdata.append('property[central_vacuum]', data.central_vacuum);
    formdata.append('property[pool]', data.pool);
    formdata.append('property[appliances_and_other_items]', data.appliances_and_other_items);
    data.basement?.forEach((item) => {
      formdata.append('property[basement][]', item);
    })
    data.heat_source?.forEach((item) => {
      formdata.append('property[heat_source][]', item);
    })
    data.heat_type?.forEach((item) => {
      formdata.append('property[heat_type][]', item);
    })
    data.exterior?.forEach((item) => {
      formdata.append('property[exterior][]', item);
    })
    data.air_conditioner?.forEach((item) => {
      formdata.append('property[air_conditioner][]', item);
    })
  } else {
    formdata.append('property[year_built]', data.year_built);
    formdata.append('property[locker]', data.locker);
    formdata.append('property[condo_corporation_or_hqa]', data.condo_corporation_or_hqa);
    formdata.append('property[condo_type]', data.condo_type);
    formdata.append('property[condo_style]', data.condo_style);
    formdata.append('property[exterior]', data.exterior);
    formdata.append('property[bed_rooms]', data.bed_rooms);
    formdata.append('property[bath_rooms]', data.bath_rooms);
    formdata.append('property[total_number_of_rooms]', data.total_number_of_rooms);
    formdata.append('property[total_parking_spaces]', data.total_parking_spaces);
    formdata.append('property[garage_spaces]', data.garage_spaces);
    formdata.append('property[balcony]', data.balcony);
    formdata.append('property[exposure]', data.exposure);
    formdata.append('property[security]', data.security);
    formdata.append('property[pets_allowed]', data.pets_allowed);
    formdata.append('property[water]', data.water);
    formdata.append('property[sewer]', data.sewer);
    formdata.append('property[laundry]', data.laundry);
    formdata.append('property[fireplace]', data.fireplace);
    formdata.append('property[central_vacuum]', data.central_vacuum);
    formdata.append('property[pool]', data.pool);
    data.basement?.forEach((item) => {
      formdata.append('property[basement][]', item);
    })
    data.included_utilities?.forEach((item) => {
      formdata.append('property[included_utilities][]', item);
    })
    data.heat_source?.forEach((item) => {
      formdata.append('property[heat_source][]', item);
    })
    data.heat_type?.forEach((item) => {
      formdata.append('property[heat_type][]', item);
    })
    data.exterior?.forEach((item) => {
      formdata.append('property[exterior][]', item);
    })
    data.air_conditioner?.forEach((item) => {
      formdata.append('property[air_conditioner][]', item);
    })
  }

  data.rooms?.forEach((item, index) => {
    if (item?.id && item?.deleted) {
      formdata.append(`property[rooms_attributes][${index}][id]`, item.id)
      formdata.append(`property[rooms_attributes][${index}][_destroy]`, true)
    } else {
      item?.id && formdata.append(`property[rooms_attributes][${index}][id]`, item.id)
      formdata.append(`property[rooms_attributes][${index}][name]`, item?.name)
      formdata.append(`property[rooms_attributes][${index}][length_in_feet]`, item?.length_in_feet)
      formdata.append(`property[rooms_attributes][${index}][length_in_inch]`, item?.length_in_inch)
      formdata.append(`property[rooms_attributes][${index}][width_in_feet]`, item?.width_in_feet)
      formdata.append(`property[rooms_attributes][${index}][width_in_inch]`, item?.width_in_inch)
      formdata.append(`property[rooms_attributes][${index}][level]`, item?.level)
    }
  })
  return formdata
}

export const handleCameraPermission = async () => {
  const result = Platform.OS == IOS ?
    await request(PERMISSIONS.IOS.CAMERA) :
    await request(PERMISSIONS.ANDROID.CAMERA)
    return result == RESULTS.GRANTED
}