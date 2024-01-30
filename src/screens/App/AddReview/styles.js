import { StyleSheet } from 'react-native';
import { WP, colors, size, family } from '../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: WP('3.85'),
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
  h1: {
    fontSize: size.h6,
    color: colors.b1,
    fontFamily: family.Gilroy_SemiBold,
    textAlign: 'center',
    marginTop: 10,
  },
  ratingContainer: {
    flex:1,
    justifyContent:'center'
  },
});

export default styles