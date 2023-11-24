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
  descTxtStyle: {
    lineHeight: 17,
    color: colors.g31,
    marginBottom: WP('8'),
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
  },
  payTxtStyle: {
    color: colors.b1,
    marginBottom: WP('8'),
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_SemiBold,
  },
  itemContainer: {
    borderRadius: 10,
    marginBottom: WP('5'),
    paddingVertical: WP('6'),
    paddingHorizontal: WP('5'),
    backgroundColor: colors.p5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconStyle: {
    width: WP('14'),
    height: WP('4.5'),
    marginTop: WP('5'),
  },
  titleTxtStyle: {
    color: colors.b1,
    paddingBottom: 3,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_SemiBold,
  },
  valTxtStyle: {
    paddingTop: 3,
    color: colors.b1,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Regular,
  },
  boxStyle: {
    borderRadius: 8,
    width: WP('8.2'),
    height: WP('8.2'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.p2,
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
