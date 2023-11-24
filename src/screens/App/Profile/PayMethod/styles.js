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
    paddingHorizontal: WP('4'),
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
    borderWidth: 1.5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: WP('5'),
    borderColor: colors.g12,
    paddingVertical: WP('3'),
    paddingHorizontal: WP('5'),
    justifyContent: 'space-between',
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    width: WP('5'),
    height: WP('5'),
  },
  titleTxtStyle: {
    color: colors.b1,
    paddingBottom: 3,
    fontSize: size.tiny,
    paddingLeft: WP('4'),
    fontFamily: family.Gilroy_Medium,
  },
  valTxtStyle: {
    paddingTop: 3,
    color: colors.g32,
    paddingLeft: WP('4'),
    fontSize: size.xxtiny,
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
