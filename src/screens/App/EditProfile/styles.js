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
  textStyle: {
    fontFamily: family.Gilroy_SemiBold,
    fontSize: size.tiny,
    color: colors.b1,
  },
  btnCon: {
    padding: WP('5'),
  },
  footText: {
    color: colors.p2,
    textAlign: 'center',
    fontSize: size.tiny,
    marginVertical: 20,
    fontFamily: family.Gilroy_SemiBold,
    textDecorationLine: 'underline',
  },
  inputContainer: {
    // paddingVertical: WP('5'),
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
  iconStyle: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  textStyle: {
    paddingHorizontal: WP('3'),
    color: colors.b1,
    fontFamily: family.Gilroy_Medium,
  },
});

export default styles;
