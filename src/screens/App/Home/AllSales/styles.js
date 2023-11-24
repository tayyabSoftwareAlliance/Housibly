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
    paddingTop: platformOrientedCode(WP('6'), 0),
  },
  titleTxtStyle: {
    color: colors.b1,
    fontSize: size.h6,
    paddingTop: WP('5'),
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
    height: platformOrientedCode(WP('33'), WP('31')),
    width: scrWidth / 2.2,
  },
  menuItemStyle: {
    height: WP('10'),
  },
  menuItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',

    paddingHorizontal: platformOrientedCode(WP('2'), WP('4.5')),
  },
  modelIconStyle: {
    width: 15,
    height: 14,
    marginRight: WP('3'),
    marginTop: WP('2'),
  },
  menuTxtStyle: {
    color: colors.b1,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Regular,
    marginTop: WP('2'),
  },
  dividerView: {
    top: 5,
    height: 1,
    width: '100%',
    backgroundColor: colors.g24,
  },
  itemContainer: {
    paddingTop: WP('1'),
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: WP('2'),
    justifyContent: 'center',
    paddingHorizontal: WP('12'),
    backgroundColor: colors.white,
  },
  flStyle: {
    paddingBottom: platformOrientedCode(WP('13'), hasNotch ? 0 : WP('13')),
  },
  imgStyle: {
    borderRadius: 15,
    width: WP('26.3'),
    height: WP('24.1'),
    marginRight: WP('2.5'),
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameTxtStyle: {
    width: '78%',
    color: colors.b1,
    fontSize: size.large,
    fontFamily: family.Gilroy_SemiBold,
  },
  txtContainer: {
    width: 14,
    height: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.r1,
  },
  newTxtStyle: {
    left: 0.3,
    color: colors.white,
    fontSize: size.xxxtiny,
    fontFamily: family.Gilroy_Bold,
  },
  simpleRow: {
    paddingVertical: 11,
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
  personImgStyle: index => {
    return {
      borderRadius: 5,
      borderWidth: 1.5,
      width: WP('6.15'),
      height: WP('6.15'),
      borderColor: colors.white,
      left: index === 0 ? 0 : -5 * index,
    };
  },
  countContainer: {
    left: -20,
    borderRadius: 5,
    borderWidth: 1.5,
    width: WP('6.15'),
    height: WP('6.15'),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.white,
    backgroundColor: colors.g25,
  },
  countTxtStyle: {
    color: colors.b1,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  // swipeable list
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: platformOrientedCode(WP('16'), hasNotch ? 0 : WP('16')),
  },
  backTextWhite: {
    color: '#FFF',
  },
  backBtnsContainer: {
    flex: 1,
    paddingLeft: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backLeftBtn: {
    top: 0,
    bottom: 0,
    width: 85,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
  backLeftBtnLeft: {
    left: 0,
    backgroundColor: colors.g26,
  },
  backLeftBtnRight: {
    left: 85,
    width: 90,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: colors.s5,
  },
  backRightBtn: {
    top: 0,
    bottom: 0,
    width: 85,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
  backRightBtnLeft: {
    right: 85,
    width: 90,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: colors.g26,
  },
  backRightBtnRight: {
    right: 0,
    backgroundColor: colors.r1,
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginBottom: 9,
  },
  editBtnTxtStyle: {
    color: colors.b4,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  btnTxtStyle: {
    color: colors.white,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
});

export default styles;
