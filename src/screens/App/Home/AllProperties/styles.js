import {StyleSheet} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  WP,
  colors,
  size,
  family,
  scrWidth,
  platformOrientedCode,
} from '../../../../shared/exporter';

let hasNotch = DeviceInfo.hasNotch();

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
    // paddingTop: platformOrientedCode(WP('6'), 0),
  },
  titleTxtStyle: {
    color: colors.b1,
    fontSize: size.h6,
    marginTop: WP('5'),
    marginBottom: WP('3.6'),
    paddingHorizontal: WP('4'),
    fontFamily: family.Gilroy_Bold,
  },
  flStyle: {
    paddingBottom: platformOrientedCode(WP('13'), hasNotch ? 0 : WP('13')),
  }
});

export default styles;
