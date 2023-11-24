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
    paddingVertical: WP('10'),
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
    height: 46,
    width: 46,
    resizeMode: 'contain',
  },
  h1Style: {
    marginTop: 20,
    color: colors.b1,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
  },
  error: {
    textAlign: 'center',
    color: 'red',
    fontSize: size.tiny,
    marginTop: 5,
  },
});

export default styles;
