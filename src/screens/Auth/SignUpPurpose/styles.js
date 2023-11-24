import {StyleSheet} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  colors,
  family,
  platformOrientedCode,
  scrWidth,
  size,
  WP,
} from '../../../shared/exporter';

const isNotch = DeviceInfo.hasNotch();

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bgImgStyle: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
    width: (scrWidth * 100) / 100,
    height: (scrWidth * 90.5) / 100,
  },
  helloTxtStyle: {
    fontSize: size.h4,
    color: colors.white,
    fontFamily: family.SamsungSans_Bold,
  },
  chooseTxtStyle: {
    color: colors.white,
    marginTop: WP('3.6'),
    fontSize: size.normal,
    marginBottom: WP('10.3'),
    fontFamily: family.SamsungSans_Bold,
  },
  btnsContainer: {
    flex: 1,
    marginTop: WP('8.2'),
    paddingHorizontal: WP('8.2'),
    marginBottom: platformOrientedCode(WP('30'), WP('20')),
  },
  iconStyle: {
    width: 26,
    height: 34,
  },
  bottomView: {
    width: '100%',
    bottom: Platform.select({
      android: WP('11'),
      ios: isNotch ? WP('11') : WP('1'),
    }),
    alignItems: 'center',
    position: 'absolute',
    paddingHorizontal: WP('8.2'),
  },
  iconStyle1: {
    width: WP('5'),
    height: WP('5'),
    tintColor: colors.white,
  },
  btnCon: {
    position: 'absolute',
    top: WP('15'),
    left: WP('5'),
    alignSelf: 'flex-start',
  },
});

export default styles;
