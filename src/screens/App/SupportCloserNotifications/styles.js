import { StyleSheet } from 'react-native';
import { WP, colors, size, family } from '../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  badge: {
    paddingHorizontal:5,
    paddingVertical:2,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.r1,
  },
  badgeTxt: {
    color: colors.white,
    fontSize: size.xxxtiny,
    fontFamily: family.Gilroy_Bold,
  },
});

export default styles