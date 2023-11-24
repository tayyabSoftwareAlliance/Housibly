import {StyleSheet} from 'react-native';
import {WP, colors, size, family} from '../../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: WP('3.85'),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: WP('9.5'),
    paddingHorizontal: WP('4.5'),
    justifyContent: 'space-between',
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    width: WP('5'),
    height: WP('5'),
  },
  txtStyle: {
    left: WP('4.5'),
    color: colors.b2,
    fontSize: size.normal,
    fontFamily: family.Gilroy_Medium,
  },
  bottomView: {
    width: '100%',
    bottom: WP('6'),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
    paddingHorizontal: WP('5'),
  },
});

export default styles;
