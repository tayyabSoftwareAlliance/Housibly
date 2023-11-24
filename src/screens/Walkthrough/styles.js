import {StyleSheet} from 'react-native';
import {
  colors,
  family,
  platformOrientedCode,
  size,
  WP,
} from '../../shared/exporter';
import DeviceInfo from 'react-native-device-info';

const isNotch = DeviceInfo.hasNotch();

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bgImgStyle: index => {
    return {
      flex: 1,
      width: '100%',
      height: Platform.select({
        android: '90%',
        ios: isNotch ? '95%' : '55%',
      }),
      borderBottomLeftRadius: index === 0 ? WP('20.5') : 0,
      borderBottomRightRadius: index === 2 ? WP('20.5') : 0,
      backgroundColor: colors.white,
    };
  },
  dotStyle: {
    height: 4.5,
    top: WP('15'),
    marginRight: 6,
    borderRadius: 12,
    width: WP('6.3'),
    backgroundColor: colors.g1,
  },
  activeDotStyle: {
    height: 4.5,
    top: WP('15'),
    marginRight: 6,
    width: WP('6.3'),
    borderRadius: 12,
    backgroundColor: colors.p1,
  },
  arrowButtonContaianer: {
    width: WP('16.7'),
    height: WP('16.7'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: WP('16.7'),
    backgroundColor: colors.p1,
  },
  scrollViewStyle: {
    flexGrow: 1,
    minHeight: '100%',
  },
  contentContainer: {
    flex: 0.8,
    paddingHorizontal: WP('8.2'),
  },
  titleTextStyle: {
    lineHeight: 32,
    color: colors.b1,
    fontSize: size.h3,
    fontFamily: family.SamsungSans_Bold,
    paddingTop: platformOrientedCode(20, 0),
    marginTop: platformOrientedCode(WP('14'), WP('17')),
  },
  descTextStyle: {
    color: colors.g2,
    marginTop: WP('3.2'),
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
  },
  haveAccTxtStyle: {
    color: colors.b1,
    fontSize: size.tiny,
    alignSelf: 'center',
    marginTop: WP('4.6'),
    marginBottom: WP('4.6'),
    fontFamily: family.Gilroy_Medium,
  },
  underlineTxtStyle: {
    textDecorationLine: 'underline',
    fontFamily: family.Gilroy_SemiBold,
  },
});

export default styles;
