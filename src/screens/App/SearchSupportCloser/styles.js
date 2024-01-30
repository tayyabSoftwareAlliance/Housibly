import { StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  WP,
  colors,
  size,
  family,
  scrWidth,
  platformOrientedCode,
} from '../../../shared/exporter';

let hasNotch = DeviceInfo.hasNotch();

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  titleTxtStyle: {
    color: colors.b1,
    fontSize: size.h6,
    marginTop: WP('5'),
    marginBottom: WP('3.6'),
    paddingHorizontal: WP('4'),
    fontFamily: family.Gilroy_Bold,
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: WP('5'),
    paddingHorizontal: WP('4'),
  },
  homeIconStyle: {
    width: 14,
    height: 14,
  },
  homeTxtStyle: {
    top: 1,
    marginLeft: 7,
    color: colors.g2,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
  },
  menuContainer: {
    width: '100%',
    top: WP('-3'),
    paddingLeft: WP('5.2'),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  menuStyle: {
    marginTop: 5,
    marginLeft: -5,
    borderRadius: 8,
    height: WP('31'),
    width: scrWidth / 2.6,
  },
  menuItemStyle: {
    height: WP('10'),
  },
  menuItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: platformOrientedCode(WP('2'), WP('4.5')),
  },
  modelIconStyle: {
    width: 15,
    height: 14,
    marginRight: WP('3'),
  },
  menuTxtStyle: {
    color: colors.b1,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Regular,
    marginTop: platformOrientedCode(WP('2'), WP('3.5')),
  },
  dividerView: {
    top: 5,
    height: 1,
    width: '100%',
    backgroundColor: colors.g24,
  },
  flStyle: {
    paddingBottom: platformOrientedCode(WP('13'), hasNotch ? 0 : WP('13')),
  },
  bottomView: {
    bottom: 6,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
  },
  tabTxtStyle: {
    color: colors.white,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_SemiBold,
  },
  footerComponent: {
    height: WP(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
});

export default styles;
