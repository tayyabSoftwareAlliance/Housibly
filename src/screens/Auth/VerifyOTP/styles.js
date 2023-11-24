import {StyleSheet, Dimensions} from 'react-native';
import {WP, size, family, colors, HP} from '../../../shared/exporter';

const screenHeight = Dimensions.get('window').height;

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
    paddingVertical: WP('20'),
  },
  txtStyle: {
    alignSelf: 'center',
    marginTop: WP('4'),
    fontSize: size.normal,
    fontFamily: family.Gilroy_Regular,
  },
  signUpTxtStyle: {
    color: colors.p2,
    fontSize: size.normal,
    fontFamily: family.Gilroy_Bold,
  },
  otpInputBox: {},
  otpInput: {
    backgroundColor: colors.g7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    borderColor: colors.g7,
    height: 50,
    width: 50,
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: HP('2'),
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: colors.g7,
  },
  txtStyle: {
    fontFamily: family.Gilroy_SemiBold,
    fontSize: size.h2,
    textAlign: 'center',
    color: colors.p2,
  },
  paraTextStyle: {
    fontFamily: family.Gilroy_SemiBold,
    fontSize: size.tiny,
    color: colors.b1,
    paddingHorizontal: WP('2'),
  },
  resendText: {
    color: colors.b1,
    textAlign: 'center',
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  digitStyle: {
    backgroundColor: 'transparent',
  },
  textRow: {
    alignItems: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timerText: {
    color: colors.b1,
    textAlign: 'center',
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  btnCon: {
    marginVertical: WP('20'),
    marginHorizontal: 10,
  },
  footText: {
    color: colors.b1,
    textAlign: 'center',
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
    marginTop: 8,
  },
  aiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  errorStyle: {
    color: 'red',
    fontFamily: family.Gilroy_Medium,
    fontSize: size.xtiny,
    marginBottom: 10,
  },
});

export default styles;
