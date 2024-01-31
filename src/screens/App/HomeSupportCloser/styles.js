import { StyleSheet } from 'react-native';
import { WP, colors, size, family, HP } from '../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
  contentContainer: {
    paddingHorizontal: WP('3.85'),
    flex: 1,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  heading: {
    fontSize: size.h6,
    color: colors.b1,
    fontFamily: family.Gilroy_Bold,
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
  },
  iconStyle: {
    width: 22,
    height: 22,
  },
  startIconCon: {
    backgroundColor: '#FFC107',
    height: 43,
    width: 43,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 10
  },
  h1: {
    fontSize: size.h6,
    color: colors.b1,
    fontFamily: family.Gilroy_SemiBold,
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: size.xsmall,
    color: colors.b1,
    fontFamily: family.Gilroy_Medium,
    textAlign: 'center',
    marginTop: 10,
  },
  ratingContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  ratingIconCon: {
    backgroundColor: colors.white,
    height: 60,
    width: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: WP(3),
  },
  ratingIconStyle: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  ratingText: {
    fontSize: size.medium,
    color: colors.b1,
    fontFamily: family.Gilroy_Medium,
  },
  ratingNumber: {
    fontSize: size.medium,
    color: colors.b1,
    fontFamily: family.Gilroy_SemiBold,
  },
  desc: {
    color: colors.g22,
    fontFamily: family.Gilroy_Medium,
    fontSize: size.xsmall,
    lineHeight: 18,
  },
  moreText: {
    color: colors.bl1
  },
  subHeading: {
    color: colors.b1,
    fontSize: size.small,
    fontFamily: family.Gilroy_Medium,
    marginBottom: 10
  },
  photoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  photo: {
    width: WP(29),
    height: WP(29),
    borderRadius: 10,
    margin: WP(0.85),
    backgroundColor: colors.g14
  },
  peoplesContainer: {
    backgroundColor: '#EFF8FC',
    marginTop: 24,
    paddingHorizontal: WP('3.85'),
    paddingVertical: 24
  },
  peoplesContainerTitle: {
    fontSize: size.large,
    color: colors.b1,
    fontFamily: family.Gilroy_Medium,
  },
  peoplesImagesContainer: {
    padding: HP(1)
  },
  peoplesImage: {
    width: WP(20),
    height: WP(20),
    borderRadius: 10,
    marginRight: WP(3),
    backgroundColor: colors.g14
  },
  reviewsTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalContainer: {
    borderRadius: 8,
    paddingTop: WP('3.5'),
    backgroundColor: 'white',
    marginHorizontal: WP('5'),
    paddingHorizontal: WP('3.5'),
  },
  crossIconView: {
    width: WP('5'),
    height: WP('5'),
    alignSelf: 'flex-end',
  },
  crossIconStyle: {
    width: WP('2'),
    height: WP('4'),
    alignSelf: 'flex-end',
  },
  iconContainer: {
    width: WP('25'),
    height: WP('25'),
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.g11,
  },
  imgStyle: {
    width: WP('25'),
    height: WP('25'),
    borderRadius: 15,
    alignSelf: 'center',
    backgroundColor: colors.g14
  },
  nameTxtStyle: {
    color: colors.b1,
    fontSize: size.h6,
    alignSelf: 'center',
    paddingTop: WP('4'),
    fontFamily: family.Gilroy_SemiBold,
    textTransform: 'capitalize'
  },
  subtitle:{
    color: colors.b1,
    fontSize: size.tiny,
    alignSelf: 'center',
    paddingTop: WP('2'),
    fontFamily: family.Gilroy_Medium,
    textTransform: 'capitalize'
  },
  time:{
    color: colors.p1,
    fontSize: size.tiny,
    alignSelf: 'center',
    fontFamily: family.Gilroy_Medium,
  },
  companyTxtStyle: {
    color: colors.b1,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: size.tiny,
    paddingTop: WP('1.5'),
    fontFamily: family.Gilroy_SemiBold,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: WP('2.5'),
    justifyContent: 'center',
  },
  smallTxtStyle: {
    color: colors.g23,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  bedIconStyle: {
    width: 14,
    height: 9,
    marginRight: 3,
  },
  bathIconStyle: {
    width: 11,
    height: 11,
    marginLeft: 8,
    marginRight: 4,
  },
  starIconStyle: {
    width: WP('3'),
    height: WP('3'),
  },
  ratingTxtStyle: {
    top: 1.2,
    paddingLeft: 5,
    color: colors.g17,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  removeTxtStyle: {
    color: colors.b1,
    marginTop: WP(4),
    alignSelf: 'center',
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  buttonStyle: {
    borderRadius: 15,
    width: WP('35'),
    height: WP('7.8'),
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: WP(5),
    marginBottom: WP(6),
    justifyContent: 'center',
    backgroundColor: colors.p1,
  },
  btnTxtStyle: {
    color: colors.white,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_SemiBold,
  },
});

export default styles