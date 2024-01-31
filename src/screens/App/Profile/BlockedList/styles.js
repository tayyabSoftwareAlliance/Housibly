import { StyleSheet } from 'react-native';
import { WP, colors, size, family } from '../../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    padding: WP(4),
  },
  blockedUserContainer:{
    flexDirection:'row',
    marginTop:WP(4)
  },
  imgStyle: {
    borderRadius: 15,
    width: WP(17),
    height: WP(17),
    marginRight: WP(2.5),
    backgroundColor: colors.g14
  },
  buttonStyle: {
    borderRadius: 15,
    width: WP('28.7'),
    height: WP('7.8'),
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: WP(3),
    justifyContent: 'center',
    backgroundColor: colors.p1,
  },
  btnTxtStyle: {
    color: colors.white,
    fontSize: size.xxsmall,
    fontFamily: family.Gilroy_Medium,
  },
  name:{
    color: colors.b1,
    fontSize: size.small,
    fontFamily: family.Gilroy_SemiBold,
  }
});

export default styles;
