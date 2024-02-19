import {Platform, StyleSheet} from 'react-native';
import {
  WP,
  colors,
  size,
  family,
  scrWidth,
  platformOrientedCode,
  PADDING_BOTTOM_FOR_TAB_BAR_SCREENS,
  BOTTOM_TAB_HEIGHT,
} from '../../../shared/exporter';
import DeviceInfo from 'react-native-device-info';

const isNotch = DeviceInfo.hasNotch();

const styles = StyleSheet.create({
  rootContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  scrollViewStyle: {
    flexGrow:1,
  },
  innerViewStyle: {
    paddingTop: WP('5'),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: WP('4.1'),
    justifyContent: 'space-between',
  },
  propertyTxtStyle: {
    color: colors.b1,
    fontSize: size.h6,
    paddingBottom: WP('3.6'),
    fontFamily: family.Gilroy_Bold,
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locIconStyle: {
    width: 12,
    height: 14,
  },
  locTxtStyle: {
    top: 1,
    marginLeft: 7,
    color: colors.g2,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
  },
  phImgStyle: {
    width: WP('15'),
    height: WP('15'),
  },
  itemContainer: {
    padding: 6,
    borderRadius: 20,
    marginTop: WP('4'),
    flexDirection: 'row',
    backgroundColor: colors.s3,
    justifyContent: 'space-between',
  },
  itemInnerRow: {
    width: '88%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  personImgStyle: {
    width: WP('22'),
    height: WP('22'),
    borderRadius: 15,
    backgroundColor:colors.g14
  },
  txtContainer: {
    paddingHorizontal: WP('4'),
    width: WP('60'),
  },
  itemNameStyle: {
    color: colors.white,
    fontSize: size.normal,
    fontFamily: family.Gilroy_SemiBold,
    textTransform:'capitalize'
  },
  h1TxtStyle: {
    paddingTop: 6,
    paddingBottom: 15,
    color: colors.white,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_SemiBold,
  },
  h2TxtStyle: {
    color: colors.white,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
    textTransform:'capitalize',

  },
  iconContainer: {
    right: 5,
    borderRadius: 7,
    width: WP('6.7'),
    height: WP('6.7'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.s4,
  },
  menuContainer: {
    width: '100%',
    top: WP('-16'),
    alignItems: 'flex-end',
    paddingRight: WP('8.2'),
    justifyContent: 'flex-end',
  },
  menuStyle: {
    marginTop: 5,
    marginLeft: -5,
    borderRadius: 8,
    // height: WP('20'),
    height: WP('12'),
    width: scrWidth / 3.7,
  },
  menuItemStyle: {
    height: WP('8'),
  },
  menuTxtStyle: {
    left: -2,
    color: colors.b1,
    marginTop: WP('3.5'),
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Regular,
  },
  paddingView: {
    paddingHorizontal: WP('4.1'),
  },
  tabsContainer: {
    borderRadius: 13,
    marginTop: WP('3.5'),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: WP('5.4'),
    backgroundColor: colors.g5,
    justifyContent: 'space-between',
  },
  tabStyle: isSelected => {
    return {
      margin: 3,
      width: '30%',
      borderRadius: 10,
      height: WP('10.3'),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isSelected ? colors.p2 : colors.g5,
    };
  },
  tabTxtStyle: isSelected => {
    return {
      fontSize: size.tiny,
      fontFamily: family.Gilroy_SemiBold,
      color: isSelected ? colors.white : colors.g15,
    };
  },
  itemRow: index => {
    return {
      borderRadius: 5,
      paddingHorizontal: 8,
      flexDirection: 'row',
      paddingVertical: index % 2 == 0 ? 4 : 6,
      backgroundColor: index % 2 == 0 ? colors.g5 : colors.white,
    };
  },
  titleTxtStyle: {
    flex: 0.4,
    color: colors.g16,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  valTxtStyle: {
    flex: 0.6,
    color: colors.b1,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_SemiBold,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: WP('2'),
    marginBottom: WP('3.5'),
  },
  advanceTxtStyle: {
    paddingLeft: 8,
    paddingRight: 5,
    color: colors.p1,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  mapImgStyle: {
    width: '100%',
    height: WP('19.5'),
    marginTop: WP('2.5'),
    alignItems: 'center',
    marginBottom: WP('5'),
    justifyContent: 'center',
  },
  iconStyle: {
    width: WP('9'),
    height: WP('9'),
  },
  addressTxtStyle: {
    paddingTop: WP('2'),
    color: colors.white,
    fontSize: size.xxtiny,
    fontFamily: family.Gilroy_Regular,
  },
  infoRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIconStyle: {
    top: -5,
    left: 7,
    width: WP('3'),
    height: WP('3'),
  },
  dividerView: {
    width: '100%',
    height: 0.5,
    backgroundColor: colors.g18,
  },
  inputStyle: {
    height: WP('15'),
    color: colors.b1,
    paddingHorizontal: 2,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
  },
  addressItemRow: index => {
    return {
      borderRadius: 5,
      paddingHorizontal: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: index % 2 == 0 ? 4 : 6,
      backgroundColor: index % 2 == 0 ? colors.g5 : colors.white,
    };
  },
  addrsTxtStyle: {
    color: colors.g16,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  crossIconStyle: {
    width: 8,
    height: 8,
  },
  bottomView: {
    bottom: PADDING_BOTTOM_FOR_TAB_BAR_SCREENS,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
  },
  btnTxtStyle: {
    color: colors.white,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_SemiBold,
  },
});

export default styles;
