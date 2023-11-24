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
    justifyContent: 'space-between',
  },
  inputCon: {
    flex: 1,
    paddingVertical: WP('5'),
  },

  spacRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
});

export default styles;
