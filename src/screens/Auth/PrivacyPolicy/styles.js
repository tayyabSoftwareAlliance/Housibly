import { StyleSheet } from 'react-native';
import { WP, colors, size, family } from '../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flStyle: {
    paddingTop: WP('7.7'),
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
  btnContainer: {
    marginTop: WP('9'),
    marginBottom: WP('4'),
    paddingHorizontal: WP('8.2'),
  },
});

export default styles;
