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
    fontSize: size.normal,
    fontFamily: family.Gilroy_SemiBold,
  },
  notifyTxtStyle: {
    color: colors.b2,
    marginTop: WP('5'),
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_SemiBold,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: WP('6'),
    justifyContent: 'space-between',
  },
  txtStyle: {
    color: colors.b2,
    fontSize: size.normal,
    fontFamily: family.Gilroy_Medium,
  },
  subTxtStyle: {
    lineHeight: 17,
    color: colors.b2,
    fontSize: size.xsmall,
    marginVertical: WP('6'),
    fontFamily: family.Gilroy_Medium,
  },
});

export default styles;
