import {StyleSheet} from 'react-native';
import {WP, colors, size, family} from '../../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    paddingHorizontal: WP('4'),
  },
  descTxtStyle: {
    color: colors.b2,
    marginBottom: WP('4'),
    fontSize: size.normal,
    fontFamily: family.Gilroy_SemiBold,
  },
  rowContainer: {
    marginTop: WP('7'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtStyle: {
    color: colors.b2,
    fontSize: size.normal,
    fontFamily: family.Gilroy_Medium,
  },
});

export default styles;
