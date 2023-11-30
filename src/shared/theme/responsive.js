import {Dimensions, Platform, PixelRatio} from 'react-native';

const scrWidth = Dimensions.get('window').width;
const scrHeight = Dimensions.get('window').height;


const widthPercentageToDP = widthPercent => {
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((scrWidth * elemWidth) / 100);
};

const heightPercentageToDP = heightPercent => {
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((scrHeight * elemHeight) / 100);
};

const BOTTOM_TAB_HEIGHT = widthPercentageToDP('17')
const PADDING_BOTTOM_FOR_TAB_BAR_SCREENS = BOTTOM_TAB_HEIGHT+heightPercentageToDP(1)

const platformOrientedCode = (androidVal, iOSVal) =>
  Platform.select({android: androidVal, ios: iOSVal});

export {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
  scrWidth,
  scrHeight,
  platformOrientedCode,
  BOTTOM_TAB_HEIGHT,
  PADDING_BOTTOM_FOR_TAB_BAR_SCREENS
};
