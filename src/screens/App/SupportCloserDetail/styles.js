import { StyleSheet } from 'react-native';
import { WP, colors, size, family } from '../../../shared/exporter';

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
    backgroundColor:colors.g14
  },
  inputContainer: {
    paddingVertical: WP('10'),
  },
  iconCon: {
    backgroundColor: colors.p1,
    height: 43,
    width: 43,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute',
    top:10,
    right:0
  },
  iconStyle: {
    width: 22,
    height: 22,
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
    marginRight:WP(3),
  },
  ratingIconStyle:{
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  ratingText:{
    fontSize: size.medium,
    color: colors.b1,
    fontFamily: family.Gilroy_Medium,
  },
  ratingNumber:{
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
  moreText:{
    color:colors.bl1
  },
  subHeading:{
    color: colors.b1,
    fontSize: size.small,
    fontFamily: family.Gilroy_Medium,
    marginBottom:10
  },
  photoContainer:{
    flexDirection:'row',
    flexWrap:'wrap',
  },
  photo:{
    width:WP(29),
    height:WP(29),
    borderRadius:10,
    margin:WP(0.85),
    backgroundColor:colors.g14
  },
  peoplesContainer:{
    backgroundColor:'#EFF8FC',
    marginTop:24,
    paddingHorizontal: WP('3.85'),
    paddingVertical:24
  },
  peoplesContainerTitle:{
    fontSize: size.large,
    color: colors.b1,
    fontFamily: family.Gilroy_Medium,
  },
  peoplesImage:{
    width:WP(20),
    height:WP(20),
    borderRadius:10,
    marginRight:WP(3)
  },
  reviewsTitleContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  }
});

export default styles