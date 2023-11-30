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
    backgroundColor: colors.g5,
  },
  titleTxtStyle: {
    color: colors.b1,
    fontSize: size.h6,
    paddingTop: WP('3'),
    paddingBottom: WP('3.6'),
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
  menuesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuContainer: {
    width: '100%',
    top: WP('-3'),
    paddingLeft: WP('5.2'),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  menuContainer1: {
    width: '100%',
    top: WP('-3'),
    paddingLeft: WP('42'),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  menuStyle: {
    marginTop: 5,
    marginLeft: -5,
    borderRadius: 8,
    height: WP('21'),
    width: scrWidth / 3.3,
  },
  menuStyle1: {
    marginTop: 5,
    marginLeft: -5,
    borderRadius: 8,
    height: WP('27'),
    width: scrWidth / 2.9,
  },
  menuItemStyle: {
    height: WP('8'),
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
  detailsContainer: {
    marginTop: WP('8'),
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: WP('6'),
    marginHorizontal: WP('4'),
    backgroundColor: colors.g5,
  },
  imgStyle: {
    borderRadius: 15,
    width: WP('26.3'),
    height: WP('24.1'),
    marginRight: WP('3'),
    backgroundColor: colors.g11,
  },
  nameTxtStyle: {
    width: '85%',
    color: colors.b1,
    fontSize: size.h5,
    fontFamily: family.Gilroy_SemiBold,
    textTransform:'capitalize'
  },
  simpleRow: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallTxtStyle: {
    color: colors.g23,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  bedIconStyle: {
    width: 14,
    height: 9,
    marginRight: 3,
  },
  bathIconStyle: {
    width: 11,
    height: 11,
    marginLeft: 8,
    marginRight: 4,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: platformOrientedCode(WP('16'), hasNotch ? 0 : WP('16')),
  },
  // flatlist style
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: WP('4'),
    paddingHorizontal: WP('3.9'),
    justifyContent: 'space-between',
  },
  innerRow: {
    flexDirection: 'row',
  },
  itemImgStyle: {
    width: WP('17.5'),
    height: WP('17.5'),
    borderRadius: 12,
  },
  contentContainer: {
    paddingLeft: WP('3'),
    justifyContent: 'space-around',
  },
  nameStyle: {
    color: colors.b1,
    fontSize: size.large,
    fontFamily: family.Gilroy_SemiBold,
  },
  txtStyle: {
    color: colors.g23,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  spanTxtStyle: {
    color: colors.s6,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_SemiBold,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchTxtStyle: {
    color: colors.r2,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  matchImgStyle: {
    width: WP('11.5'),
    height: WP('11.5'),
    borderRadius: WP('11.5'),
  },
});

export default styles;
