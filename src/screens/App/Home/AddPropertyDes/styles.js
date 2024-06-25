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
  },
  inputCon: {
    flex: 1,
    paddingVertical: WP('5'),
    justifyContent: 'space-between',
    paddingHorizontal: WP('3.85'),
  },
  textareaContainer: {
    paddingVertical: 5,
    borderRadius: 10,
    marginVertical: 10,
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    fontSize: size.xsmall,
    color: colors.b1,
    fontFamily: family.Gilroy_Medium,
    paddingHorizontal:0,
  },
  spacRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default styles;
