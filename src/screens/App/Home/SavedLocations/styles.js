import { StyleSheet } from 'react-native';
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
  itemContainer: {
    flexDirection: 'row',
    paddingBottom: WP('4.2'),
    paddingHorizontal: WP('4'),
  },
  nameTxtStyle: {
    width: WP(85),
    color: colors.b1,
    fontSize: size.large,
    fontFamily: family.Gilroy_SemiBold,
  },
  txtContainer: {
    width: WP('9'),
    borderRadius: 5,
    height: WP('4.4'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.r1,
  },
  newTxtStyle: {
    left: 0.5,
    color: colors.white,
    fontSize: size.xxtiny,
    fontFamily: family.Gilroy_Regular,
  },
  simpleRow: {
    paddingTop: 13,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallTxtStyle: {
    color: colors.g23,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  timeTxtStyle: {
    color: colors.g17,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
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
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noData: {
    color: colors.g17,
    fontSize: size.small,
    fontFamily: family.Gilroy_Regular,
    textAlign: 'center'
  }
});

export default styles;
