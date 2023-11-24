import {StyleSheet} from 'react-native';
import {WP, colors, family, size} from '../../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    paddingHorizontal: WP('5'),
    flex: 1,
  },
  footerText: {
    textAlign: 'center',
    color: colors.b1,
    fontFamily: family.Gilroy_Medium,
    fontSize: size.tiny,
    width: '70%',
  },
  btnCon: {
    width: '95%',
    marginVertical: 20,
  },
  inputCon: {
    paddingVertical: WP('3'),
  },
});

export default styles;
