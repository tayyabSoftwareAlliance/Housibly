import {StyleSheet} from 'react-native';
import {WP, colors, size, family} from '../../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    flex: 1,
    marginBottom: WP('10'),
    paddingHorizontal: WP('6'),
  },
  h1Style: {
    marginTop: 5,
    color: colors.b1,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_SemiBold,
  },
  imgStyle: image => {
    if (image === '') {
      return {
        borderRadius: 7,
        width: WP('12'),
        height: WP('12'),
        marginTop: WP('4'),
        alignSelf: 'center',
        tintColor: colors.s7,
      };
    } else {
      return {
        borderRadius: 7,
        width: WP('12'),
        height: WP('12'),
        marginTop: WP('4'),
        alignSelf: 'center',
      };
    }
  },
  descTxtStyle: {
    color: colors.b1,
    alignSelf: 'center',
    marginTop: WP('2.5'),
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
  },
  bottomView: {
    bottom: 20,
    width: '85%',
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
});

export default styles;
