import {StyleSheet} from 'react-native';
import {WP, colors, size, family} from '../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    paddingHorizontal: WP('3.85'),
    flex: 1,
  },
  textStyle: {
    fontFamily: family.Gilroy_SemiBold,
    fontSize: size.tiny,
    color: colors.b1,
    paddingHorizontal: WP('2'),
  },
  inputContainer: {
    paddingVertical: WP('20'),
  },
  btnCon: {
    marginVertical: WP('20'),
    marginHorizontal: 10,
  },
  footText: {
    color: colors.p2,
    textAlign: 'center',
    fontSize: size.tiny,
    marginVertical: 20,
    fontFamily: family.Gilroy_SemiBold,
    textDecorationLine: 'underline',
  },
});

export default styles;
