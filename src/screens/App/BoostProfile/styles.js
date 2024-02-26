import { StyleSheet } from 'react-native';
import { WP, colors, size, family, HP } from '../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: WP('10'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  startIconCon: {
    backgroundColor: '#FFC107',
    height: WP(30),
    width: WP(30),
    borderRadius: WP(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    width: WP(20),
    height: WP(20),
  },
  title: {
    fontSize: size.h5,
    color: colors.b1,
    fontFamily: family.Gilroy_Medium,
    textAlign: 'center',
    marginTop: HP(3)
  },
  subtitle: {
    fontSize: size.tiny,
    color: colors.b1,
    fontFamily: family.Gilroy_Medium,
    textAlign: 'center',
    marginVertical: HP(1),
    width: WP(70)
  },
  btnCon: {
    width: WP(80),
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: HP(2)
  },
  btnTxt: {
    fontSize: size.xsmall,
    color: colors.white,
    fontFamily: family.Gilroy_Bold,
    textTransform: 'uppercase'
  },
  footerTxt: {
    fontSize: size.tiny,
    color: '#717171',
    fontFamily: family.Gilroy_Regular,
    textAlign: 'center',
    marginTop: HP(3),
  },
  packageDetailTopContainer: {
    height: HP(30),
    alignItems: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  },
  packageDetailTitleContainer: {
    position: 'absolute',
    bottom: HP(5),
  },
  packageDetailTitle: {
    fontSize: size.h2,
    color: colors.white,
    fontFamily: family.Gilroy_Bold,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  packageDetailSubtitle: {
    fontSize: size.medium,
    color: colors.white,
    fontFamily: family.Gilroy_Regular,
    textAlign: 'center',
    marginTop: 5,
    opacity: 0
  },
  packageDetailBottomContainer:{
    width:WP(80),
    marginTop: HP(15),
    flex:1
  },
  packageDetailH5: {
    fontSize: size.h6,
    color: colors.b1,
    fontFamily: family.Gilroy_Bold,
    textAlign: 'center',
  },
  packageDetailSmallTxt: {
    fontSize: size.tiny,
    color: colors.b1,
    fontFamily: family.Gilroy_Regular,
    textAlign: 'center',
    marginTop: HP(2),
  },
  boostIconContainer:{
    position:'absolute',
    bottom:-HP(10),
    alignSelf:'center',
  },
  boostIcon:{
    width:HP(25),
    height:HP(25),
  },
});

export default styles;
