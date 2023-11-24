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
  imageCon: {
    height: WP('60'),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgStyle: {
    height: '50%',
    width: '35%',
    resizeMode: 'contain',
  },
  textStyle: {
    fontSize: size.h4,
    color: colors.b1,
    fontFamily: family.Gilroy_Bold,
  },
  googleStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  appleStyle: {
    height: 20,
    width: 16,
    resizeMode: 'contain',
  },
  btnTextStyle: {
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
    color: colors.g3,
  },
  forgotText: {
    color: colors.r1,
    fontFamily: family.Gilroy_Medium,
    fontSize: size.tiny,
    marginBottom: 20,
  },
  footerText: {
    textAlign: 'center',
    color: colors.b1,
    fontFamily: family.Gilroy_Medium,
    fontSize: size.tiny,
    width: '70%',
  },
  btnCon: {
    width: '100%',
    marginVertical: 20,
  },
});

export default styles;
