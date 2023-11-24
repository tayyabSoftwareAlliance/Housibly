import {StyleSheet} from 'react-native';
import {WP, colors, size, family} from '../../../../../shared/exporter';

const styles = StyleSheet.create({
  paddingView: {
    paddingHorizontal: WP('4.1'),
  },
  rowContainer: {
    marginBottom: WP('4.1'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleTxtStyle: {
    color: colors.b1,
    fontSize: size.large,
    fontFamily: family.Gilroy_Bold,
  },
  viewAllTxtStyle: {
    color: colors.p2,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingBottom: WP('4.2'),
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
    width: '58%',
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
  heartIconStyle: {
    width: 13,
    height: 11,
    marginRight: 5,
  },
  heartTxtStyle: {
    color: colors.r2,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  timeTxtStyle: {
    color: colors.g17,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
});

export default styles;
