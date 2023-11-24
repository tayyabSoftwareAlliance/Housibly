import NetInfo from '@react-native-community/netinfo';
import { createContext, useContext, useEffect } from 'react';
import { appIcons, WP } from '../exporter';
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
  if(typeof string == 'string')
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