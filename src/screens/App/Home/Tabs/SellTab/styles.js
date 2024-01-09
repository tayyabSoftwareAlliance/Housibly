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
});

export default styles;
