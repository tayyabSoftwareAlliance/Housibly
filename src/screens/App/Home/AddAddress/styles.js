import {StyleSheet} from 'react-native';
import {
  HP,
  WP,
  colors,
  platformOrientedCode,
  size,
  family,
} from '../../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: WP('3.85'),
    paddingVertical: 10,
  },
  h1: {
    fontSize: size.large,
    color: colors.b1,
    fontFamily: family.Gilroy_Bold,
    marginVertical: 10,
  },
});

export default styles;
