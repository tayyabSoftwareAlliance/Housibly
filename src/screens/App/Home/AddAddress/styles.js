import { StyleSheet } from 'react-native';
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
    marginTop: 10,
  },
  countText: {
    fontSize: size.small,
    color: colors.p1,
    fontFamily: family.Gilroy_Medium,
    marginTop: 5,
    marginBottom: 10,
  },
  footerComponent: {
    height: WP(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
});

export default styles;
