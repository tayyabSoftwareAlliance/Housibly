import {StyleSheet} from 'react-native';
import {WP, colors, size, family} from '../../../../../shared/exporter';

const styles = StyleSheet.create({
  rowContainer: {
    marginBottom: WP('4.1'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: WP('4.1'),
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
    backgroundColor: colors.g11,
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
      backgroundColor: 'red',
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
});

export default styles;
