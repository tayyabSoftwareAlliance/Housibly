import {Platform, StyleSheet} from 'react-native';
import {WP, colors, size, family} from '../../../../shared/exporter';
import DeviceInfo from 'react-native-device-info';

const isNotch = DeviceInfo.hasNotch();

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    paddingHorizontal: WP('3'),
  },
  bgImgStyle: {
    width: '100%',
    height: WP('53'),
    alignSelf: 'center',
    marginVertical: WP('5'),
  },
  imgView: {
    width: '83%',
    height: WP('52'),
    alignSelf: 'center',
    paddingVertical: WP('4.5'),
    paddingHorizontal: WP('5'),
    justifyContent: 'space-between',
  },
  iconStyle: {
    width: WP('14'),
    height: WP('4.5'),
    tintColor: colors.white,
  },
  catTxtStyle: {
    paddingTop: WP('2'),
    color: colors.white,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Regular,
  },
  numTxtStyle: {
    paddingTop: WP('2'),
    color: colors.white,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: WP('4'),
    paddingHorizontal: WP('7'),
  },
  titleTxtStyle: {
    flex: 0.5,
    color: colors.g33,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  valueTxtStyle: {
    flex: 0.5,
    color: colors.b1,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_SemiBold,
  },
  transTxtStyle: {
    color: colors.b1,
    marginTop: WP('4'),
    fontSize: size.xsmall,
    paddingHorizontal: WP('7'),
    fontFamily: family.Gilroy_SemiBold,
  },
  itemContainer: {
    marginTop: 10,
    borderRadius: 15,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: WP('7'),
    backgroundColor: colors.p6,
    justifyContent: 'space-between',
  },
  logoContainer: {
    width: WP('15'),
    height: WP('15'),
    borderRadius: 61,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  imgStyle: {
    width: 42,
    height: 37,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtStyle: {
    marginLeft: 11,
    marginBottom: 2,
    color: colors.b1,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_SemiBold,
  },
  timeTxtStyle: {
    marginTop: 2,
    marginLeft: 11,
    color: colors.g34,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Regular,
  },
  valTxtStyle: {
    color: colors.s5,
    fontSize: size.large,
    fontFamily: family.Gilroy_SemiBold,
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
});

export default styles;
