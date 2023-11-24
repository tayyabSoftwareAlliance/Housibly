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
  inputContainer: {
    paddingVertical: WP('2'),
  },
  listCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginVertical: 10,
  },

  h1Style: {
    color: colors.b1,
    fontFamily: family.Gilroy_Medium,
    fontSize: size.xsmall,
  },
});

export default styles;
