import {StyleSheet} from 'react-native';
import {WP, colors, size, family} from '../../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    marginTop: WP('3'),
    paddingBottom: WP('1.5'),
    paddingHorizontal: WP('4'),
  },
  titleTxtStyle: {
    lineHeight: 19,
    color: colors.b2,
    fontSize: size.large,
    marginTop: WP('5'),
    marginBottom: WP('4'),
    fontFamily: family.Gilroy_SemiBold,
  },
  valuesTxtStyle: {
    lineHeight: 21,
    color: colors.b2,
    fontSize: size.normal,
    fontFamily: family.Gilroy_Regular,
  },
});

export default styles;
