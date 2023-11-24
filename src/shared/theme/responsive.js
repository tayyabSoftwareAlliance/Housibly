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

const platformOrientedCode = (androidVal, iOSVal) =>
  Platform.select({android: androidVal, ios: iOSVal});

export {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
  scrWidth,
  scrHeight,
  platformOrientedCode,
};
