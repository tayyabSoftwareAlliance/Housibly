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
  imgCon: {
    height: 122,
    width: 122,
    borderRadius: 15,
    backgroundColor: colors.g8,
    borderWidth: 1,
    alignSelf: 'center',
    borderStyle: 'dashed',
    borderColor: colors.g9,
  },
  imgStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    paddingVertical: WP('10'),
  },
  iconCon: {
    backgroundColor: colors.s2,
    height: 43,
    width: 43,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
  },
  iconStyle: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  h1: {
    fontSize: size.h6,
    color: colors.b1,
    fontFamily: family.Gilroy_SemiBold,
    textAlign: 'center',
    marginTop: 10,
  },
  desc: {
    color: colors.g22,
    fontFamily: family.Gilroy_Medium,
    fontSize: size.xsmall,
    lineHeight: 18,
  },
});

export default styles;
