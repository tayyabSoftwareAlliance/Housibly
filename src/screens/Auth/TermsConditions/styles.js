import {StyleSheet} from 'react-native';
import {WP, colors, size, family} from '../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollViewStyle: {
    marginTop: WP('7.7'),
    paddingHorizontal: WP('4.1'),
  },
  quesTxtStyle: {
    color: colors.b1,
    fontSize: size.normal,
    fontFamily: family.Gilroy_SemiBold,
  },
  ansTxtStyle: {
    lineHeight: 20,
    color: colors.b1,
    fontSize: size.normal,
    marginVertical: WP('5'),
    fontFamily: family.Gilroy_Regular,
  },
  rowContainer: {
    marginTop: WP('4'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: WP('4.1'),
  },
  iconStyle: {
    width: WP('4.4'),
    height: WP('4.4'),
  },
  agreeTxtStyle: {
    left: WP('2.6'),
    color: colors.b1,
    fontSize: size.normal,
    fontFamily: family.Gilroy_Medium,
  },
  btnContainer: {
    marginTop: WP('9'),
    marginBottom: WP('4'),
    paddingHorizontal: WP('8.2'),
  },
});

export default styles;
