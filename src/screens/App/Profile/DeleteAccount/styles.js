import {StyleSheet} from 'react-native';
import {WP, colors, size, family, HP} from '../../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: WP('5'),
  },
  h2Style:{
    color: colors.b2,
    fontSize: size.normal,
    fontFamily: family.Gilroy_Medium,
    textAlign:'center'
  },
  txtStyle:{
    color: colors.b2,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Regular,
    width:WP(70),
    textAlign:'center',
    alignSelf:'center',
    marginVertical:HP(3)
  },
  cancelBtn:{
    justifyContent:'center',
    alignItems:'center',
    padding:WP(3)
  },
  cancelBtnTxt:{
    color: colors.b2,
    fontSize: size.small,
    fontFamily: family.Gilroy_Medium,
  },
  modalContainer: {
    borderRadius: 8,
    backgroundColor: colors.white,
    marginHorizontal: WP('8'),
    padding: WP('3.5'),
  },
  modalInputStyle:{
    color:colors.r1,
    borderColor:colors.r1,
    borderWidth:1,
    borderRadius:5,
    padding:WP(1.5),
    marginBottom:HP(2)
  },
  modalBtnsContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around'
  },
  modalBtnTxtStyle:{
    color: '#293688',
    fontSize: size.small,
    fontFamily: family.Gilroy_Regular,
  }
});

export default styles;
