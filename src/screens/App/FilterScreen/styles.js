import {StyleSheet} from 'react-native';
import {
  HP,
  WP,
  colors,
  platformOrientedCode,
  size,
  family,
} from '../../../shared/exporter';

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
  aiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: WP('6'),
  },
  textStyle: {
    color: colors.p1,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
  },
  spacRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  showAdvanceContainer:{
    height:60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf:'flex-start',
  }
});

export default styles;
