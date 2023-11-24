import {StyleSheet} from 'react-native';
import {
  HP,
  WP,
  colors,
  platformOrientedCode,
  size,
  family,
} from '../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  logoStyle: {
    width: WP('51.5'),
    height: WP('45'),
  },
  logoTxtStyle: {
    color: colors.b1,
    marginTop: WP('8'),
    fontSize: size.huge - 2,
    fontFamily: family.Gilroy_Bold,
  },
});

export default styles;
