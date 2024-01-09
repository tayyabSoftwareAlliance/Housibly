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
  }
});

export default styles;
