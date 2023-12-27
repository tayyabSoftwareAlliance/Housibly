import { StyleSheet } from 'react-native';
import { WP, colors, size, family } from '../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.over1,
  },
  txtStyle: {
    color: colors.b1,
    fontSize: size.normal,
    paddingHorizontal: WP('4.1'),
    fontFamily: family.Gilroy_SemiBold,
  },
});

export default styles;
